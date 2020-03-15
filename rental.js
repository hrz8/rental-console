const { program } = require('commander');
const { create_car } = require('./func');

program
    .version('0.0.1')
    .description('rental management system');

program
    .command('create_car <registrationNumber> <color>')
    .alias('c')
    .description('add new car')
    .action((registrationNumber, color) => {
        create_car({ registrationNumber, color });
    });

program.parse(process.argv);
