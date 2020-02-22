import { createStore } from 'redux';
import { ModalTypes } from 'scripts/types';

export type GlobalStateTypes = {
  modalState: ModalTypes;
};

type Action = {
  type: string;
  payload: any;
};

const globalState: GlobalStateTypes = {
  modalState: null,
};

export const ActionTypes = {
  ADD_MODAL: 'ADD_MODAL',
};

export const setModalAction = (payload: ModalTypes) => {
  return {
    type: ActionTypes.ADD_MODAL,
    payload: payload,
  };
};

export function rootReducer(state = globalState, action: Action) {
  if (action.type === ActionTypes.ADD_MODAL) {
    return Object.assign({}, state, {
      modalState: action.payload,
    });
  }
  return state;
}

export default createStore(rootReducer);
