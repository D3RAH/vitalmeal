import 'dotenv/config';
console.log("Check Key:", process.env.GEMINI_API_KEY);
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import paystackRouter from "./routes/paystackRoute.js";
import chatRouter from './routes/chatRoute.js';

// app config
const app = express();
const port = 3000;


// middleware
app.use(express.json());
app.use(cors());
app.use("/api/chat", chatRouter);

// DB connection
connectDB();


// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/paystack", paystackRouter);


app.get("/", (req,res) => {
    res.send("API working")
})

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log('server is active')
    })
}

export default app;
