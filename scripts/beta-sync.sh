# Goal: Temporary script that copy beta content to old website until migration will be done


# 1. Sync release note & blog posts
echo "🔃 Sync release note & blog posts from docusaurus\n"
rm -r content/blog || true
mkdir content/blog
cp website/release-notes/*.md website/blog/*.md content/blog/

sed -i '' 's/tags: \[\(.*\)\]/tags: \1/g' content/blog/*.md # tags support
sed -i '' 's/..\/static/https:\/\/beta.wazo-platform.org\//g' content/blog/*.md # image source
