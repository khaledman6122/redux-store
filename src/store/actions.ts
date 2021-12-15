//action constent => to avoid misspeling and to be readable and tested
export const ADD_TODO = "[Todo] add todo";
export const REMOVE_TODO = "[Todo] remove todo";

//action creator
export class AddTodo {
  readonly type = ADD_TODO;
  constructor(private payload: any) {}
}

export class RemoveTodo {
  readonly type = REMOVE_TODO;
  constructor(private payload: any) {}
}

console.log(new AddTodo({}));
