const OrderMasterModel = require('../model/OrderMasterModel');

class OrderMasterService {
    add(data) {
        return OrderMasterModel.add(data)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
    }
    find(data, callback) {
        return OrderMasterModel.find(data, callback)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
    }
    update(condition, data) {
        return OrderMasterModel.update(condition, data)
            .then((result) => {
                console.log(result)
                return result
            })
            .catch((error) => {
                return error
            })
    }
    delete(data) {
        return OrderMasterModel.delete(data)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
    }
}

module.exports = new OrderMasterService();