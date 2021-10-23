import { ButtonGroup, Grid, InputAdornment, makeStyles, Button as MuiButton } from '@material-ui/core';
import React, { useState,useEffect } from 'react'
import Form from '../../layouts/Form';
import { Input, Select, Button } from '../../controls';
import ReplayIcon from '@material-ui/icons/Replay';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ReorderIcon from '@material-ui/icons/Reorder';
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { roundTo2DecimalPoint } from "../../utils";

const pMethods = [
    { id: 'none', title: 'Select' },
    { id: 'cash', title: 'Cash' },
    { id: 'card', title: 'Card' },
]

const useStyles = makeStyles(theme => ({
    adornmentText: {
        '& .MuiTypography-root': {
            color: '#f3b33d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },
    submitButtonGroup: {
        backgroundColor: '#f3b33d',
        color: '#000',
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#f3b33d',
        }
    }
}))

export default function OrderForm(props) {

    const { values,setValues, errors,setErrors, handleInputChange,resetFormControls } = props;
    const classes = useStyles();
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.CUSTOMER).fetchAll()
            .then(res => {
                // console.log(res)
                let customerList = res.data.result.map(item => ({
                    id: item._id,
                    title: item.customerName
                }));
                customerList = [{ id: 0, title: 'Select' }].concat(customerList);
                setCustomerList(customerList);
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let gTotal = values.orderDetails.reduce((tempTotal, item) => {
            return tempTotal + (item.quantity * item.foodItemPrice);
        }, 0);
        setValues({
            ...values,
            gTotal: roundTo2DecimalPoint(gTotal)
        })

    }, [JSON.stringify(values.orderDetails)]);

    const validateForm = () => {
        let temp = {};
        temp.customerId = values.customerId != 0 ? "" : "This field is required.";
        temp.pMethod = values.pMethod != "none" ? "" : "This field is required.";
        temp.orderDetails = values.orderDetails.length != 0 ? "" : "This field is required.";
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    }

    const submitOrder = e => {
        console.log("Order Submitted")
        e.preventDefault();
        if (validateForm()) {
            createAPIEndpoint(ENDPIONTS.ORDER).create(values)
            .then((res)=>{
                resetFormControls();
            }).catch((error)=>{
                console.log(error);
            });
        }

    }
    return (
        <Form onSubmit={submitOrder}>
            <Grid container>
                <Grid item xs={6}>
                    <Input
                        disabled
                        label="Order Number"
                        name="orderNumber"
                        value={values.orderNumber}
                        InputProps={{
                            startAdornment: <InputAdornment
                                className={classes.adornmentText}
                                position="start">#</InputAdornment>
                        }}
                    />
                    <Select
                        label="Customer"
                        name="customerId"
                        value={values.customerId}
                        onChange={handleInputChange}
                        options={customerList}
                        error={errors.customerId}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Select
                        label="Payment Method"
                        name="pMethod"
                        value={values.pMethod}
                        onChange={handleInputChange}
                        options={pMethods}
                        error={errors.pMethod}
                    />
                    <Input
                        disabled
                        label="Grant Total"
                        name="gTotal"
                        value={values.gTotal}
                        InputProps={{
                            startAdornment: <InputAdornment
                                className={classes.adornmentText}
                                position="start">₹</InputAdornment>
                        }}
                    />
                    <ButtonGroup className={classes.submitButtonGroup}>
                        <MuiButton
                            size="large"
                            endIcon={<RestaurantMenuIcon />}
                            type="submit">Submit</MuiButton>
                        <MuiButton
                            size="small"
                            // onClick={resetForm}
                            startIcon={<ReplayIcon />}
                        />
                    </ButtonGroup>
                    <Button
                        size="large"
                        // onClick={openListOfOrders}
                        startIcon={<ReorderIcon />}
                    >Orders</Button>
                </Grid>
            </Grid>
        </Form>
    )
}
