def buildSSHRemote(params) {
  def remote = [:]
  remote.name = params.host
  remote.host = params.host
  remote.knownHosts = '/home/admin/.ssh/known_hosts'
  remote.allowAnyHosts = params.allowAnyHosts
  remote.user = env.SSH_CREDS_USR
  if (params.withPassword) {
    remote.password = env.SSH_CREDS_PSW
  } else {
    remote.identityFile = env.SSH_CREDS
  }
  remote.logLevel = 'SEVERE' // Setting any logLevel will remove host from public log
  return remote
}

def webserver_community = 'webserver.wazo.community'

pipeline {

  triggers {
    pollSCM 'H 0 * * *'
  }
  options {
    timestamps()
  }

  agent {
    label 'general-medium'
  }
  environment {
    CONFIG_FILE_PATH = credentials('wazo-doc-tools-credentials')
    SSH_CREDS = credentials('ssh-private-key-for-webserver')
  }
  stages {
    stage ("Cleanup") {
      steps {
        sh """
          set -xe
          cp ${CONFIG_FILE_PATH} config.js

          make ENV=CORPORATE=1 builder
          make ENV=CORPORATE=1 build

          sudo curl -L -o /usr/local/bin/docker-compose https://github.com/docker/compose/releases/download/v2.39.2/docker-compose-linux-x86_64
          sudo chmod +x /usr/local/bin/docker-compose
          docker-compose down
          rm config.js
        """
      }
    }
    stage ("Prepare") {
      steps {
        sshagent(credentials: ['ssh-private-key-for-webserver']) {
          sh """
            set -xe
            cat > ${WORKSPACE}/webserver.wazo.community.known_hosts << EOF
webserver.wazo.community ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIezVt71SDQZ2KsL7yzjGqbvjyt95HEIi0TpxXoaZywf
EOF

            rsync \
              -rlD --delete \
              -e "ssh -o UserKnownHostsFile=${WORKSPACE}/webserver.wazo.community.known_hosts" \
              public/ root@webserver.wazo.community:/tmp/api/
          """
        }
      }
    }
    stage ("Deploy") {
      steps {
        script {
          def remote_webserver_community = buildSSHRemote(host: webserver_community, allowAnyHosts: true)
          sshCommand(
            remote: remote_webserver_community,
            command: '''
              set -euo pipefail

              # If we use rsync directly and rsync fails with "Broken pipe", then it
              # will break the website installation.
              # To prevent that, rsync into temporary directory, then mv
              # the new website install.

              mv -T /tmp/api /var/www/api-new
              mv -T /var/www/api /var/www/api-old
              mv -T /var/www/api-new /var/www/api
              rm -rf /var/www/api-old
            '''
          )
        }
      }
    }
  }
}
