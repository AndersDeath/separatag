console.log('This is separatag utility')
const fs = require('fs')

const separatag = '<!-- [separatag] -->';
const args = process.argv.slice(2);

let counter = 1;
try {
  const fileName = args[0];
  const data = fs.readFileSync(args[0], 'utf8');
  data.split(separatag).forEach((content) => {
    fs.writeFile(fileName.replace(/\.[^/.]+$/, "") + counter + '.md', content.trim(), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      counter++;
  });
  
} catch (err) {
  console.error(err)
}
