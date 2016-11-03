#!/usr/bin/env bash

HOST_BASE_DIR=`pwd`/docker
DOCKER_BASE_DIR=/usr/app

VOLUMES=$(for v in failures results screenshots tests; do echo -v "$HOST_BASE_DIR/$v:$DOCKER_BASE_DIR/$v"; done)

if command -v ipconfig &>/dev/null; then
  HOST_IP=`ipconfig getifaddr en0 ||
  ipconfig getifaddr en1 ||
  ipconfig getifaddr en2 ||
  ipconfig getifaddr en3 ||
  ipconfig getifaddr en4 ||
  ipconfig getifaddr en5 ||
  ipconfig getifaddr en6 ||
  ipconfig getifaddr en7 ||
  ipconfig getifaddr en8`;
else
  HOST_IP=`hostname -I | { read first rest; echo $first; }`;
fi;

if [[ -z "$1" ]]; then
  FILES=$(for x in docker/tests/*.js; do echo "tests/$(basename $x)"; done | xargs echo)
else
  FILES="$@"
fi

echo docker run --rm $VOLUMES -e HOST_IP=$HOST_IP visual-test npm run test -- $FILES
exec docker run --rm $VOLUMES -e HOST_IP=$HOST_IP visual-test npm run test -- $FILES
