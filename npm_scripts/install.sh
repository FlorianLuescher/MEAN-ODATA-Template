#!/bin/bash
# npm run i -- <node_module>
echo "> Installing: " $1
sudo npm install --save $1
sudo tsd install $1 --save

# change owner of these files to user
sudo chown -R $USER package.json
sudo chown -R $USER node_modules
sudo chown -R $USER typings
