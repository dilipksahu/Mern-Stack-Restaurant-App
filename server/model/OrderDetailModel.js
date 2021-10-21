const mongoose = require('mongoose');

const orderDetailSchema = mongoose.Schema({
    orderMasterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderMaster'
    },
    foodItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodItem'
    },
    foodItemPrice: {
        type: Number,
        required: false
    },
    quatity: {
        type: Number,
        required: false
    }
},
    {
        timestamps: true
    }
);

const orderDetail = mongoose.model('orderDetail', orderDetailSchema);
class OrderDetailModel {
    add(data) {
        return new Promise((resolve, reject) => {
            new orderDetail(data).save().then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    find(data, callback) {
        return new Promise((resolve, reject) => {
            orderDetail.find(data)
                .sort({ createdAt: -1 })
                .populate('orderMasterId')
                .populate('foodItemId')
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
            orderDetail.update(condition, data).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    delete(data, callback) {

        return new Promise((resolve, reject) => {
            orderDetail.findByIdAndRemove({ '_id': data.id }).then((result) => {
                resolve(result);
            }).catch((err) => {
                console.log(err);
                reject(err);
            })
        })
    }



}

module.exports = new OrderDetailModel();
