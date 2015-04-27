import path from 'path';

import test from 'tape-catch';

import nodeRaw from './module/index';

test('Doesn’t break the native `require`.', (is) => {
  const grab = nodeRaw(require);

  is.equal(
    grab('./test/fixtures/itWorks'),
    'It works!',
    'for local files without an extension'
  );

  is.equal(
    grab('./test/fixtures/itReallyWorks.js'),
    'It really works!',
    'for local files with an extension'
  );

  is.equal(
    grab('./test/fixtures/itWorks!Absolutely.js'),
    'It works! Absolutely!',
    'for local files with an exclamation mark in the filename'
  );

  is.equal(
    grab('tape-catch'),
    test,
    'for modules'
  );

  is.equal(
    grab('tape-catch/index.js'),
    test,
    'for files in modules'
  );

  is.end();
});

test('Loads raw text files.', (is) => {
  const grab = nodeRaw(require);

  is.equal(
    grab('raw!./test/fixtures/itWorks.txt'),
    'It works with raw text files!\n',
    'from local files'
  );

  // // See “caveats” in the readme.
  // is.equal(
  //   grab('raw!babel/README.md'),
  //   readFileSync('../node_modules/babel/README.md'),
  //   'from module files'
  // );

  is.end();
});

test('Uses webpack’s `require` in the browser environment.', (is) => {
  // Spoof *node-raw* that we’re in a browser.
  const originalWindow = global.window;
  global.window = global;

  // Delete the `require` cache so that the module reloads.
  delete require.cache[path.join(__dirname, 'module', 'index.js')];
  let nodeRaw = require('./module/index');

  is.equal(
    nodeRaw(require),
    require,
    'returns `require` when in a browser (`window` equals global object)'
  );

  // Set things back to normal.
  global.window = originalWindow;
  is.end();
});
