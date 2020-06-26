import React, {createContext, useReducer} from 'react';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'change color':
        state.color = action.value;
        return state;
      case 'SET_BLOGLIST':
        state.blogList = action.value;
        return state;
      case 'SET_CHECKLIST_BLOG':
          state.checkListBlog = action.value;
          return state;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }