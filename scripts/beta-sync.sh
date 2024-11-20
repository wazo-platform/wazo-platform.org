#!/usr/bin/env bash
# Goal: Temporary script that copy beta content to old website until migration will be done

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed_cmd="sed -i ''"
else
    # Linux
    sed_cmd="sed -i"
fi

# 1. Sync release note & blog posts
echo "🔃 Sync release note & blog posts from docusaurus\n"
rm -r content/blog || true
mkdir content/blog || true
cp website/release-notes/*.md website/blog/*.md content/blog/


# Modify author format
$sed_cmd 's/authors: /author: /g' content/blog/*.md
$sed_cmd 's/author: \[\(.*\)\]/author: \1/g' content/blog/*.md
# Modify tags format
$sed_cmd 's/tags: \[\(.*\)\]/tags: \1/g' content/blog/*.md
# Update image source URLs
$sed_cmd 's|../static|https://beta.wazo-platform.org|g' content/blog/*.md

# 2. Sync uc-doc
echo "🔃 Sync uc-doc\n"
rm -r content/uc-doc || true
mkdir content/uc-doc || true
cp -R website/uc-doc/** content/uc-doc

cardListFiles=$(grep -rl "import CardList" content/uc-doc/**)

for file in $cardListFiles; do
    # Cleanup MDX component
    $sed_cmd \
        -e "s/import CardList from '@site\/src\/components\/Card\/CardList';//g" \
        -e "s/<CardList//g" \
        -e "s/  items={\[//g" \
        -e "s/  ]}//g" \
        -e "s/\/>//g" \
        "$file"

    # Convert items to markdown list of link
    $sed_cmd "s/.*text: '\([^']*\)',.*'\([^']*\)'.*/- [\1](\2)/g" "$file"
done



