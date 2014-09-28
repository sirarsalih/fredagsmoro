#!/bin/bash

rsync -rvz --delete --exclude=.git --exclude=.idea --exclude=.gitignore --exclude=.DS_Store --exclude=scripts ../ bryanek.chrissearle.org:/srv/www/fredagsmoro.chrissearle.org/htdocs
