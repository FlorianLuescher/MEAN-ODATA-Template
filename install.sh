#!/bin/bash
# npm run i -- express
echo " > Installing: " $1
npm install --save $1
tsd install $1 --save
