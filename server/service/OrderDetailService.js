const OrderDetailModel = require('../model/OrderDetailModel');

class OrderDetailService {
    add(data) {
        return OrderDetailModel.add(data)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
    }
    find(data, callback) {
        return OrderDetailModel.find(data, callback)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
    }
    update(condition, data) {
        return OrderDetailModel.update(condition, data)
            .then((result) => {
                console.log(result)
                return result
            })
            .catch((error) => {
                return error
            })
    }
    delete(data) {
        return OrderDetailModel.delete(data)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
    }
}

module.exports = new OrderDetailService();