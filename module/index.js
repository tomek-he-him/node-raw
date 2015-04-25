/* jslint evil: true */

const prefix = /^raw!/;
const root = new Function('return this')();

export default (nativeRequire) => {
  // If in the browser, just return webpack’s `require`.
  if (root.window === root) return nativeRequire;

  // Else wrap `require` with the following function:
  else {
    const {readFileSync} = nativeRequire('fs');
    return (moduleId) => (prefix.test(moduleId) ?

      // If the `moduleId` starts with "raw!", return contents of the
      // succeeding file path.
      readFileSync(moduleId.replace(prefix, '')) :

      // Else just run the native `require`.
      nativeRequire(moduleId)
    );
  }
};
