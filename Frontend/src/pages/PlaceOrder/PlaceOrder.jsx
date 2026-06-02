import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext} from '../../context/StoreContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cart from './../Cart/Cart';


const PlaceOrder = () => {


const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const handlePayment = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    //Prepare order items from cart
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    //Create order in database FIRST
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    const orderResponse = await fetch(url + "/api/order/place", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "token": token
      },
      body: JSON.stringify(orderData),
    });

    const orderResult = await orderResponse.json();

    if (!orderResult.success) {
      alert(orderResult.message || "Failed to create order");
      setLoading(false);
      return;
    }

    // Save order ID to localStorage
    localStorage.setItem("orderId", orderResult.orderId);
    console.log("Order created successfully:", orderResult.orderId);

    //Initialize payment
    const amount = (getTotalCartAmount() + 2) * 100;

    const paymentResponse = await fetch(url + "/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        email: data.email, 
        amount,
        orderId: orderResult.orderId
      }),
    });

    const paymentData = await paymentResponse.json();

    if (paymentData.status && paymentData.data.authorization_url) {
      window.location.href = paymentData.data.authorization_url;
    } else {
      alert("Error initializing payment");
    }
  } catch (error) {
    console.error(error);
    alert("Payment failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const navigate = useNavigate();

  useEffect(()=> {
    if (!token) {
      navigate('/Cart')
    }
    else if(getTotalCartAmount()===0) {
      navigate('/Cart')
    }
  })

  return (
    <form onSubmit={handlePayment} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code'/>
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₦{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>₦{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>₦{getTotalCartAmount() ===0?0:getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "PROCEED TO PAYMENT"}
          </button>
        </div>  
      </div>
    </form>
  )
}

export default PlaceOrder
