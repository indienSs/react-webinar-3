import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.cart = [];
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление элемента в корзину
   * @param item
   */
  addCartItem(item) {
    //Определяем, есть ли элемент в корзине
    const isItemAdded = this.state.cart.some(el => el.code === item.code);
    
    //Если элемент в корзине уже есть - меняем количество товара для выбранного элемента
    if (isItemAdded) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(cartItem => {
          if (cartItem.code === item.code) {
            return {
              ...cartItem,
              count: cartItem.count + 1,
            };
          }
          return cartItem;
        })
      })
    //Если переданного в аргументе товара нет в корзине - добавляем новый элемент в корзину с количеством 1
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {...item, count: 1}]
      })
    }
  };

  /**
   * Удаление элемента из корзины
   * @param code
   */
  deleteCartItem(code) {
    this.setState({
      ...this.state,
      // Новый список элементов корзины, в котором не будет удаляемого элемента
      cart: this.state.cart.filter(item => item.code !== code)
    })
  };
}

export default Store;
