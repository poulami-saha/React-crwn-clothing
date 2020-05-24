import { SHOP_DATA } from "./shop.data";
import ShopActionTypes from "./shop.types";
const INITIAL_STATE = {
  collections: SHOP_DATA,
  isFetching: false,
  errorMessage: undefined,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTION_SUCCESS:
      return {
        ...state,
        collections: action.payload,
      };
    case ShopActionTypes.FETCH_COLLECTION_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: false,
      };
    case ShopActionTypes.FETCH_COLLECTION_START:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default shopReducer;
