import StoreModule from "../module";

/**
 * Покупательская корзина
 */
class UserInfo extends StoreModule {

  initState() {
    return {
      name: "",
      phone: "",
      email: ""
    }
  }

  /**
   * Авторизация
   * @param [userData] {Object} логин и пароль
   */
  async login(userData) {

    const token = window.localStorage.getItem("token");

    if (token) {
      const response = await fetch(`/users/self`);
      const json = await response.json();
      const item = json.result;
      console.log(item);
      
      this.setState({
        ...this.getState(),
        name: item.name,
        phone: item.phone,
        email: item.email
      }, 'Получение информации о пользователе');
    }
  }

  /**
   * Получение информации о пользователе
   */
  async addUserInfo() {

    const token = window.localStorage.getItem("token");

    if (token) {
     try {
      const response = await fetch(`/users/self`);
      const json = await response.json();
      const item = json.result;
      console.log(item);
      
      this.setState({
        ...this.getState(),
        name: item.name,
        phone: item.phone,
        email: item.email
      }, 'Получение информации о пользователе');
     } catch (error) {
      console.log(error);
     }
    }
  }

  /**
   * Удаление информации о пользователе
   */
  removeUserInfo() {
    this.setState({
      name: "",
      phone: "",
      email: ""
    }, 'Удаление информации о пользователе');
  }
}

export default UserInfo;
