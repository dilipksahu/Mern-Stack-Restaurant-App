const CustomerService = require('../service/CustomerService');

class CustomerController {
    add(req, res) {
        console.log("req.body: " + JSON.stringify(req.body, null, 2));
        const responseResult = {}
        let inputData = {
            customerName: req.body.customerName,
        };

        CustomerService.add(inputData).then((result) => {
            console.log("Customer add Result:" + JSON.stringify(result, null, 2));
            if (result.code == 11000) {
                responseResult.success = false;
                responseResult.message = "Duplicate record";
            } else if (result.errors) {
                responseResult.success = false;
                responseResult.message = "Please Enter Proper Input!";
            } else {
                responseResult.success = true;
                responseResult.message = "Sucessfully saved Customer Details";
            }
            responseResult.result = result;
            return res.status(201).send(responseResult);
        }).catch((e) => {
            responseResult.success = false;
            responseResult.error = e;
            return res.status(500).send(responseResult);
        })
    }

    async list(req, res) {
        const responseResult = {}; let inputData = {};
        if (req.params.id) { inputData = { _id: req.params.id } }
        await CustomerService.find(inputData).then((result) => {
            console.log("Customer list Result:" + JSON.stringify(result, null, 2));

            if (result) {
                responseResult.success = true;
                responseResult.message = "Customer Details Found";
            } else {
                responseResult.success = false;
                responseResult.message = "No Customer Found ";                
            }
            responseResult.result = result;
            return res.status(200).send(responseResult);
        }).catch((errors) => {
            responseResult.success = false;
            responseResult.error = errors;
            return res.status(500).send(responseResult);
        })
    }
}

module.exports = new CustomerController();