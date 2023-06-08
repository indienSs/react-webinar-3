export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс комментариев и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments/`
        });
        // Комментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result.items}});
        console.log(res.data.result.items);

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },
}
