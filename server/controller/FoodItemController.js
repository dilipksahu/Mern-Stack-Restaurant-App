const FoodItemService = require('../service/FoodItemService');

class FoodItemController {
    add(req, res) {
        console.log("req.body: " + JSON.stringify(req.body, null, 2));
        const responseResult = {}
        let inputData = {
            foodItemName: req.body.customerName,
            price: req.body.price
        };

        FoodItemService.add(inputData).then((result) => {
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
        await FoodItemService.find(inputData).then((result) => {
            console.log("List Result:" + JSON.stringify(result, null, 2));

            if (result) {
                responseResult.success = true;
                responseResult.message = "Data Found";
            } else {
                responseResult.success = false;
                responseResult.message = "No Data Found ";
            }
            responseResult.result = result;
            res.status(200).send(responseResult);
        }).catch((errors) => {
            responseResult.success = false;
            responseResult.error = errors;
            return res.status(500).send(responseResult)
        })
    }
}

module.exports = new FoodItemController();