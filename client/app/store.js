import { computed, action, observable } from "mobx"
import { create, persist } from "mobx-persist";

export class Store {
  @persist('object') @observable account = null;

  @action setAccount = (account) => {
    this.account = account;
  }
}

const hydrate = create();
const store = new Store;

export default store;

hydrate("store", store);