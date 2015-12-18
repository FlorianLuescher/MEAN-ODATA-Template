#!/bin/bash
# opens a new terminal and start npm test after 0.5 seconds
# #TODO don't forget to update the path to the project!
osascript -e 'tell app "Terminal"
    do script "cd Documents/git/NodejsTemplate; sleep .5; npm test"
end tell'
