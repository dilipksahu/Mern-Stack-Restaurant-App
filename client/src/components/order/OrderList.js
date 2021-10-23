import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Table from "../../layouts/Table";
import { TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
// import DownloadForOfflineIcon from '@material-ui/icons/DownloadForOffline';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { saveAs } from 'file-saver';

export default function OrderList(props) {

    const { orderId, setOrderId, setOrderListVisibility } = props;
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.ORDER).fetchAll()
            .then(res => {
                setOrderList(res.data.result)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.INVOICE).fetchById(orderId)
            .then(res => {
                setOrderList(res.data.result)
            })
            .catch(err => console.log(err))
    }, [])


    const showForUpdate = id => {
        setOrderId(id);
        setOrderListVisibility(false);
    }

    const downloadInvoice = id => {
        console.log("id:"+id)
        createAPIEndpoint(ENDPIONTS.INVOICE).createPdf(id)
            .then(res => {
                console.log(res)
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                console.log(pdfBlob)
                saveAs(pdfBlob, 'newPdf.pdf');
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order No.</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Payed With</TableCell>
                        <TableCell>Grand Total</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orderList && orderList.map(item => (
                            <TableRow key={item._id}>
                                <TableCell
                                    onClick={e => showForUpdate(item._id)}>
                                    {item.orderNumber}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item._id)}>
                                    {item.customerId.customerName}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item._id)}>
                                    {item.pMethod}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item._id)}>
                                    {item.gTotal}
                                </TableCell>
                                <TableCell>
                                    <DeleteOutlineTwoToneIcon
                                        color="secondary"
                                    // onClick={e => deleteOrder(item.orderMasterId)} 
                                    />
                                </TableCell>
                                <TableCell>
                                    <CloudDownloadIcon
                                        color="secondary"
                                        onClick={e => downloadInvoice(item._id)}
                                    />
                                </TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}
