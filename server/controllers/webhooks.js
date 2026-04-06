// import Stripe from "stripe";
// import Transaction from "../models/Transaction";
// import User from "../models/User";

// export const=stripeWebhooks=async(request,response)=>{
//     const stripe=new stripe(process.env.STRIPE_SECRET)
//     const sig =  request.headers["stripe-signatue"]

//     let event;

//     try{
//         event=stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)


//     }
//     catch(error){
//         return response.status(400).send(`webhook error: $(error.message)`)
//     }

//     try{
//         switch(event.type){
//             case "payment_intent.succeeded":{
//                 const paymentIntent = event.data.object;
//                 const sessionList =  await stripe.checkout.sessions.list({
//                     payment_intent: paymentIntent.id,
//                 })
//                 const session = sessionList.data[0];
//                 const{transactionId,appId}=session.metadata;

//                 if(appId==='chatbottt'){
//                     const transaction = await Transaction.findOne({_id:transactionId, isPaid:false})

//                     //updates credits in user accound
//                     await User.updateOne({_id: transaction.userId}, {$inc:{credits: transaction.credits}})

//                     //update credits payment status
//                     transaction.isPaid = true;
//                     await transaction.save();
//                 }else{
//                     return response.json({received:true, message:"Ignored event:invzlid app"})
//                 }
//                 break;

//             }
//             default:
//                 console.log("Unhandled event type:",event.type)
//                 break;
//         }
//         response.json({received:true})
//     }
//     catch(error){
//         console.log("webhook processing error:", error)
//         response.status(500).send("internal server error")

//     }
// }

import Stripe from "stripe";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const stripeWebhooks = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        const { transaction, appId } = session.metadata;

        if (appId !== "chatbottt") {
          return res.json({
            received: true,
            message: "Ignored: invalid app id",
          });
        }

        const txn = await Transaction.findOne({
          _id: transaction,
          isPaid: false,
        });

        if (!txn) {
          return res.json({ received: true, message: "Transaction not found" });
        }

        // Add credits to user
        await User.updateOne(
          { _id: txn.userId },
          { $inc: { credits: txn.credits } }
        );

        // Mark transaction as paid
        txn.isPaid = true;
        await txn.save();

        break;
      }

      default:
        console.log("Unhandled event:", event.type);
        break;
    }

    res.json({ received: true });

  } catch (error) {
    console.log("Webhook processing error:", error);
    res.status(500).send("Internal server error");
  }
};
