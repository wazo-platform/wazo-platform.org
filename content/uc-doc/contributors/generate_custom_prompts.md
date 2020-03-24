---
title: Generate your own prompts
---

If you want your Wazo to speak in your language that is not supported by
Wazo, and you don\'t want to record the whole package of sounds in a
studio, you may generate them yourself with some text-to-speech
services.

The following procedure will generate prompts for `pt_BR` (portuguese
from Brazil) based on the Google TTS service.

#:exclamation: There are two sets of prompts: the [Asterisk
prompts](http://www.asterisksounds.org/en) and the Wazo prompts. This
procedure only covers the Wazo prompts, but it may be adapted for
Asterisk prompts.

1.  Create an account on Transifex and join the team of translation of
    Wazo.
2.  Translate the prompts in the wazo-prompt resource.
3.  Go to
    <https://www.transifex.com/wazo/wazo/wazo-prompt/pt_BR/download/for_use/>
    and download the file on your Wazo. You should have a file named
    like `for_use_wazo_wazo-prompt_pt_BR.ini`.
4.  On your Wazo, download the tool to automate the use of Google TTS:

```ShellSession
$ wget https://github.com/zaf/asterisk-googletts/raw/master/cli/googletts-cli.pl
$ chmod +x googletts-cli.pl
```

5.  Then run the following script to generate the sound files (set
    `LANGUAGE` and `COUNTRY` to your own language):

```Shell
LANGUAGE=pt
COUNTRY=BR
mkdir -p wav/{digits,letters}
cat for_use_wazo_wazo-prompt_${LANGUAGE}_${COUNTRY}.ini | while IFS='=' read file text ; do
  echo $file
  ./googletts-cli.pl -t "$text" -l ${LANGUAGE}-${COUNTRY} -s 1.4 -r 8000 -o wav/$file.wav
done
```

6.  Install the prompts on your system:

        mv wav /usr/share/asterisk/sounds/${LANGUAGE}_${COUNTRY}

Note that this last modification may be erased after running
`wazo-upgrade`.

And that\'s it, you can configure a user to use your new language and he
will hear the prompts in your language. You may also want to use the
[wazo-confd HTTP API](/uc-doc/administration/call_logs#rest-api) to
mass-update your users.
