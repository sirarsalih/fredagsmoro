#!/bin/sh

for F in `find ./content -name *.jpg -print`; do
  width=`identify -format %w $F`
  echo Testing $F with width $width
  if [ $width -gt 700 ]; then
    echo $F Too big
    convert $F -resize 700x700\> $F.new
    rm $F
    mv $F.new $F
  fi
done
