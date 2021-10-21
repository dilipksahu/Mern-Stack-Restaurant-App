const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: false
    },
    // is_active: {
    //     type: Boolean,
    //     default: true
    // }
},
    {
        timestamps: true
    }
);

const customer = mongoose.model('customer', customerSchema);
class CustomerModel {
    add(data) {
        console.log(data);
        return new Promise((resolve, reject) => {
            new customer(data).save().then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    find(data, callback) {

        return new Promise((resolve, reject) => {
            customer.find(data)
                .sort({ createdAt: -1 })
                .lean()
                .then((result) => {
                    resolve(result);
                }).catch((err) => {
                    reject(err);
                })
        })

    }

    update(condition, data) {
        return new Promise((resolve, reject) => {
            customer.update(condition, data).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    delete(data, callback) {

        return new Promise((resolve, reject) => {
            customer.findByIdAndRemove({ '_id': data.id }).then((result) => {
                resolve(result);
            }).catch((err) => {
                console.log(err);
                reject(err);
            })
        })
    }



}

module.exports = new CustomerModel();
