import Swal from "sweetalert2";
import { setCartItems, getTotal, cartItem, setForm, form } from '@/components/cartAction/checkout';

const handleCheckout = async () => {
  if (!form.name || !form.email || !form.address) {
    Swal.fire("Error", "Please fill all fields!", "error");
    return;
  }

  // Create Order Object
  const orderData = {
    _type: "orders",
    customerName: form.name,
    email: form.email,
    address: form.address,
    items: cartItem.map((item: { _id: any; name: any; price: number; stock: number; discountPercent: number; }) => ({
      productId: item._id,
      name: item.name,
        price: item.price,
        quantity: item.stock,
        discount: item.discountPercent,
        totalPrice: item.stock * (item.price * (100 - item.discountPercent) / 100)
      })),
      totalAmount: getTotal(),
      status: "Pending", // Status: Pending, Processing, Shipped, Delivered
      createdAt: new Date().toISOString()
    };
  
    // Send order to Sanity.io
    try {
      await fetch('/api/createOrder', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });
  
      // Clear cart
      localStorage.removeItem("cart");
      setCartItems([]);
      setForm({ name: "", email: "", address: "" });
  
      Swal.fire("Success!", "Your order has been placed.", "success");
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Try again!", "error");
    }
  };
  