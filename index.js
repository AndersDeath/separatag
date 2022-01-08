import fs  from 'fs';
import { importJson } from './modules'


const separatag = '<!-- [separatag] -->';
const args = process.argv.slice(2);

let counter = 1;

const settings = await importJson('../separatag.json');
console.log(settings);

const arrayHeader = 'const obj =['
let arrayBody ='';
const arrayEnd = ']';

try {
  const fileName = args[0];
  const data = fs.readFileSync(args[0], 'utf8');
  data.split(separatag).forEach((content) => {

    if(settings.outputType === 'array') {

      arrayBody += '`' + content.replace(/\`/g, "\\`").trim() + '`' + ','
    } else {
      fs.writeFile(fileName.replace(/\.[^/.]+$/, "") + counter + '.md', content.trim(), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      counter++;
    }
  });

  if(settings.outputType === 'array') {
    const commaIndex = arrayBody.lastIndexOf(',');
    arrayBody = arrayBody.substring(0, commaIndex);
    let output = arrayHeader + arrayBody + arrayEnd;

    fs.writeFile(fileName.replace(/\.[^/.]+$/, "") + '.js', output.trim(), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }
  
} catch (err) {
  console.error(err)
}
