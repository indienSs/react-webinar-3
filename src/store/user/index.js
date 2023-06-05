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
      loggedIn: false,
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

      if (item.error) {
        const errorsArray = item.error.data.issues.map(issue => issue.message);
        const errorMessage = errorsArray.join(", ");
        this.setState(
          {
            ...this.getState(),
            error: errorMessage,
          },
          "Получена ошибка авторизации"
        );
      } else {
        this.setState(
          {
            ...this.getState(),
            userInfo: {
              name: item.result.user.profile.name,
              phone: item.result.user.profile.phone,
              email: item.result.user.email,
            },
            error: "",
            loggedIn: true,
            waiting: false,
          },
          "Авторизация пользователя"
        );
        window.localStorage.setItem("token", item.result.token);
      }
    } catch (error) {
      console.log(error);
    }
  }

}

export default UserInfo;
