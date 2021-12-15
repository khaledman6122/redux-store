import * as fromActions from "./actions";

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
    case fromActions.ADD_TODO: {
      const todo = action.payload; //coming as argument
      const data = [...state.data, todo]; //merge state.data with comming data(todo)
      return {
        //merge whole state with very new data
        ...state,
        data: data,
      };
    }
    case fromActions.REMOVE_TODO: {
      const data = state.data.filter(
        (todo) => todo.label !== action.payload.label
      );
      console.log(action.payload, "ASDAASDASDASDASD");
    }
  }
  return state;
}
