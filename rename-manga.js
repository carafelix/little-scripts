const fs = require('fs')
const files = fs.readdirSync(__dirname);
files.pop();

for (const file of files) {
    fs.renameSync(
        __dirname + '/' + file,
        __dirname + '/' + file.replace('.rar', '.cbz'),
        err => {
          console.log(err)
        }
      )
  }