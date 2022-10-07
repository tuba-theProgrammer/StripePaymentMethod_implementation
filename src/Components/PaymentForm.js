
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";
import '../App.css'
import { TextField } from "@mui/material";
import {Card} from "@mui/material";
import {CardContent} from "@mui/material";
import {Button} from "@mui/material";


const CARD_ELEMENT_OPTIONS = {
   style: {
     base: {
       'color': '#32325d',
       'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
       'fontSmoothing': 'antialiased',
       'fontSize': '16px',
       '::placeholder': {
         color: '#aab7c4',
       },
     },
     invalid: {
       color: '#fa755a',
       iconColor: '#fa755a',
     },
   },
 };
 function CardInput() {
   return (
     <CardElement options={CARD_ELEMENT_OPTIONS} />
   );
 }


export default function PaymentForm(){

   const [success,setSuccess] = React.useState(false)
   const stripe = useStripe()
   const elements = useElements()
   const [email, setEmail] = React.useState('');

   const handleSubmitPay = async (event) => {
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      const res = await axios.post('http://localhost:3001/pay', {email: email});
  
      const clientSecret = res.data['client_secret'];
  
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: email,
          },
        },
      });
  
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          console.log('Money is in the bank!');
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }
    };



    const handleSubmitSub = async (event) => {
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      const result = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      });
  
      if (result.error) {
        console.log(result.error.message);
      } else {
        const res = await axios.post('http://localhost:3001/sub', {'payment_method': result.paymentMethod.id, 'email': email});
        // eslint-disable-next-line camelcase
        const {client_secret, status} = res.data;
  
        if (status === 'requires_action') {
          stripe.confirmCardPayment(client_secret).then(function(result) {
            if (result.error) {
              console.log('There was an issue!');
              console.log(result.error);
              // Display error message in your UI.
              // The card was declined (i.e. insufficient funds, card has expired, etc)
            } else {
              console.log('You got the money!');
              setSuccess(true)
              // Show a success message to your customer
            }
          });
        } else {
          console.log('You got the money!');
          setSuccess(true)
          // No additional information was needed
          // Show a success message to your customer
        }
      }
    };
     
   return(<>
     {!success?
      <Card >
      <CardContent >
        <TextField
          label='Email'
          id='outlined-email-input'
          helperText={`Email you'll recive updates and receipts on`}
          margin='normal'
          variant='outlined'
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
   <CardInput/>
        <div>
          <Button variant="contained" color="primary"  onClick={handleSubmitPay}>
            Pay
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmitSub}>
            Subscription
          </Button>
        </div>
      </CardContent>
      </Card> :
   <div>
      <h2>You just bought a book </h2>
    
   </div>
     }
     
   </>)
}