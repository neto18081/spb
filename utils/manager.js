import Cookie from "js-cookie";
import { createContext, useReducer } from "react";

export const Manager = createContext();
const initialState = {
  cart: {
    cartItems: Cookie.get("cartItems")
      ? JSON.parse(Cookie.get("cartItems"))
      : [],
  },
  userInfo: Cookie.get("userInfo") ? JSON.parse(Cookie.get("userInfo")) : null,
};

function reducer(state, action) {
  switch (action.type) {
    // case "DARK_MODE_ON":
    //   return { ...state, darkMode: true };
    // case "DARK_MODE_OFF":
    //   return { ...state, darkMode: false };
    // case "CART_ADD_ITEM": {
    //   const newItem = action.payload;
    //   const existItem = state.cart.cartItems.find(
    //     (item) => item._id === newItem._id
    //   );
    //   const cartItems = existItem
    //     ? state.cart.cartItems.map((item) =>
    //         item.name === existItem.name ? newItem : item
    //       )
    //     : [...state.cart.cartItems, newItem];
    //   Cookie.set("cartItems", JSON.stringify(cartItems));
    //   return { ...state, cart: { ...state.cart, cartItems } };
    // }
    // case "CART_REMOVE_ITEM": {
    //   const cartItems = state.cart.cartItems.filter(
    //     (item) => item._id !== action.payload._id
    //   );
    //   Cookie.set("cartItems", JSON.stringify(cartItems));
    //   return { ...state, cart: { ...state.cart, cartItems } };
    // }
    // case "SAVE_SHIPPING_ADDRESS": {
    //   return {
    //     ...state,
    //     cart: { ...state.cart, shippingAddress: action.payload },
    //   };
    // }
    // case "SAVE_PAYMENT_METHOD": {
    //   return {
    //     ...state,
    //     cart: { ...state.cart, paymentMethod: action.payload },
    //   };
    // }
    // case "CART_CLEAR":
    //   return { ...state, cart: { ...state.cart, cartItems: [] } };
    // case "USER_LOGIN": {
    //   Cookie.set("userInfo", JSON.stringify(action.payload));
    //   return { ...state, userInfo: action.payload };
    // }
    // case "USER_LOGOUT": {
    //   return {
    //     ...state,
    //     userInfo: null,
    //     cart: { cartItems: [], shippingAddress: {}, paymentMethod: "" },
    //   };
    // }

    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const sameId = state.cart.cartItems.filter(
        (item) => item.id === newItem.id
      );
      let exactItem;
      let existItem = false;
      sameId.forEach((i) => {
        if (i.cor == newItem.cor && i.tamanho == newItem.tamanho) {
          existItem = true;
          exactItem = i;
        }
      });
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.id == exactItem.id &&
            item.cor == exactItem.cor &&
            item.tamanho == exactItem.tamanho
              ? {
                  ...newItem,
                  quantidade: newItem.quantidade + exactItem.quantidade,
                }
              : item
          )
        : [...state.cart.cartItems, newItem];
      Cookie.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_REMOVE_ITEM": {
      const item = action.payload;

      const cartItems = state.cart.cartItems.filter((i) => item != i);

      Cookie.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_CLEAR": {
      Cookie.set("cartItems", "[]");
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }

    case "USER_LOGOUT": {
      Cookie.set("userInfo", "");
      return { ...state, userInfo: null };
    }

    default:
      return state;
  }
}

export function ManagerProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Manager.Provider value={{ state, dispatch }}>
      {props.children}
    </Manager.Provider>
  );
}
