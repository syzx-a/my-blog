#!/bin/bash
curl -sL https://github.com/gohugoio/hugo/releases/download/v0.146.4/hugo_extended_0.146.4_linux-amd64.tar.gz | tar -xz
./hugo --gc --minify
