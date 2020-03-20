/**
 * Example implementation of `require` function in Node.js.
 */

const fs = require('fs');

/**
 * `loadModule` will wrap the module's source code with a function
 * and expose to it an object `module` via reference.
 * Module will then be invoked using `eval` and it can export the result by writing to the `module.exports`.
 */
function loadModule(filename, module, require) {
  const wrapperSrc = `(function(module, exports, require) {
    ${fs.readFileSync(filename, 'utf8')}
  }) (module, module.exports, require);`;

  eval(wrapperSrc);
}

/**
 * `myRequire` will load the module by name, cache the module once its loaded
 * and return the `module.export`
 */
const myRequire = (moduleName) => {
  console.log(`Require invoked for module: ${moduleName}`);
  const id = myRequire.resolve(moduleName);

  if (myRequire.cache[id]) {
    return myRequire.cache[id].exports;
  }

  const module = {
    id,
    exports: {},
  };

  myRequire.cache[id] = module;

  loadModule(id, module, myRequire);

  return module.exports;

}

myRequire.cache = {};
myRequire.resolve = (moduleName) => {
  return moduleName; // Resolve the path to the module based on a name.
}

console.log(myRequire('./module.js'));
