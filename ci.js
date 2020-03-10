const shell = require('shelljs');
shell.rm('-rf', './dist/');
shell.exec('yarn tsc');
shell.cp('./collection-ex.d.ts', './dist/collection-ex.d.ts');
shell.cp('./package.json', './dist/package.json');
shell.cp('./README.md', './dist/README.md');
shell.cp('./LICENSE', './dist/LICENSE');
