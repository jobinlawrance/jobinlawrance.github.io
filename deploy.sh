#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="source"
TARGET_BRANCH="master"

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; Either a pull request or chages to non source branch"
    exit 0
fi

# Save some useful information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Clone the existing gh-pages for this repo into out/
# Create a new empty branch if gh-pages doesn't exist yet (should only happen on first deply)
git clone $REPO out
cd out
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..

# Clean out existing contents
rm -rf out/**/* || exit 0

# Run our compile script
npm run build

# Copy all the build files to out folder 
cp -r dist/* out/

#Now let's go have some fun with the cloned repo
cd out
git config user.name "Travis CI"
git config user.email "jobinlawrance@gmail.com"

# decrypt private ssh key using travis environment variables and add to ssh agent
openssl aes-256-cbc -K $encrypted_5ed29cc41e6d_key -iv $encrypted_5ed29cc41e6d_iv -in ../travis_rsa.enc -out travis_rsa -d

chmod 600 travis_rsa
eval `ssh-agent -s`
ssh-add travis_rsa

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add .
git commit -m "Deploy to GitHub Pages: ${SHA}"

# Now that we're all set up, we can push.
git push $SSH_REPO $TARGET_BRANCH