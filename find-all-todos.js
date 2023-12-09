var { exec } = require("child_process");
var { createWriteStream } = require("fs");

exec("rg --glob=!/node_modules --glob=!todos.txt --glob=!find-all-todos.js . -e '@todo'", (error, stdout, stderr) => {
    if (error || stderr) {
        console.error(error, stderr);
    };
    var file = createWriteStream('todos.txt');
    file.on('error', function(err) { console.error(err) });
    var clearSpaces = str => {
        var strArr = str.split('//');
        strArr[0] = strArr[0].trimRight();
        return strArr;
    };
    stdout
        .split('\n')
        .map(str => clearSpaces(str).join(''))
        .filter(str => str !== '')
        .forEach(function(v) {
            file.write(v +'\n');
        });
    file.end();
});