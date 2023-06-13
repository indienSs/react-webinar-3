import translate from "./translate";

class I18nService {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = "ru";
    this.t = this.t.bind(this);
    this.setLang = this.setLang.bind(this);
  };

  /**
   * Функция для локализации текстов с замыканием на код языка
   * @param {string} text 
   * @param {number} number 
   */
  t(text, number) {
    return translate(this.lang, text, number);
  }

  /**
   * Установка языка перевода
   * @param lang {String} выбор локали
   */
  setLang(lang = "ru") {
      this.lang = lang;
  }
}

export default I18nService;
