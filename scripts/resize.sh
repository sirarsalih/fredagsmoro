#!/bin/sh

for F in `find ./content -name *.jpg -print`; do
  width=`identify -format %w $F`
  echo Testing $F with width $width
  if [ $width -gt 1000 ]; then
    echo $F Too big
    convert $F -resize 1000x1000\> $F.new
    rm $F
    mv $F.new $F
  fi
done