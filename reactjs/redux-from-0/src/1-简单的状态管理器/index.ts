import createStore, { Store } from "./store";

const initState = {
  count: 0,
  profile: {
    name: "yqb",
    age: 14
  }
};

const listener = (store: Store) => () => {
  console.log(store.getState());
};

const store = createStore(initState);

store.subscribe(listener(store));

store.changeState({
  ...store.getState(),
  count: 1
});

store.changeState({
  ...store.getState(),
  profile: {
    name: "Kiyonami",
    age: 18
  }
});

// !!! 但是我可以随便修改
store.changeState({
  ...store.getState(),
  count: "abcd"
});
