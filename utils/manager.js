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
