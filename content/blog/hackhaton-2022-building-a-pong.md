
---
Title: Hackapong Fun at the Shop!
Date: 2022-11-04 13:55:00
Author: Jean-Philippe Lambert & Alex Hoguin
Category: Hackathon
Tags: hackathon, dtmf, websocket
Slug: hackathon-2022-building-a-pong
Status: published
---
## Here Comes the Hackapong 
Our Yearly hackathon is a very important moment, first of all since we use it to bond and work as a team, and also to use our tools and see what we could add in the future. We used this week to build on tools we already use or that are coming to WDA soon.

Our team decided to put the WDA plugin functionality to good use and we decided to build a pong game that would be playable between two callers using WDA.

To accomplish that feat we used existing tools from the wazo platform as well as webrtc, asterisk, nginx, etc, and some that are not yet available i.e. the plugin interface that is in the works for WDA.

We started by finding a pong javascript [codebase](https://gist.github.com/straker/81b59eecf70da93af396f963596dfdc5) that was functional and had all the features we needed. We used an open-source project and we built on that. 

The issues we faced were mostly related to synchronisation and control of the paddles for the players. 

## Intercommunication 

We wanted it to work with a plastic phone too, so we chose to use DTMFs to control the paddles. 
For this we had to use the wazo-sdk javascript library. We linked the user controls ( arrow up and arrow down ) to send DTMFs to the stack. 

```javascript
/**
* When using the wazo-sdk we have direct acces to Wazo websocket events 
* without too much work. 
*/
Wazo.Websocket.on('call_dtmf_created', ({ data }) => {

	if (!data.user_uuid) {
		return;
	}

	if (data.digit === '0' || data.digit === '1') {
		const isPlayer1 = data.digit === '0';
		return stopMovePlayer(isPlayer1);
	}
	/**
	* Since we need to separate both player we sent different DTMF's
	* Through the system.
	*/
	const isUp = data.digit === '8' || data.digit === '9';
	const isPlayer1 = data.digit === '2' || data.digit === '8';
	
	movePlayer(isPlayer1, isUp);
});

```

We also had to decide how to synchronise the ball between the two users. Since we are not using a netcode library, we decided to make the caller the source of truth. One of the interesting part is that we are able to speak while playing the game. Oh and if you are very good at pong your calls wont be very long, we needed a way to choose a winner so when you get to 20 points the game ends and the call hangs-up.
```javascript
setOnGameEndedCallback(idPlayer => {
	Wazo.Phone.sendMessage(JSON.stringify({ type: 'playerWon', idPlayer }), call.sipSession);
	onPlayerWon(idPlayer);
	Wazo.Phone.hangup(call);
});
```

## The Deployment

Let's make it (not) production ready:

### Industrialize deployment
We use ansible to deploy this quickly. Fortunately we already have an nginx service running.
First of all, let's create the ansible project
```
ansible-galaxy init ansible-role-hackapong
cd ansible-role-hackapong
```
Let's take a minute to think about it. 
We need to **(1)** download a project from git, **(2)** upload the nginx configuration and **(3)** enable this new site.

We fill the variables with the necessary values first.
For **(1)**
- The code repository
- Path of the cloned project=> /var/www/hackapong

For **(2)** & **(3)**
- Nginx sites-available project name => hackapong
- A FQDN for the incoming requests => hackapong.wazo.io

The ensuing variable file :
```yaml
cat defaults/main.yml
---
# defaults file for ansible-role-Hackapong
project_repo: 'ssh://git@github.com/TinxHQ/hackapong.git'
project_name: 'hackapong'
project_dest_folder: "/var/www/{{ project_name }}"
project_key_file: '/root/.ssh/hackapong_ed25519' # we use a specific key, to keep silos
fqdn: hackapong.wazo.io
```

The tasks file is as simple as this
```yaml
cat tasks/main.yml
---
# tasks file for ansible-role-hackapong
- name: Download project
  git:
    repo: '{{ project_repo }}'
    dest: '{{ project_dest_folder }}'
    version: master
    key_file: '{{ project_key_file }}'
    ssh_opts: '-o UserKnownHostsFile=/root/.ssh/known_hosts'
    force: yes

- name: Upload nginx file
  template:
    src: 'nginx.conf.j2'
    dest: '/etc/nginx/sites-available/{{ project_name }}'
  notify: restart nginx

- name: Enable site
  file:
    state: link
    src: /etc/nginx/sites-available/{{ project_name }}
    path: /etc/nginx/sites-enabled/{{ project_name }}
  notify: restart nginx
```

notify clauses above specify a handler, we need to add it in its own file:
```yaml
cat handlers/main.yml
---
# handlers file for ansible-role-Hackapong
- name: restart nginx
  service:
    name: nginx
    state: restarted
```
And finally, the template that configures the nginx route
```nginx
cat templates/nginx.conf.j2
server {
    listen 80 ;
    listen [::]:80 ;
    server_name {{ fqdn }}; # managed by Certbot

    access_log /var/log/nginx/{{ project_name }}.access.log main;
    error_log /var/log/nginx/{{ project_name }}.error.log;
    root /var/www/{{ project_name }};
    location / {
		return 307 https://$server_name$request_uri;
	}
    location /.well-known {
		root /var/www/html;
		autoindex off;
	}

}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name {{ fqdn }}; # managed by Certbot

    access_log /var/log/nginx/{{ project_name }}.access.log main;
    error_log /var/log/nginx/{{ project_name }}.error.log;
    root /var/www/{{ project_name }};
    location / {
		add_header Access-Control-Allow-Origin *;
    }

}
```
To deploy all of this, lets write a quick playbook, directly in the role (it is still a Hackathon, don't forget :) )
```yaml
cat playbook.yml
- hosts: hackapong.wazo.io
  become: true

  roles:
    - '../ansible-role-hackapong/'
```
Then we have the hosts file. The ip/hosts are generic (for obvious reasons).
```
cat hosts
[hackapong.wazo.io]
10.10.10.10 ansible_user=root
```
Time to deploy: 
```bash
ansible-playbook -i hosts playbook.yml
```

### Manual steps
Two steps remain, we need to create a domain name for this service and generate its certificate. Using a certificate is not optional as Wazo App won't send requests to a non-secured receiver.

On your favorite cloud provider, create a domain name `hackapong.wazo.io`.
Then ssh on the instance where the plugin is deployed and ask certbot to handle the certificate.
```
ssh root@hackapong.wazo.io

certbot certonly --webroot --agree-tos -email <infra-team>@wazo.io --expand  -w /var/www/html -d hackapong.wazo.io
```
Finally, let's restart nginx to make sure the certificate is handled
```
systemctl restart nginx
```
And voila !

## Conclusion
What is a hackathon without fun and teamwork? 

The goal of our project was to use our tools and bond together in a way that would be fun. The use of a game taught our little trio that if a tool , like the plugin interface, is well built then we can develop many more tools using it without a lot of hassle. 

Many thanks at Wazo for the opportunity to find another great way to use our tooling, and for the meals, and the housing, and the beer, and the beers, and the b... 

