
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";
import '../App.css'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}


export default function PaymentForm(){

   const [success,setSuccess] = React.useState(false)
   const stripe = useStripe()
   const elements = useElements()
   const [email, setEmail] = React.useState('');

   const handleSubmit = async (e)=>{

    e.preventDefault()

    if(!stripe||!elements){
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const {error,paymentMethod} = await stripe.createPaymentMethod({
        type:"card",
        card: elements.getElement(CardElement),
        billing_details:{
                email:email
        }
    })

     if(!error){
        try{
           const {id} = paymentMethod
           const response = await axios.post("http://localhost:3001/payment",{
            amount:1000,
            id,
            email
           })
         
           if(response.data.success){
            console.log("successful payment")
            setSuccess(true)
             // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
           }

        }catch(error){
            console.log("Error",error)
        }
     }else{
        console.log(error.message)
     }

   }
    
   return(<>
     {!success?
     <form onSubmit={handleSubmit}>
       <fieldset className="FormGroup">
          <div className="FormRow"> 
          <CardElement options={CARD_OPTIONS}/>
          </div>
       </fieldset>
        <button>
         Pay
        </button>
     </form>
   :
   <div>
      <h2>You just bought a book </h2>
    
   </div>
     }
     
   </>)
}