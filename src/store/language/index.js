import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      language: "ru"
    }
  }

  setLanguage(lang){
    this.setState({language: lang}, `Смена языка на ${lang}`);
  }

}

export default Language;
