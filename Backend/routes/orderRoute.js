import express from 'express';
import authMiddleware from './../middleware/auth.js';
import { placeOrder, updateOrderPayment,userOrders, listOrders, updateStatus} from '../controllers/orderController.js';


const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify-payment",authMiddleware, updateOrderPayment);
orderRouter.post("/test-payment", updateOrderPayment);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);


export default orderRouter;