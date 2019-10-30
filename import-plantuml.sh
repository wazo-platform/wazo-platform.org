#!/bin/bash

set -x

TOP=$(cd $(dirname $0); pwd)

URL=https://raw.githubusercontent.com/RicardoNiepel/C4-PlantUML/release/1-0/C4_Container.puml

mkdir -p $TOP/content/plantuml
cd $TOP/content/plantuml

rm -f *

get_file() {
    local url="$1"
    local base=$(basename $url)

    curl -s $url > $base
    for u in $(sed -n 's/!includeurl //p' < $base); do
        get_file $u
    done
    sed -i -e 's@!includeurl .*/@!include @g' $base
}

get_file $URL

# import-platuml.sh ends here
