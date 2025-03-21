import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../apiCalls/userApi';

const CartPage = () => {
  // Load cart from localStorage
  const navigate = useNavigate();
    const { user } = isAuthenticated();
    useEffect(()=>{
      if(!user){
        navigate("/login");
      }
    },[])
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [
      { id: 1, name: 'Apple', price: 25, quantity: 1, image: 'apple.jpg' },
      { id: 2, name: 'Mobile', price: 15, quantity: 2, image: 'mobile.jpg' },
      { id: 3, name: 'WaterBottle', price: 15, quantity: 2, image: 'waterbottle.jpg' },
      { id: 4, name: 'T-shirt', price: 15, quantity: 2, image: 'tshirt.jpg' },
      { id: 5, name: 'BoxPant', price: 15, quantity: 2, image: 'boxpant.jpg' },
    ];
  });

  // Save cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return; // Prevent negative or zero quantity
    setCart(cart.map(item => (item.id === id ? { ...item, quantity } : item)));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl text-black font-bold mb-4">Shopping Cart</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p>${item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <h2 className="text-xl font-semibold">Total: ${totalPrice}</h2>
              <button onClick={()=>{navigate('/checkout')}} className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
