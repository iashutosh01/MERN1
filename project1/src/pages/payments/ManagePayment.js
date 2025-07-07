import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { serverEndpoint } from '../../config/config';
import { SET_USER } from '../../redux/user/actions';

const CREDIT_PACKS = [10, 20, 50, 100];

function ManagePayment() {
  const user = useSelector((state) => state.userDetails);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handlePayment = async (credits) => {
    try {
      setLoading(true);
      setErrors({});
      setMessage(null);

      const orderResponse = await axios.post(
        `${serverEndpoint}/payments/create-order`,
        { credits },
        { withCredentials: true }
      );

      const order = orderResponse.data.order;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Affiliate++',
        description: `${credits} credits pack`,
        order_id: order.id,
        theme: {
          color: '#3399cc'
        },
        handler: async (payment) => {
          try {
            const verifyResponse = await axios.post(
              `${serverEndpoint}/payments/verify-order`,
              {
                razorpay_order_id: payment.razorpay_order_id,
                razorpay_payment_id: payment.razorpay_payment_id,
                razorpay_signature: payment.razorpay_signature,
                credits
              },
              { withCredentials: true }
            );

            dispatch({
              type: SET_USER,
              payload: verifyResponse.data.user
            });

            setMessage("Payment successful! Credits updated.");
          } catch (error) {
            console.error(error);
            setErrors({
              message: "Unable to verify order. Please contact support if amount is deducted."
            });
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error(error);
      setErrors({ message: 'Unable to prepare order, please try again' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-3">
      {errors.message && (
        <div className="alert alert-danger" role="alert">
          {errors.message}
        </div>
      )}
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}

      <h2>Manage Payment</h2>
      <p>
        <strong>Current Balance: </strong>
        {user.credits}
      </p>

      <div className="row">
        {CREDIT_PACKS.map((credit) => (
          <div key={credit} className="col-auto border m-2 p-2">
            <h4>{credit} Credits</h4>
            <p>Buy {credit} credits for INR {credit}</p>
            <button
              className="btn btn-outline-primary"
              onClick={() => handlePayment(credit)}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Buy Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManagePayment;
