import { playerReducer } from './playerReducer';
import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { trackReducer } from './trackReducer';


const rootReducer = combineReducers({
  player: playerReducer,
  track: trackReducer
})

export const reducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return {...state, ...action.payload};
    default:
      return rootReducer(state, action);
  }
};

export type RootState = ReturnType<typeof rootReducer>