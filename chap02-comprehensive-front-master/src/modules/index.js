import { combineReducers } from "redux";
import productReducer from "./ProductModule";
import memberReducer from "./MemberModule";
import purchaseReducer from "./PurchaseModule";
import reviewReducer from "./ReviewModule";

const rootReducer = combineReducers({
  productReducer,
  memberReducer,
  purchaseReducer,
  reviewReducer,
});

export default rootReducer;
