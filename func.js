const mongoose = require('mongoose');
const assert = require('assert');

mongoose.connect('mongodb://localhost:27017/rental-console', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const carSchema = new mongoose.Schema({
    registrationNumber: String,
    color: String,
    status: { type: String, default: 'Free' },
    customer: { type: String, default: '' }
});
const Car = mongoose.model('Car', carSchema);

const create_car = (car) => {
    Car.create(car, (err) => {
        assert.equal(null, err);
        console.info(`Car ${car.registrationNumber} ${car.color} saved`);
        process.exit();
    });
};

module.exports = { create_car };
