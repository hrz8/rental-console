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
    status: { type: String, default: 'Free' },
    customer: { type: String, default: '' }
}, { timestamps: true });
const Car = mongoose.model('Car', carSchema);

const create_car = (car) => {
    Car.create(car, (err) => {
        assert.equal(null, err);
        console.info(`Car ${car.registrationNumber} ${car.color} saved`);
        process.exit();
    });
};

const get_car_by_status = (date) => {
    const momentObj = moment(new Date(date));
    Car.find({
        createdAt: {
            $gte: momentObj.toDate(),
            $lte: moment(momentObj).endOf('day').toDate()
        }
    }, (err, cars) => {
        assert.equal(null, err);
        carsq = cars.map(item => ({
            RegistrationNumber: item.registrationNumber,
            Color: item.color,
            Status: item.status,
            Customer: item.customer
        }))
        const table = cTable.getTable(carsq);
        console.info(table);
        process.exit();
    });
}

module.exports = { create_car, get_car_by_status };
