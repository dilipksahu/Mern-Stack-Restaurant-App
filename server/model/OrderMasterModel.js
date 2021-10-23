const mongoose = require('mongoose');

const orderMasterSchema = mongoose.Schema({
    orderNumber: {
        type: Number,
        required: false
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    pMethod: {
        type: String,
        enum: ['cash', 'card'],
        default: 'cash'
    },
    gTotal: {
        type: Number,
        required: false
    },
    orderDetail:[
        {
            foodItemId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'foodItem'
            },
            foodItemPrice: {
                type: Number,
                required: false
            },
            quantity: {
                type: Number,
                required: false
            },
            foodItemName:{
                type:String,
                required:false
            }

        }
    ]
},
    {
        timestamps: true
    }
);

const orderMaster = mongoose.model('orderMaster', orderMasterSchema);
class OrderMasterModel {
    add(data) {
        return new Promise((resolve, reject) => {
            new orderMaster(data).save().then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    find(data, callback) {
        return new Promise((resolve, reject) => {
            orderMaster.find(data)
                .sort({ createdAt: -1 })
                .populate('customerId')
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
            orderMaster.update(condition, data).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    delete(data, callback) {

        return new Promise((resolve, reject) => {
            orderMaster.findByIdAndRemove({ '_id': data.id }).then((result) => {
                resolve(result);
            }).catch((err) => {
                console.log(err);
                reject(err);
            })
        })
    }



}

module.exports = new OrderMasterModel();
