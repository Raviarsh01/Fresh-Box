import * as variable from "../Constants";

export const MenuReducer = (state = {}, action) => {
  switch (action.type) {
    case variable.MENU_GETDATA_LOADING:
      return {
        loading: true,
      };
    case variable.MENU_GETDATA_SUCCESS:
      return {
        loading: false,
        success: true,
        MenuData: action.payload,
        message: action.payload.message,
      };
    case variable.MENU_GETDATA_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const cart = [];
export const cartReducer = (state = cart, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { id, name, price } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        return state.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...state, { id, name, price, quantity: 1 }];
      }

    case "REMOVE_FROM_CART":
      let updatedCart = state.filter((item) => item.id !== action.payload);
      return updatedCart;

    case "INCREASE_QUANTITY":
      const itemId = action.payload;
      return state.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

    case "DECREASE_QUANTITY":
      const itemId1 = action.payload;
      return state.map((item) => {
        if (item.id === itemId1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });

    default:
      return state;
  }
};