import { CURRENT_BY_CITY } from "./actions";

const initialState = {
  weather: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_BY_CITY:
      return {
        ...state,
        weather: action.payload,
      };
    default:
      return state;
  }
}
