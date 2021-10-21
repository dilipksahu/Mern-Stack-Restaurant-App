const OrderMasterService = require('../service/OrderMasterService');

class OrderMasterController {
    add(req, res) {
        console.log("req.body: " + JSON.stringify(req.body, null, 2));
        const responseResult = {}
        let inputData = {
            orderNumber: req.body.orderNumber,
            customerId: req.body.customerId,
            pMethod: req.body.pMethod,
            gTotal: req.body.gTotal
        };

        OrderMasterService.add(inputData).then((result) => {
            console.log("Add Result:" + JSON.stringify(result, null, 2));
            if (result.code == 11000) {
                responseResult.success = false;
                responseResult.message = "Duplicate record";
            } else if (result.errors) {
                responseResult.success = false;
                responseResult.message = "Please Enter Proper Input!";
            } else {
                responseResult.success = true;
                responseResult.message = "Sucessfully saved Data";
            }
            responseResult.data = result;
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
        await OrderMasterService.find(inputData).then((result) => {
            console.log("List Result:" + JSON.stringify(result, null, 2));

            if (result) {
                responseResult.success = true;
                responseResult.message = "Data Found";
                responseResult.data = result
            } else {
                responseResult.success = false;
                responseResult.message = "No Data Found!! ";
                responseResult.data = result;
            }
            res.status(200).send(responseResult);
        }).catch((errors) => {
            responseResult.success = false;
            responseResult.error = errors;
            return res.status(500).send(responseResult);
        })
    }
}

module.exports = new OrderMasterController();