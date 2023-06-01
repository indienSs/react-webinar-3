import StoreModule from "../module";

/**
 * Покупательская корзина
 */
class UserInfo extends StoreModule {
  initState() {
    return {
      userInfo: {
        name: "",
        phone: "",
        email: "",
      },
      error: "",
      waiting: false,
    };
  }

  /**
   * Авторизация
   * @param [userData] {Object} логин и пароль
   */
  async login(userData) {
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const json = await response.json();
      const item = json;

      console.log(item);

      if (item.error) {
        const errorsArray = item.error.data.issues.map(issue => issue.message);
        const errorMessage = errorsArray.join(", ");
        this.setState(
          {
            ...this.getState(),
            error: errorMessage
          },
          "Получена ошибка авторизации"
        );
      } else {
        this.setState(
          {
            ...this.getState(),
            userInfo: {
              name: item.result.user.username,
              phone: item.result.user.profile.phone,
              email: item.result.user.email,
            },
            error: ""
          },
          "Авторизация пользователя"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Получение информации о пользователе
   */
  async getUserInfo() {
    const token = window.localStorage.getItem("token");

    if (token) {
      try {
        const response = await fetch(`/users/self`, {
          headers: {
            "X-Token": token,
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        const item = json.result;
        console.log(item);

        this.setState(
          {
            ...this.getState(),
            name: item.name,
            phone: item.phone,
            email: item.email,
          },
          "Получение информации о пользователе"
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  /**
   * Удаление информации о пользователе
   */
  removeUserInfo() {
    this.setState(
      {
        userInfo: {
          name: "",
          phone: "",
          email: "",
        },
        error: "",
        waiting: false,
      },
      "Удаление информации о пользователе"
    );
  }
}

export default UserInfo;
