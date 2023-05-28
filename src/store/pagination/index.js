import StoreModule from "../module";

class Pagination extends StoreModule {
  initState() {
    return {
      currentPage: 0,
      totalPages: 1,
      itemsPerPage: 10,
    };
  }

  /**
   * Смена текущей страницы каталога
   * @param page страница каталога
   */
  setPage(page) {
    this.setState(
      {
        ...this.getState(),
        currentPage: page,
      },
      "Смена страницы каталога"
    );
  }

  /**
   * Установка количества доступных страниц
   */
  async setTotalPages(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          totalPages: Math.floor(json.result.count / this.getState().itemsPerPage),
        },
        `Установка количества доступных страниц для пагинации`
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default Pagination;
