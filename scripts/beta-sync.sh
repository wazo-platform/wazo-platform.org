#!/bin/bash
# Goal: Temporary script that copy beta content to old website until migration will be done

# 1. Sync release note & blog posts
echo "🔃 Sync release note & blog posts from docusaurus\n"
rm -r content/blog || true
mkdir content/blog || true
cp website/release-notes/*.md website/blog/*.md content/blog/

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed_cmd="sed -i ''"
else
    # Linux
    sed_cmd="sed -i"
fi

# Modify author format
$sed_cmd 's/authors: /author: /g' content/blog/*.md
$sed_cmd 's/author: \[\(.*\)\]/author: \1/g' content/blog/*.md
# Modify tags format
$sed_cmd 's/tags: \[\(.*\)\]/tags: \1/g' content/blog/*.md
# Update image source URLs
$sed_cmd 's|../static|https://beta.wazo-platform.org|g' content/blog/*.md
