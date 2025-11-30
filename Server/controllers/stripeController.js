import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
// models
import User from "../models/userModel.js";
import Purchase from "../models/purchaseModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// create session
export const createCheckoutSession = async (req, res) => {
  const { userId, levelId, levelTitle, price } = req.body;
  const user = await User.findById(userId);

  if (user.purchasedLevels.includes(levelId)) {
    return res.status(400).json({ message: "You already purchased this level" });
  }
  try {
    // const { userId, levelId, levelTitle, price } = req.body;
    if (!userId || !levelId || !price || !levelTitle) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // 
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: levelTitle },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: { userId, levelId },
      success_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-cancelled",
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// webhook 
export const stripeWebhook = async (req, res) => {
  try {
    let event;
    if (process.env.STRIPE_TEST_MODE === "true") {
      event = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } else {
      const sig = req.headers["stripe-signature"];
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    }
    console.log("Received event:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { userId, levelId } = session.metadata || {};

      if (!userId || !levelId)
        return res
          .status(400)
          .json({ message: "Missing userId or levelId in metadata" });
      
      await Purchase.create({
        amount: session.amount_total / 100,
        paymentStatus: "paid",
        paymentMethod: session.payment_method_types?.[0] || "card",
        transactionId: session.id,
        userId,
        levelId,
      });
      console.log("Purchase saved:", session.id);

      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { purchasedLevels: levelId } },
        { new: true }
      );
    }

    res.status(200).send("Webhook received successfully");
  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};
