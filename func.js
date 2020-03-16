const mongoose = require('mongoose');
const cTable = require('console.table');

mongoose.connect('mongodb://localhost:27017/rental-console', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const carSchema = new mongoose.Schema({
    registrationNumber: { type: String, unique: true },
    color: String,
    customer: { type: String, default: '' }
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
    try {
        const cars = await Car.find({}).exec();
        const carsq = cars.map(item => {
            let status = 'Free', customerName = '';
            if (item.customer.includes(date)) {
                status = 'Rented';
                const customerNameArr = item.customer.match(new RegExp(`.*${date}(\\(\\w+\\)).*`));
                customerName = customerNameArr[1].substring(1, customerNameArr[1].length-1)
            }
            return {
                RegistrationNumber: item.registrationNumber,
                Color: item.color,
                Status: status,
                Customer: customerName
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

const reserve = async (rn, customerName, dateRent) => {
    try {
        const car = await Car.findOne({registrationNumber: rn}).exec();
        if (!car.customer.includes(dateRent)) {
            await Car.updateOne({registrationNumber: rn}, {customer: car.customer + dateRent + "(" + customerName + ")", dateRent: dateRent}).exec();
            console.info(`Reserved ${rn} to ${customerName} on ${dateRent}`)
        }
        else {
            console.log('Already reserved')
        }
        process.exit();
    }
    catch(err) {
        console.error(err);
    }
}

module.exports = { create_car, get_car_by_status, search_car_by_registration_number, reserve };
