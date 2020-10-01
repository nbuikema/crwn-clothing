import React from 'react';
import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HWRbdCiSShHe5MwTDNGkf3eF35s798gvdsD91HR44VV5yOdKoxVJE5tc0LzXSCioVTbKjBjIs1dQC7QHW6M2P9c00xOCuh87C';
    
    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            console.log(response);
            alert('payment successful');
        }).catch(error => {
            console.log(error);
            alert('payment error');
        });
    };

    return (
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            description={ `Your total is $${ price }` }
            amount={ priceForStripe }
            panelLabel='Pay Now'
            token={ onToken }
            stripeKey={ publishableKey }
        />
    );
};

export default StripeCheckoutButton;