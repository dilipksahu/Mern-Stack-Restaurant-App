import { ButtonGroup, Grid, InputAdornment, makeStyles, Button as MuiButton } from '@material-ui/core';
import React, { useState,useEffect } from 'react'
import Form from '../../layouts/Form';
import { Input, Select, Button } from '../../controls';
import ReplayIcon from '@material-ui/icons/Replay';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ReorderIcon from '@material-ui/icons/Reorder';
import { createAPIEndpoint, ENDPIONTS } from "../../api";

const pMethods = [
    { id: 'none', title: 'Select' },
    { id: 'Cash', title: 'Cash' },
    { id: 'Card', title: 'Card' },
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

    const { values, errors, handleInputChange } = props;
    const classes = useStyles();
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.CUSTOMER).fetchAll()
            .then(res => {
                // console.log(res)
                let customerList = res.data.data.map(item => ({
                    id: item.customerId,
                    title: item.customerName
                }));
                customerList = [{ id: 0, title: 'Select' }].concat(customerList);
                setCustomerList(customerList);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Form>
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
                    />

                </Grid>
                <Grid item xs={6}>
                    <Select
                        label="Payment Method"
                        name="pMethod"
                        options={pMethods}
                        value={values.pMethod}
                        onchange={handleInputChange}
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
