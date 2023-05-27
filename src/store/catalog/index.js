import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: []
    }
  }

  async load(page) {
    try {
      const response = await fetch(`/api/v1/articles?limit=10&skip=${page * 10}`);
      const json = await response.json();
      this.setState({
        ...this.getState(),
        list: json.result.items
      }, 'Загружены товары из АПИ');
    } catch (error) {
      console.log(error);
    }
  }

  async loadSingleProduct(id) {
    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();
      this.setState({
        ...this.getState(),
        list: [json.result]
      }, 'Загружен товар из АПИ');
    } catch (error) {
      console.log(error);
    }
  }
}

export default Catalog;
