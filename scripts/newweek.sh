#!/bin/sh

pushd scripts
bundle exec ./build_data.rb > ../data.json
./sync.sh
popd
git add .
git ci -m "New Week"
git push
