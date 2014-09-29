#!/bin/bash

rsync -rvz --delete --exclude=.git --exclude=.idea --exclude=package.json --exclude=node_modules --exclude=npm-debug.log --exclude=.gitignore --exclude=.DS_Store --exclude=scripts ../ bryanek.chrissearle.org:/srv/www/fredagsmoro.chrissearle.org/htdocs
