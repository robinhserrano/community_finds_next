import { ITEM_OWNER_INFORMATION } from "./actionTypes.js";

const initialState = {
  itemdatelostValue: "",
  itemtimelostValue: "",
  itemimageValue: [],
  itemtypelocationValue: "",
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_OWNER_INFORMATION:
      return {
        itemdatelostValue: action.payload.itemdatelostValue,
        itemtimelostValue: action.payload.itemtimelostValue,
        itemimageValue: action.payload.itemimageValue,
        itemtypelocationValue: action.payload.itemtypelocationValue,
      };

    default:
      return state;
  }
};

export default itemReducer;
