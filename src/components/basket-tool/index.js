import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {numberFormat, plural} from "../../utils";
import {Link} from "react-router-dom";
import useSelector from "../../store/use-selector";
import {translateWord} from "../../utils";
import "./style.css";

function BasketTool({sum, amount, onOpen}) {
  const cn = bem("BasketTool");

  const selectedLanguage = useSelector(state => state.language.language);
  const pluralWords =
    selectedLanguage === "ru-RU" ? {one: "товар", few: "товара", many: "товаров"} : {one: "item", other: "items"};

  return (
    <div className={cn()}>
      <Link to="/">{translateWord("Главная", selectedLanguage)}</Link>
      <div>
        <span className={cn("label")}>{translateWord("В корзине", selectedLanguage)}:</span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${plural(amount, pluralWords, selectedLanguage)} / ${numberFormat(sum)} ₽`
            : translateWord("пусто", selectedLanguage)}
        </span>
        <button onClick={onOpen}>{translateWord("Перейти", selectedLanguage)}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
