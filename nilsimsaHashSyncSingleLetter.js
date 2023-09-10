const fs = require('fs');
const path = require('path')
const { Nilsimsa } = require('nilsimsa');
const nilsimsa = new Nilsimsa();
const prompt = require('prompt');

prompt.start();

console.log(`If you want a custom path, type it in full-length w/o the final '/',\n\tElse leave it blank and current path will be used.\n\aFilename require inclusion of the extension \n`);

prompt.get([`path`,'filename'], function (err, result) {
    
    let filePath;
    let parentDir;
    if(result.path.toLowerCase() !== ''){
        parentDir = result.path + '/';
        filePath = result.path + '/' + result.filename
    } else {
        parentDir = __dirname + '/';
        filePath = __dirname + '/' + result.filename
    }


    const fileToStr = fs.readFileSync(filePath).toString();

    const hashi = new Nilsimsa(fileToStr).digest('hex');

    const splitted = hashi.split('').map((v)=>{
        return Number(`0x${v}`)
    });

    const letterfy = splitted.map((v,i)=>{
        if((i+1)%2 === 0){
            return String.fromCharCode(122-v)
        } else return String.fromCharCode(v+97)
    });

    const spanned = letterfy.join('\n');
    const plain = letterfy.join('');
    
    const outputDir = parentDir + 'output'

    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir);
    }
    
    const newFilePath = outputDir + '/' +'o_' + result.filename;

    fs.writeFile(newFilePath,hashi + '\n\n' + spanned, err => {
        if (err) {
          console.error(err);
        }
      })

  });