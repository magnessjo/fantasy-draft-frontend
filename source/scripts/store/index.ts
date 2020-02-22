import { createStore } from 'redux';
import { ModalTypes, AlertType, UserType } from 'scripts/types';
import { getLocalState, saveLocalState } from './sesson';

export type GlobalStateTypes = {
  modalState: ModalTypes;
  alertState: AlertType;
  userState: UserType;
};

type Action = {
  type: string;
  payload: any;
};

const globalState: GlobalStateTypes = {
  modalState: null,
  alertState: null,
  userState: null,
};

export const ActionTypes = {
  ADD_MODAL: 'ADD_MODAL',
  ADD_ALERT: 'ADD_ALERT',
  ADD_USER: 'ADD_USER',
};

// Actions

export const setModalAction = (payload: ModalTypes) => {
  return {
    type: ActionTypes.ADD_MODAL,
    payload: payload,
  };
};

export const setAlertAction = (payload: AlertType) => {
  return {
    type: ActionTypes.ADD_ALERT,
    payload: payload,
  };
};

export const setUserAction = (payload: UserType) => {
  return {
    type: ActionTypes.ADD_USER,
    payload: payload,
  };
};

// Reducer

export function rootReducer(state = globalState, action: Action) {
  if (action.type === ActionTypes.ADD_MODAL) {
    return Object.assign({}, state, {
      modalState: action.payload,
    });
  }

  if (action.type === ActionTypes.ADD_ALERT) {
    return Object.assign({}, state, {
      alertState: action.payload,
    });
  }

  if (action.type === ActionTypes.ADD_USER) {
    return Object.assign({}, state, {
      userState: action.payload,
    });
  }
  return state;
}

const store = createStore(rootReducer, getLocalState());

store.subscribe(() => {
  saveLocalState(store.getState());
});

export default store;
