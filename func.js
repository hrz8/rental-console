const mongoose = require('mongoose');
const assert = require('assert');
const moment = require('moment');
const cTable = require('console.table');

mongoose.connect('mongodb://localhost:27017/rental-console', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const carSchema = new mongoose.Schema({
    registrationNumber: { type: String, unique: true },
    color: String,
    // status: { type: String, default: 'Free' },
    customer: { type: String, default: '' },
    dateRent: { type: String, default: '' },
}, { timestamps: true });
const Car = mongoose.model('Car', carSchema);

const create_car = async (car) => {
    try {
        const newCar = await Car.create(car);
        console.info(`Car ${newCar.registrationNumber} ${newCar.color} saved`);
        process.exit();
    }
    catch(err) {
        console.error(err);
    }
};

const get_car_by_status = async (date) => {
    const momentObj = moment(new Date(date));
    try {
        // const cars = await Car.find({
        //     createdAt: {
        //         $gte: momentObj.toDate(),
        //         $lte: moment(momentObj).endOf('day').toDate()
        //     }
        // }).exec();
        const cars = await Car.find({}).exec();
        const carsq = cars.map(item => {
            const status = item.dateRent === date ? 'Rented' : 'Free';
            return {
                RegistrationNumber: item.registrationNumber,
                Color: item.color,
                Status: status,
                Customer: item.customer
            }
        })
        const table = cTable.getTable(carsq);
        console.info(table);
        process.exit();
    }
    catch(err) {
        console.error(err);
    }
}

const search_car_by_registration_number =  async (rn) => {
    try {
        const car = await Car.findOne({registrationNumber: rn}).exec();
        const carT = [{ RegistrationNumber: car.registrationNumber,
            Color: car.color,
            Status: car.status,
            Customer: car.customer }]
        const table = cTable.getTable(carT);
        console.info(table);
        process.exit();
    }
    catch(err) {
        console.error(err);
    }
    
}

module.exports = { create_car, get_car_by_status, search_car_by_registration_number };
