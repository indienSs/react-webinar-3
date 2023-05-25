import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      language: "ru"
    }
  }

  setLanguage(lang){
    this.setState({language: lang}, `Язык приложения - ${lang}`);
  }

}

export default Language;
