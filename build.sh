#!/bin/bash
curl -sL https://github.com/gohugoio/hugo/releases/download/v0.123.0/hugo_extended_0.123.0_linux-amd64.tar.gz | tar -xz
./hugo --gc --minify
