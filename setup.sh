#!/usr/bin/env bash

# Ensure that cairo is installed.
which -s brew;
if [[ $? = 0 ]]; then
  brew install cairo;
fi

# https://teamtreehouse.com/community/why-does-npm-take-so-long-while-installing-packages
npm set progress=false;

# If there is no node_modules directory, create and populate it
npm install;

# Delete any .info files in the node_modules directory (for Drupal compatibility)
find node_modules -type f -name '*.info' -print0 | xargs -0 rm -f;
