---
title: Hey ChatGPT, write an article about Wazo and you
date: 2023-01-11 10:00:00
author: Sylvain BOILY
category: Wazo Platform
tags: hack, chat, websocket, chatgpt, openai
slug: 2023-chatgpt-with-wazo
status: published
---

## ChatGPT, chatgpt

Hey my new friend, please i need you for my creativity. If you don't know what's is chatGPT
please check network social, internet etc... because this is the big new hype for this new year 2023.
ChatGPT is everywhere for everything and there is probably the next huge company in the tech world.
This chat has been build on the top of the openAI company developement for the AI and it's very powerful
and interesting for building many new application.

So, like many people i played with chatGPT and i finally ask him to write a blog entry about Wazo and chatGPT.

This is the result here:

![wazo chagpt blog (small)](/images/blog/wazo-chatgpt/result.png)

So finally my question was also, hey please write code to connect them together and the result was:

![wazo chagpt code (small)](/images/blog/wazo-chatgpt/result-code.png)

Well, so this is not simple like that, so i decided to write a very short demo.

```python
import openai
import asyncio
import logging
import time

from wazo_auth_client import Client as Auth
from wazo_chatd_client import Client as Chatd
from wazo_websocketd_client import Client as Websocket
from wazo_websocketd_client.exceptions import AlreadyConnectedException


username = "" # check you have the good ACL for talk with chatd, auth, and websoketd
password = ""
host = "<your_wazo_server>"
client_id = 'wazo-chatgpt'
openai.api_key = "<your_openai_token>"

use_assistant_prompt = False

def ask_question_to_openai(prompt):
  completions = openai.Completion.create(
    engine="text-davinci-003",
    prompt=prompt,
    max_tokens=1024,
    stop=None,
    temperature=0.3,
    top_p=1.0,
    frequency_penalty=0.0,
    presence_penalty=0.0
  )

  message = completions.choices[0].text
  return message.lstrip('\n')

def session_expired(data):
    renew_token_running()

def get_refresh_token():
    token_data = auth.token.new('wazo_user', access_type='offline', client_id=client_id)
    refresh_token = token_data['refresh_token']
    return token_data['refresh_token']

def get_token():
    token_data = auth.token.new('wazo_user', expiration=3600, refresh_token=refresh_token, client_id=client_id)
    return token_data['token']

def renew_token_running():
    token_data = auth.token.new('wazo_user', expiration=3600, refresh_token=refresh_token, client_id=client_id)
    token = token_data['token']
    ws.update_token(token)
    chatd.set_token(token)

def renew_token_not_running():
    token_data = auth.token.new('wazo_user', expiration=3600, refresh_token=refresh_token, client_id=client_id)
    token = token_data['token']
    ws.set_token(token)
    chatd.set_token(token)

async def callback(data):
    global use_assistant_prompt

    chatGpt = "Chat Gpt"
    ask_question = True
    response = None

    room_uuid = data['data']['room']['uuid']
    content = data['data']['content']
    alias = data['data']['alias']
    sender_user_uuid = data['data']['user_uuid']
    user_uuid = data['required_acl'].split('.')[3]

    if content.startswith("/assistant") and alias != chatGpt and sender_user_uuid == user_uuid and use_assistant_prompt == False:
        prompt = content.replace('/assistant ', '')
        if prompt == "start":
            use_assistant_prompt = True
            ask_question = False
            response = "Prompt /assistant has been activated!"
    elif content.startswith("/assistant") and alias != chatGpt and use_assistant_prompt == True:
        prompt = content.replace('/assistant ', '')
        if prompt == "stop" and sender_user_uuid == user_uuid:
            use_assistant_prompt = False
            ask_question = False
            response = "Prompt /assistant has been desactivated!"
    elif alias != chatGpt and use_assistant_prompt == False and sender_user_uuid != user_uuid and not content.startswith("/assistant"):
        prompt = content
    else:
        ask_question = False

    if ask_question == True:
        response = ask_question_to_openai(prompt)

    if response:
        chatd.rooms.create_message_from_user(room_uuid, {
            'alias': chatGpt,
            'content': response
      })

    await asyncio.sleep(0.1)

async def main():
    ws.on('chatd_user_room_message_created', callback)
    ws.on('auth_session_expire_soon', session_expired)
    await ws.run()

auth = Auth(host, username=username, password=password, verify_certificate=False)
refresh_token = get_refresh_token()
chatd = Chatd(host, token=get_token(), verify_certificate=False)
ws = Websocket(host, token=get_token(), verify_certificate=False)

asyncio.run(main())
```

## Conclusion

So this code permit to have two features.
1. By default everybody send me a chat at Wazo have a conversation with my bot instead of me, so you can talk with me all
the time and about everything now ;) 
2. I just added a prompt /assistant to also play with it and my participant. So if me and the participant start his sentence with /assistant do something,
the bot will answer instead of answer to the participant by default.

So i had fun with Gregory yesterday morning and finally the bot said we have a super great support at Wazo and GPT can't replace them ;),

Have fun, and happy new year 2023 to everybody.
Sylvain
