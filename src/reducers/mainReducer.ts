//@ts-ignore
import { SET_FILTER } from "../actions";

const initialState = {
  id: 0,
};
const mainReducer = (
  state = initialState,
  action: { type: any; payload: any[] }
) => {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
};

export default mainReducer;
