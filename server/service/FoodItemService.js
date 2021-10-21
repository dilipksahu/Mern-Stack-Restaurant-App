const FoodItemModel = require('../model/FoodItemModel');

class FoodItemrService {
    add(data) {
        return FoodItemModel.add(data)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
    }
    find(data, callback) {
        return FoodItemModel.find(data, callback)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
    }
    update(condition, data) {
        return FoodItemModel.update(condition, data)
            .then((result) => {
                console.log(result)
                return result
            })
            .catch((error) => {
                return error
            })
    }
    delete(data) {
        return FoodItemModel.delete(data)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
    }
}

module.exports = new FoodItemrService();