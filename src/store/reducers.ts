export const initialState = {
  loaded: false,
  loading: false,
  data: [{ label: "initial pizza", complete: false }],
};
export function reducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "ADD_TODO": {
      const todo = action.payload; //coming as argument
      const data = [...state.data, todo]; //merge state.data with comming data(todo)
      return {
        //merge whole state with very new data
        ...state,
        data: data,
      };
    }
  }
  return state;
}
