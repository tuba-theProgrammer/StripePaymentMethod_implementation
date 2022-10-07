const express = require("express")
const app = express()
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.post('/pay', async (req, res) => {
    const {email} = req.body;
	console.log(req.body)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: 'usd',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
        receipt_email: email,
      });

      res.json({'client_secret': paymentIntent['client_secret']})
})


app.post('/sub', async (req, res) => {
	const {email, payment_method} = req.body;
     console.log(req.body)
	const customer = await stripe.customers.create({
	  payment_method: payment_method,
	  email: email,
	  invoice_settings: {
		default_payment_method: payment_method,
	  },
	});
  
	const subscription = await stripe.subscriptions.create({
	  customer: customer.id,
	  items: [{ plan: 'plan_G......' }],
	  expand: ['latest_invoice.payment_intent']
	});
	
	const status = subscription['latest_invoice']['payment_intent']['status'] 
	const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']
  
	res.json({'client_secret': client_secret, 'status': status});
  })
  

app.listen(process.env.PORT || 3001, () => {
	console.log("Sever is listening on port 3001")
})