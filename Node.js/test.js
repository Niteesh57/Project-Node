const fs = require('fs');
const {parse} = require('csv-parse');

const result = []

fs.createReadStream('./Node.js/data.csv')
.pipe(parse({
    comment: '#',
    delimiter: ',',
    columns: true,
}))
.on('data', function(row) {
    result.push(row)
    })
    .on('end', function() {
        console.log(result)
    });