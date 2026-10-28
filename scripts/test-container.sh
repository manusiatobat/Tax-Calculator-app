#!/bin/sh
# Smoke-tests the Tax Calculator served by nginx on localhost:8080 and prints each command with its output.
BASE=${1:-localhost:8080}

run() {
  echo
  echo "\$ $*"
  eval "$*"
}

run "docker ps --filter name=tax-calculator"
for f in "" index.html script.js style.css taxCalculator.js favicon.ico; do
  run "curl -s -o /dev/null -w '/$f -> HTTP %{http_code}, %{size_download} bytes, %{content_type}\n' $BASE/$f"
done
run "curl -s $BASE/ | grep -E '<title>|<h1>'"
run "docker exec tax-calculator ls -l /usr/share/nginx/html"
