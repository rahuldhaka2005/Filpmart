import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory Database for demo purposes
// For production, you can replace this with Firebase or Cloud SQL
const orders: any[] = [];

// Initialize Razorpay (Optional - handled gracefully if keys are missing)
let razorpayInstance: Razorpay | null = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

// -----------------------------------------------------
// API Routes
// -----------------------------------------------------

// Get all mock orders
app.get("/api/orders", (req, res) => {
  res.json({ success: true, orders });
});

// Create a Razorpay Order
app.post("/api/payment/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;
    
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    if (!razorpayInstance) {
      // Return a mock order for demo purposes if Razorpay is not configured
      const mockOrderId = "order_mock_" + Math.random().toString(36).substr(2, 9);
      return res.json({ 
        success: true, 
        isMock: true,
        order: { id: mockOrderId, amount: amount * 100, currency } 
      });
    }

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency,
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error: any) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
});

// Verify Payment and Save Order
app.post("/api/payment/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = req.body;

  if (razorpayInstance && process.env.RAZORPAY_KEY_SECRET) {
    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: "Invalid signature" });
    }
  }

  // Save the order to our database
  const newOrder = {
    id: Date.now().toString(),
    paymentId: razorpay_payment_id || "mock_payment",
    orderId: razorpay_order_id || "mock_order",
    items: orderDetails.items,
    totalAmount: orderDetails.totalAmount,
    status: "Confirmed",
    date: new Date().toISOString(),
  };

  orders.push(newOrder);

  res.json({ success: true, order: newOrder });
});

// -----------------------------------------------------
// Vite Middleware / Static Files
// -----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
