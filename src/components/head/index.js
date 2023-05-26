import {memo, useCallback} from "react";
import PropTypes from "prop-types";
import useStore from "../../store/use-store";
import {translateWord} from "../../utils";
import useSelector from "../../store/use-selector";
import './style.css';

function Head({title}){
  
  const store = useStore();
  const selectedLanguage = useSelector(state => state.language.language);

  const callbacks = {
    changeLanguageTo: useCallback((lang) => store.actions.language.setLanguage(lang))
  }

  return (
    <div className='Head'>
      <h1>{translateWord(title, selectedLanguage)}</h1>
      <div className='Head-languages'>
        <p onClick={() => callbacks.changeLanguageTo("ru-RU")}>RU</p>
        <p onClick={() => callbacks.changeLanguageTo("en-US")}>EN</p>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
