const fs = require('fs');
const csv = require('csv-parse');

const result = []

fs.createReadStream('data.csv')
.pipe(parse())
.on('data', function(row) {
    result.push(row)
    })
    .on('end', function() {
        console.log(result)
    });