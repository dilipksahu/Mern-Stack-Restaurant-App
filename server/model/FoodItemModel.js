const mongoose = require('mongoose');

const foodItemSchema = mongoose.Schema({
    foodItemName: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    }
},
    {
        timestamps: true
    }
);

const foodItem = mongoose.model('foodItem', foodItemSchema);
class FoodItemModel {
    add(data) {
        return new Promise((resolve, reject) => {
            new foodItem(data).save().then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    find(data, callback) {
        return new Promise((resolve, reject) => {
            foodItem.find(data)
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
            foodItem.update(condition, data).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    delete(data, callback) {

        return new Promise((resolve, reject) => {
            foodItem.findByIdAndRemove({ '_id': data.id }).then((result) => {
                resolve(result);
            }).catch((err) => {
                console.log(err);
                reject(err);
            })
        })
    }



}

module.exports = new FoodItemModel();
