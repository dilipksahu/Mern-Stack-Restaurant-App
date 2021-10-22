import { Grid } from '@material-ui/core';
import React, {useState} from 'react'
import Form from '../../layouts/Form';
import {Input, Select, Button} from '../../controls';

const pMethods = [
    {id:'none' , title: 'Select'},
    {id:'Cash' , title: 'Cash'},
    {id:'Card' , title: 'Card'},
]

const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

const getFreshModelObject = () => ({
    orderMasterId:0,
    orderNumber: generateOrderNumber(),
    customerId:0,
    pMethod:'none',
    gTotal: 0,
    deletedOrderItemids:'',
    orderDetails: []

});

export default function OrderForm() {

    const [values,setValues] = useState(getFreshModelObject());

    return (
        <Form>
            <Grid container>
                <Grid item xs={6}>
                    <Input
                        disabled
                        label="Order Number"
                        name="orderNumber"
                        value={values.orderNumber}
                    />
                    <Select 
                        label="Customer"
                        name="customerId"
                        options={[
                            {'id':0,'title':'select'},
                            {'id':1,'title':'Dilip'},
                            {'id':2,'title':'Shailesh'},
                            {'id':3,'title':'Deepak'}
                        ]}
                    />
                        
                </Grid>
                <Grid item xs={6}>
                    <Select 
                        label="Payment Method"
                        name="pMethod"
                        options={pMethods}
                    />
                    <Input
                        disabled
                        label="Grant Total"
                        name="gTotal"
                    />
                </Grid>
            </Grid>
        </Form>
    )
}
