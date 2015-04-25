import test from 'tape-catch';

import nodeRaw from './module/index';

test('Doesn’t break the native `require`.', (is) => {
  let isomorphicRequire = nodeRaw(require);

  is.equal(
    isomorphicRequire('./test/fixtures/itWorks'),
    'It works!',
    'for local files without an extension'
  );

  is.equal(
    isomorphicRequire('./test/fixtures/itReallyWorks.js'),
    'It really works!',
    'for local files with an extension'
  );

  is.equal(
    isomorphicRequire('./test/fixtures/itWorks!Absolutely.js'),
    'It works! Absolutely!',
    'for local files with an exclamation mark in the filename'
  );

  is.equal(
    isomorphicRequire('tape-catch'),
    test,
    'for modules'
  );

  is.equal(
    isomorphicRequire('tape-catch/index.js'),
    test,
    'for files in modules'
  );

  is.end();
});

test.skip('Works with local files.');

test.skip('Works with node modules.');
