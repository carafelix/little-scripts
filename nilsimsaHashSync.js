const fs = require('fs');
const path = require('path')
const { Nilsimsa } = require('nilsimsa');
const nilsimsa = new Nilsimsa();
const prompt = require('prompt');

prompt.start();

console.log(`If you want a custom path, type it full-length w/o final '/', else leave it blank and current path would be used`)

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

    const splitted = hashi.split('').reduce((acc,v,i) => {
        if((i+2)%2){
          return acc + v + ' '
      } else return acc +v
    }, '').split(' ').map((v)=>{
        return Number(`0x${v}`)
    });

    splitted.pop();


    for(const n in splitted){
        splitted[n] = (splitted[n] % 26 + 26) % 26;
    }
    
    const letterfy = splitted.map((v)=>{
        return String.fromCharCode(v+97)
    });
    const spanned = letterfy.join('\n');
    const plain = letterfy.join('');

    const outputDir = parentDir + 'output'

    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir);
    }
    
    const newFilePath = outputDir + '/' +'o_' + result.filename;

    fs.writeFile(newFilePath, hashi + '\n\n' + spanned, err => {
        if (err) {
          console.error(err);
        }
      })

  });