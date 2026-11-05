#!/bin/bash
set -e

HUGO_VERSION="0.146.4"
HUGO_TARBALL="hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"
HUGO_URL="https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${HUGO_TARBALL}"

# GitHub Releases 偶发超时 / 限流。原脚本 `curl -sL ... | tar -xz` 会静默失败，
# 随后执行不存在的 ./hugo，整次部署直接报失败且没有明确错误信息。
# 这里显式重试并校验解压结果，失败时给出可读日志。
for attempt in 1 2 3; do
  if curl -fsSL --connect-timeout 15 --max-time 120 --retry 2 "$HUGO_URL" -o hugo.tar.gz \
     && tar -xzf hugo.tar.gz \
     && test -x ./hugo; then
    echo "Hugo ${HUGO_VERSION} ready"
    break
  fi
  echo "Hugo download failed (attempt ${attempt}/3)" >&2
  rm -f hugo.tar.gz hugo
  if [ "$attempt" -eq 3 ]; then
    echo "Unable to fetch Hugo ${HUGO_VERSION}" >&2
    exit 1
  fi
  sleep 3
done

./hugo --gc --minify
