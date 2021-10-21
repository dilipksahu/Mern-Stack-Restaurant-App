const CustomerModel = require('../model/CustomerModel');

class CustomerService {
    add(data) {
        return CustomerModel.add(data)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
    }
    find(data, callback) {
        return CustomerModel.find(data, callback)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
    }
    update(condition, data) {
        return CustomerModel.update(condition, data)
            .then((result) => {
                console.log(result)
                return result
            })
            .catch((error) => {
                return error
            })
    }
    delete(data) {
        return CustomerModel.delete(data)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
    }
}

module.exports = new CustomerService();