/* jslint evil: true */

const rawPrefix = /^raw!/;
const moduleFile = /^(?![.\/])/;
const noTrailingSlash = /(?!\/)$/;
const root = new Function('return this')();

const getModulesPath = (packageRoot) => (packageRoot ?
  (('' + packageRoot).replace(noTrailingSlash, '/') +
    'node_modules/'
  ) :
  ''
);

export default (nativeRequire, settings = {}) => {
  // If in the browser, just return webpack’s `require`.
  if (root.window === root) return nativeRequire;

  // Else wrap `require` with the following function:
  else {
    const {readFileSync} = nativeRequire('fs');
    const modulesPath = getModulesPath(settings.packageRoot);

    return (moduleId) => (rawPrefix.test(moduleId) ?

      // If the `moduleId` starts with "raw!", return contents of the
      // succeeding file path.
      readFileSync(
        moduleId
          .replace(rawPrefix, '')
          .replace(moduleFile, modulesPath),
        {encoding: 'utf8'}
      ) :

      // Else just return the result of the native `require`.
      nativeRequire(moduleId)
    );
  }
};
