const { program } = require('commander');
const { create_car, get_car_by_status, search_car_by_registration_number } = require('./func');

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

program
    .command('status <date>')
    .description('fetch data by date')
    .action((date) => {
        get_car_by_status(date);
    });

program
    .command('search_car_by_registration_number <rn>')
    .description('fetch data by registration number')
    .action((rn) => {
        search_car_by_registration_number(rn);
    });

program.parse(process.argv);
