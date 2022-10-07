import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import React from "react";

const PUBLIC_KEY= "pk_test_51Lq9jSCojvtnk7Y3RzKl5pziv6otHqvu1n2AK04LoCrNp7ANG6EOfobpvuFen1jT6lVTtzYxwHZUw6pvQuJfot1H00MCH2HjiT"
const strieTestPromise = loadStripe(PUBLIC_KEY)

export default Stripe_Contation= ()=>{
    return (
    <>
    <Elements stripe = {strieTestPromise}>
        <PaymentForm/>
    </Elements>
    
    </>)
}