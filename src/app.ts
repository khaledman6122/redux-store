import * as fromStore from "./store";

import { renderTodos } from "./utils";

const input = document.querySelector("input") as HTMLInputElement;
const button = document.querySelector("button") as HTMLButtonElement;
const destroy = document.querySelector(".unsubscribe") as HTMLButtonElement;
const todoList = document.querySelector(".todos") as HTMLLIElement;

const state = {
  todos: {
    loaded: false,
    loading: false,
    data: [],
  },
};
const reducers = {
  todos: fromStore.reducer, //reference for the function reducer()
};
const store = new fromStore.Store(reducers);
console.log(store.value);
button.addEventListener(
  "click",
  () => {
    if (!input.value.trim()) return;

    const payload = { label: input.value, complete: false };

    store.dispatch({
      type: "ADD_TODO",
      payload: payload,
    });
    console.log(store.value);
    input.value = "";
  },
  false
);

//to stop memory leak =>app.ts subscribe(){ annonymous function}
const unsubscribe = store.subscribe((state) => {
  renderTodos(state.todos.data);
});

destroy.addEventListener("click", unsubscribe, false);
//we can log state but dom will not change

todoList.addEventListener("click", function (event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === "button") {
    console.log(target);
  }
});

store.subscribe((state) => console.log("STATE", state));
//احا
// store.subscribe((state) => {
//   console.log("STATE", state);
// });
