export class Store {
  private subscribers: Function[];
  private reducers: {
    [key: string]: Function;
    //index-signatures => key is a string and value is a function
  };
  private state: {
    [key: string]: any;
    //index-signatures => key is a string and value is a any
  };
  constructor(reducers = {}, initialState = {}) {
    this.subscribers = [];
    this.state = this.reduce(initialState, {}); //call reduce function rather than  equal to initialState directly
    this.reducers = reducers;
  }
  get value() {
    return this.state;
  }
  subscribe(fn) {
    this.subscribers = [...this.subscribers, fn];
    this.notify(); //to notify subscribers
  }
  private notify() {
    this.subscribers.forEach((fn) => fn(this.value));
  }

  /*
  reducers was  reducers = {
  todos: fromStore.reducer, //reference for the function reducer()
};
  */

  dispatch(action) {
    // this.state=action wrong pattern we need immutable not mutable "REVISE IMMUTABLE OBJECT CREATION WAYS"
    //we need to create a new object
    this.state = this.reduce(this.state, action);
    this.notify(); //to notify subscribers

    //the following obj1 is to know how to merge object with itself+new data
    // let obj1 = { fruits: ["apple"] };
    // obj1 = {
    //   ...obj1,
    //   fruits: [...obj1.fruits, "orange", "blueberry"],
    // };
    //note that obj1 will always have fruits: ["apple"]  because it is the initial state and it will be passed when we try to create a new copy of obj1
  }

  reduce(state, action) {
    const newState = {};
    //loop over reducers
    for (let prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action);
      //we call it as it is a refernce and we need to return value from it
      //then pass to is each state related to this reducer  NOT the whole state because we dont need each reducer to access each state
    }
    return newState;
  }
}
