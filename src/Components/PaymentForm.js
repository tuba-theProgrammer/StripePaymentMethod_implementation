
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";

export default PaymentForm = () =>{

   const [success,setSuccess] = useState(false)
   const stripe = useStripe()
   const elements = useElements()

   const handleSumit = async (e)=>{
    e.preventDefault()
    const {error,paymentMethod} = await stripe.createPaymentMethod({
        type:"card",
        card: elements.getElement(CardElement)
    })

     if(!error){
        try{
           const {id} = paymentMethod
           const response = await axios.post("http://localhost:3001/payment",{
            amount:1000,
            id
           })
         
           if(response.data.success){
            console.log("successful payment")
            setSuccess(true)
           }

        }catch(error){
            console.log("Error",error)
        }
     }else{
        console.log(error.message)
     }

   }
    
   return(<>
     
   </>)
}