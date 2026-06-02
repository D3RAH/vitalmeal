import orderModel from "../models/orderModel.js";
import axios from "axios";



// placing user order from frontend
const placeOrder = async (req,res) => {

  const frontend_url = "http://localhost:5174"


   try {
    const { userId, items, amount, address } = req.body;

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      payment: false,
      status: "Food processing"
    });

    await newOrder.save();

    res.json({
      success: true,
      orderId: newOrder._id
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
}; 

// updating order payment
const updateOrderPayment = async (req, res) => {
  try {
    const { orderId, reference } = req.body;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.data.status === "success") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });

      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};


//users controller for frontend
const userOrders = async (req,res) => {
  try {
    const orders = await orderModel.find({userId:req.body.userId});
    res.json({success:true,data:orders})
  }catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

// listing orders for admin panel
const listOrders = async (req,res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders})
  }catch (error) {
    res.json({success:false,message:"Error"})
  }
}

// api for updating order status
const updateStatus = async (req,res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"status updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}


export {placeOrder, updateOrderPayment, userOrders, listOrders, updateStatus};