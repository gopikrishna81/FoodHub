import { createContext, useState } from "react";


export const CartContext = createContext();



export function CartProvider({ children }) {


  const [cartItems, setCartItems] = useState(() => {

    const savedCart = localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });



  const updateCart = (newCart) => {

    setCartItems(newCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(newCart)
    );

  };




  // Add item

  const addToCart = (item) => {


    const existingItem = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );



    let updatedCart;



    if (existingItem) {


      updatedCart = cartItems.map((cartItem) =>

        cartItem.id === item.id

          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }

          : cartItem

      );


    } else {


      updatedCart = [

        ...cartItems,

        {
          ...item,
          quantity: 1,
        }

      ];


    }


    updateCart(updatedCart);

  };





  // Increase quantity

  const increaseQuantity = (id) => {


    const updatedCart = cartItems.map((item) =>

      item.id === id

      ? {
          ...item,
          quantity: item.quantity + 1,
        }

      : item

    );


    updateCart(updatedCart);

  };





  // Decrease quantity

  const decreaseQuantity = (id) => {


    const updatedCart = cartItems

      .map((item) =>

        item.id === id

        ? {
            ...item,
            quantity: item.quantity - 1,
          }

        : item

      )

      .filter(
        (item) => item.quantity > 0
      );



    updateCart(updatedCart);

  };





  // Remove item

  const removeFromCart = (id) => {


    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );


    updateCart(updatedCart);

  };





  // Clear cart after order

  const clearCart = () => {


    setCartItems([]);

    localStorage.removeItem("cart");

  };





  return (

    <CartContext.Provider

      value={{

        cartItems,

        addToCart,

        increaseQuantity,

        decreaseQuantity,

        removeFromCart,

        clearCart,

      }}

    >

      {children}

    </CartContext.Provider>

  );

}