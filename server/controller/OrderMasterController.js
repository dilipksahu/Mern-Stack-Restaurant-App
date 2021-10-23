const OrderMasterService = require('../service/OrderMasterService');
const easyinvoice = require('easyinvoice');
const path = require('path');
const pdf = require('html-pdf');
const pdfTemplate = require('../documents');

class OrderMasterController {
    add(req, res) {
        console.log("req.body: " + JSON.stringify(req.body, null, 2));
        const responseResult = {}
        let orderDetails = []
        let orderedFood = req.body.orderDetails;
        if (orderedFood && orderedFood.length != 0) {
            for (const order of orderedFood.values()) {
                orderDetails.push({
                    foodItemId: order.foodItemId,
                    foodItemPrice: order.foodItemPrice * order.quantity,
                    quantity: order.quantity,
                    foodItemName: order.foodItemName
                })
            }

        }
        let inputData = {
            orderNumber: req.body.orderNumber,
            customerId: req.body.customerId,
            pMethod: req.body.pMethod,
            gTotal: req.body.gTotal,
            orderDetail: orderDetails
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
        await OrderMasterService.find(inputData).then((result) => {
            console.log("List Result:" + JSON.stringify(result, null, 2));

            if (result) {
                responseResult.success = true;
                responseResult.message = "Data Found";
            } else {
                responseResult.success = false;
                responseResult.message = "No Data Found!! ";
            }
            responseResult.result = result;
            return res.status(200).send(responseResult);
        }).catch((errors) => {
            responseResult.success = false;
            responseResult.error = errors;
            return res.status(500).send(responseResult);
        })
    }

    async genrateInvoice(req, res) {
        console.log("Inside Generate Invoice")
        const responseResult = {}; let inputData = {}; let body = {};
        if (req.params.id) { inputData = { _id: req.params.id } }
        await OrderMasterService.find(inputData).then((result) => {
            console.log("List Result:" + JSON.stringify(result, null, 2));

            if (result && result.length) {
                for (const item of result.values()) {
                    let orders = ''
                    if (item.orderDetail && item.orderDetail.length) {
                        for (const orderdt of item.orderDetail.values()) {
                            orders += `<tr class="item">
                            <td>${orderdt.foodItemName}</td>
                            <td>${orderdt.quantity}</td>
                            <td>₹${orderdt.foodItemPrice}</td>
                            </tr>`
                        }
                    }
                    // console.log("orders: " + JSON.stringify(orders, null, 2))
                    body = {
                        customerName: item.customerId.customerName,
                        gTotal: item.gTotal,
                        orderNumber: item.orderNumber,
                        pMethod: item.pMethod,
                        orderDetails: orders,
                        updatedAt: item.updatedAt

                    }
                }
                // console.log("body:" + JSON.stringify(body,null, 2))
                pdf.create(pdfTemplate(body), {}).toFile('result.pdf', (err) => {
                    if (err) {
                        res.send(Promise.reject());
                    }
                    console.log("root dir: ", (process.cwd()))
                    res.sendFile(`${process.cwd()}/result.pdf`);
                });
            } else {

                responseResult.success = false;
                responseResult.message = "No Data Found!! ";
                return res.status(200).send(responseResult);
            }

        }).catch((errors) => {
            responseResult.success = false;
            responseResult.error = errors;
            return res.status(500).send(responseResult);
        })

    }
}

module.exports = new OrderMasterController();