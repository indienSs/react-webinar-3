import StoreModule from "../module";

class Pagination extends StoreModule {

  initState() {
    return {
      currentPage: 0,
      totalPages: 1,
      itemsPerPage: 10,
    }
  }

  /**
   * Смена текущей страницы каталога
   * @param page страница каталога
   */
  setPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    }, 'Смена страницы каталога');
  }
  
  /**
   * Установка количества доступных страниц
   * @param itemsCount общее количество товара в каталоге
   */
  setTotalPages(itemsCount) {
    this.setState({
      ...this.getState(),
      totalPages: Math.ceil(itemsCount / this.getState().itemsPerPage),
    }, 'Установка количества доступных страниц');
  }
}

export default Pagination;
