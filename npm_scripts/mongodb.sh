#!/bin/bash
# npm run mongodb
# Start mongodb
osascript -e 'tell app "Terminal"
  do script "cd Documents/git/NodejsTemplate/mongodb/bin; ./mongod;"
end tell'
# in a new terminal you can run ./mongo in the mongodb/bin folder to connect to mongo..
# show dbs: shows all databases
# use <db>: change current db -> creates already a new database, is only displayed if a entry is inserted
# db.collection.insert({})
# show db.collections
#
# db.dropDatabase(): delete current used db
