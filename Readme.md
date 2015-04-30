[![Coveralls – test coverage
](https://img.shields.io/coveralls/tomekwi/node-raw.svg?style=flat-square)
](https://coveralls.io/r/tomekwi/node-raw)
 [![Travis – build status
](https://img.shields.io/travis/tomekwi/node-raw/master.svg?style=flat-square)
](https://travis-ci.org/tomekwi/node-raw)
 [![David – status of dependencies
](https://img.shields.io/david/tomekwi/node-raw.svg?style=flat-square)
](https://david-dm.org/tomekwi/node-raw)
 [![Code style: airbnb
](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)
](https://github.com/airbnb/javascript)




node-raw
========

**Make webpack’s *[raw-loader][]* work in *node* and *iojs*.**

And that almost for free. The whole thing weighs around 300 bytes minzipped.

[raw-loader]:  https://github.com/webpack/raw-loader  "webpack/raw-loader"




Installation
------------

```sh
$ npm install node-raw
```




Usage
-----


1) Shim `require`.

```js
const grab = require('node-raw')(require, {dirname: __dirname});
```


2) Profit!

```js
// Require modules as you did normally.
const Rx = grab('rx');

// Require text files with *raw-loader*. That’ll now work in node as well!
const readme = grab('raw!./Readme.md');
```


3) Hot tip!

This works well with *[node-ensure][]*:

```js
if (!grab.ensure) grab.ensure = require('node-ensure');
```

[node-ensure]:  https://github.com/bauerca/node-ensure  "bauerca/node-ensure"



Caveats
-------

I’m having some weird problems with requiring files directly from `node_modules` (like in `grab('raw!node-raw/Readme.md)`). For relative files everything works like a charm and can be considered stable.




License
-------

[MIT][] © [Tomek Wiszniewski][]

[MIT]: ./License.md
[Tomek Wiszniewski]: https://github.com/tomekwi
