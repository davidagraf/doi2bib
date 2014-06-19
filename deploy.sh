#!/bin/bash

cd "$(dirname "$0")"

HASH=$(git log --pretty=format:'%h' -n 1)

rm -rf ./dist
git clone ssh://537eed49500446b4b2000407@doi2bib-davidagraf.rhcloud.com/~/git/doi2bib.git/ dist
rm -rf ./dist/app ./dist/public
gulp dist
cd ./dist
git commit -a -m "update $HASH"
git push
