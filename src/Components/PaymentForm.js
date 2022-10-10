
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";
import { TextField } from "@mui/material";
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
   const [name, setName] = React.useState('');


   const handleSubmit = async (e)=>{

    e.preventDefault()
    try{
      
   }catch(err){

   }
    
   }
    
   return(<>
     {!success?
     <form onSubmit={handleSubmit}>
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

<TextField
          label='Name'
          id='outlined-name-input'
          margin='normal'
          variant='outlined'
          type='text'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
       <fieldset className="FormGroup">
          <div className="FormRow"> 
          <CardElement options={CARD_OPTIONS}/>
          </div>
       </fieldset>
        <button>
         Subcribe
        </button>
     </form>
   :
   <div>
      <h2>You just bought a book </h2>
    
   </div>
     }
     
   </>)
}