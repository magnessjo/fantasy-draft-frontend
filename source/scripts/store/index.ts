import { createStore } from 'redux';
import { ModalTypes, AlertType, UserType, SessionType } from 'scripts/types';
import { getLocalState, saveLocalState } from './sesson';

export type GlobalStateTypes = {
  modalState: ModalTypes;
  alertState: AlertType;
  userState: UserType;
  sessionState: SessionType;
};

type Action = {
  type: string;
  payload: any;
};

const globalState: GlobalStateTypes = {
  modalState: null,
  alertState: null,
  userState: null,
  sessionState: null,
};

export const ActionTypes = {
  ADD_MODAL: 'ADD_MODAL',
  ADD_ALERT: 'ADD_ALERT',
  ADD_USER: 'ADD_USER',
  ADD_SESSION: 'ADD_SESSION',
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

export const setSessionAction = (payload: SessionType) => {
  return {
    type: ActionTypes.ADD_SESSION,
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

  if (action.type === ActionTypes.ADD_SESSION) {
    return Object.assign({}, state, {
      sessionState: action.payload,
    });
  }
  return state;
}

const store = createStore(rootReducer, getLocalState());

store.subscribe(() => {
  saveLocalState(store.getState());
});

export default store;
