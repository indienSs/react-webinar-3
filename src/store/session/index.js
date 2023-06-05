import StoreModule from "../module";

/**
 * Покупательская корзина
 */
class SessionStore extends StoreModule {
  initState() {
    return {
      userInfo: {
        name: "",
        phone: "",
        email: "",
      },
      loggedIn: false,
      waiting: true,
    };
  }

  /**
   * Получение информации о пользователе
   */
  async getUserInfo() {
    const token = window.localStorage.getItem("token");

    if (token) {
      try {
        const response = await fetch("/api/v1/users/self", {
          headers: {
            "X-Token": token,
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        const item = json.result;

        this.setState(
          {
            ...this.getState(),
            userInfo: {name: item.profile.name, phone: item.profile.phone, email: item.email},
            loggedIn: true,
            waiting: false
          },
          "Получение информации о сессии"
        );
      } catch (error) {
        console.log(error);
        this.setState(
          {
            ...this.getState(),
            waiting: false
          },
          "Ошибка получения информации о сессии"
        );
      }
    }
  }

  /**
   * Завершение сессии
   */
  async removeUserInfo() {
    this.setState(
      {
        userInfo: {
          name: "",
          phone: "",
          email: "",
        },
        error: "",
        waiting: false,
        loggedIn: false,
      },
      "Завершение сессии"
    );
    window.localStorage.clear();
    // try {
    //   const response = await fetch("/api/v1/users/self", {
    //     method: "DELETE",
    //     headers: {
    //       "X-Token": window.localStorage.getItem("token"),
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const json = await response.json();
    //   console.log(json);
    // } catch (error) {
    //   console.log(error);
    // }
  }
}

export default SessionStore;
