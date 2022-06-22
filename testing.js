const { readFile, existsSync, promises, writeFile } = require('fs');
const { join } = require('path');
const { promisify } = require('util');
const asyncReadFile = promisify(readFile);

(async () => {
     const pathToIcons = join(__dirname, 'src/icons');
     const dist = join(__dirname, 'src/scss/');

     const folderExist = existsSync(pathToIcons);

     if (!folderExist) {
          return console.error(`Error! Directory ${pathToIcons} doesn't exist`);
     }

     const returnSvg = async (svgPath) => {
          const data = await asyncReadFile(svgPath);

          return data.toString();
     };

     const files = await promises.readdir(pathToIcons);

     writeFile(`${dist}iconsData.scss`, '', function () {});

     for (const file of files) {
          const oldSvg = await returnSvg(`${pathToIcons}/${file}`);
          const newSVG = oldSvg.slice(0, 5) + 'fill="#{$fillcolor}"' + ' ' + oldSvg.slice(5);

          const generateFunctionName = 'sassvg-' + file.slice(0, -4);
          const template = `@function ${generateFunctionName}($fillcolor){@return 'data:image/svg+xml;charset=US-ASCII,${newSVG}'}`.replace(/(\r\n|\n|\r)/gm, '');

          writeFile(`${dist}iconsData.scss`, template + '\r\n', { flag: 'a+' }, (err) => {
               if (err) {
                    console.error(err);
               }
          });
     }
})();
