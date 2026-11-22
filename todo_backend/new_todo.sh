#!/usr/bin/env bash

random_wiki_url=$(
  wget --spider -S -U "Mozilla/1.0" http://en.wikipedia.org/wiki/Special:Random 2>&1 | \
  grep -i "^  location:" | \
  tail -1 | \
  sed 's|  location: |https:|')

echo $random_wiki_url

curl -i \
  -H "Content-Type: application/json" \
  --request POST \
  --data "{\"todo\":\"Read $random_wiki_url\"}" \
  http://todo-backend-svc:1003/todos
