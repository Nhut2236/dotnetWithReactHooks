import React, {createContext, useReducer} from 'react';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

// mutations
const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'SET_COLOR':
        state.color = action.value;
        return state;
      case 'SET_BLOGLIST':{
        state.blog.data = action.value.data;
        state.blog.total = action.value.total;
        return state;
      }
      case 'SET_CHECKLIST_BLOG':
          state.checkListBlog = action.value;
        return state;
      case 'SET_PAGE_SIZE':
        state.blog.searchRequest.pageSize = action.value ? action.value : 5;
        return state;
      case 'SET_PAGE_INDEX':
        state.blog.searchRequest.pageIndex = action.value ? action.value : 1;
        return state;    
      default:
        throw new Error();
    };
  }, initialState);
// end mutations

  // declare state variable
  state.blog = {
    data: null,
    total: 0,
    searchRequest: {
      pageSize: 5,
      pageIndex: 1,
      title: "",
      publish: true,
    },
  };
  // end declare state variable

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }