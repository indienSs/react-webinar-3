import StoreModule from "../module";

class Product extends StoreModule {
  initState() {
    return {
      product: {},
    };
  }

  /**
   * Загрузка товара из АПИ по id
   * @param _id Код товара
   */
  async load(_id) {
    try {
      const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          product: json.result,
        },
        "Загружен товар по id"
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default Product;
