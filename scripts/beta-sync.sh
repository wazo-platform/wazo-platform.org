# Goal: Temporary script that copy beta content to old website until migration will be done

# Sync release notes and make them valie
echo "🔃 Sync release note from docusaurus => gastby\n"
rm content/blog/sprint-review-*.md
cp website/release-notes/* content/blog/
sed -i '' 's/tags: \[\(.*\)\]/tags: \1/g' content/blog/sprint-review-*.md



