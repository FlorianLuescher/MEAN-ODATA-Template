Nodejs Template
===============

A MEAN on oData Template.

Source code example for [A simple website in node.js written in Typescript with express, jade and stylus] base copied from (http://www.clock.co.uk/blog/a-simple-website-in-nodejs-with-express-jade-and-stylus) article.

Build
-----

Run this command in console:

```
npm install
tsd install
bower install
```

All dependencies will be downloaded by `npm` to `node_modules` folder.

All typescript definitions will be downloaded by `tsd` to `typings` folder.

Run
---

Run this command in console:

```
npm start
```

Open `http://localhost:3000` to access index site.

Extend Code
-----------

Run this command for installing new node_modules: `npm run i -- <node_module>` (only shell)

Don't forget to check the message in the console, maybe there is no definition file for the given node_module.. You can find the available typescript definitions here: https://github.com/DefinitelyTyped

MongoDB
-------

You need to download Mongodb (https://www.mongodb.org/) and place the extracted folder in the root directory named 'mongodb'.
Finaly you have to start the mongodb as follow (in case you are already in the root folder):

```
cd mongodb/.bin; ./mongodb
```

Testing
-------
Run this command for testing the basic services: `npm test` (only shell)

Next Steps
----------

In the next step i gonna implement the fronted (client-side jaydata, angular, socket-io etc.)

Please let me know, if you have some improvements and have fun ;)
