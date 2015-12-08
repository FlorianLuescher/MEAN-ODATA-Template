Nodejs Template
===============

Source code example for [A simple website in node.js written in Typescript with express, jade and stylus] base copied from (http://www.clock.co.uk/blog/a-simple-website-in-nodejs-with-express-jade-and-stylus) article.

Build
-----

Run this command in console:

```
npm install
tsd install
```

All dependencies will be downloaded by `npm` to `node_modules` folder.

All typescript definitions will be downloaded by `tsd` to `typings` folder.

Run
---

Run this command in console:

```
npm start
```

Open `http://localhost:3000` to access basic Express Site.

Extend Code
-----------

Run this command for installing new node_modules: `npm run i -- <node_module>` 

Don't forget to check the message in the console, maybe there is no definition file for the given node_module.. You can find the available typescript definitions here: https://github.com/DefinitelyTyped/tsd

Have fun ;)
