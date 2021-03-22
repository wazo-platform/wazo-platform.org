---
title: Incall
---

## General Configuration

You can configure incoming calls with `/incalls` endpoints.

### DID (Direct Inward Dialing) Configuration

When a `+` character is prepended a called DID, the `+` character is discarded.

#### Example:

- Bob has a DID with number 1000.
- Alice can call Bob by dialing either 1000 or +1000, without configuring another DID.

## BlackList

There are no interface to set a blacklist, but you can build if by hand.

- You need a preprocess subroutine on the incall with the following dialplan:

    ```dialplan
    [check-blacklist]
    exten = s,1,GotoIf(${BLACKLIST()}?blacklisted)
    same = n,Return()
    same = n(blacklisted),Playback(no-user-find)
    same = n,Hangup()
    ```

- Do a `dialplan reload` in the Asterisk CLI to load the new dialplan

You can manage the blacklist in the Asterisk CLI

- To add extension:

    ```asteriskcli
    *CLI> database put blacklist <extension> "<description (e.g. reason)>"
    ```

- To remove extension:

    ```asteriskcli
    *CLI> database del blacklist <extension>
    ```

## Whitelist

Like blacklists, there is no interface to manage whitelists, but you can build it by hand.

- You need a preprocess subroutine on the incall with the following dialplan:

    ```dialplan
    [check-whitelist]
    exten = s,1,GotoIf(${DB_EXISTS(whitelist/${CALLERID(num)})}?whitelisted:)
    same = n,Playback(no-user-find)
    same = n,Hangup()
    same = n(whitelisted),Return()
    ```

- Do a `dialplan reload` in the Asterisk CLI to load the new dialplan

You can manage the whitelist in the Asterisk CLI

- To add an extension:

    ```asteriskcli
    *CLI> database put whitelist <extension> "<description (e.g. reason)>"
    ```

- To remove an extension:

    ```asteriskcli
    *CLI> database del whitelist <extension>
    ```
