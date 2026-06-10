import React, { useEffect, useState, useContext } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import './paymentSuccess.css'
import { StoreContext } from '../../context/StoreContext'

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('Verifying payment...')
  const reference = searchParams.get('reference')
  const {setCartItems, url } = useContext(StoreContext)

  // get order ID (saved when placing order)
  const orderId = localStorage.getItem("orderId")

    useEffect(() => {
        const verifyPayment = async () => {
            // If there's no reference, payment may have failed or user cancelled
            if (!reference) {
            setStatus('Payment Failed ❌');
            return;
            }

            try {
              // VERIFY PAYSTACK PAYMENT
            const response = await fetch(`${url}/api/paystack/verify/${reference}`);
            const data = await response.json();

            if (data?.data?.status === 'success' || data?.order?.status === 'Paid') {
                setStatus('Payment Successful ✅')

                // Clear cart after a successful payment
                setCartItems({})
                
                // clear backend cart if logged in
                const token = localStorage.getItem('token')
                if (token) {
                  try {
                    await fetch(`${url}/api/cart/clear`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'token': token
                      }
                    })
                  } catch (err) {
                    console.log('Cart clear error:', err)
                  }
                }

                // UPDATE ORDER PAYMENT STATUS (Only if it's a website order with an ID)
                if (orderId) {
                  localStorage.removeItem("orderId")
                  await fetch(`${url}/api/order/verify-payment`, {
                    method: 'POST',
                    headers: {
                      'content-Type': 'application/json',
                      'token': localStorage.getItem('token'),
                    },
                    body: JSON.stringify({
                      orderId,
                      reference,
                    }),
                  })
                }
            } else {
                setStatus('Payment Failed ❌');
            }
            } catch (error) {
            console.log('Verification failed:', error);
            setStatus('Payment Failed ❌');
            }
        };

        verifyPayment();
    }, [reference, orderId, setCartItems,url]);

    // Countdown effect to redirect after showing the payment status
    useEffect(() => {
      if (status !== 'Payment Successful ✅') return;

    
      // Trigger router navigation
      const redirectTimeout = setTimeout(() => {
        navigate('/');
      }, 5000);

      return () => clearTimeout(redirectTimeout);
    
    }, [status, navigate]);

  return (
    <div className="payment-success-container">
      <h2 className="payment-status">{status}</h2>
      {reference && <p className="payment-reference">Transaction Reference: {reference}</p>}

      {/* Dynamic countdown element injected into the UI layout */}
      {status === 'Payment Successful ✅' && (
        <p className="redirect-notice">
          Redirecting<span className="animated-dots"><span>.</span><span>.</span><span>.</span></span>
        </p>
      )}
    </div>
  )
}

export default PaymentSuccess