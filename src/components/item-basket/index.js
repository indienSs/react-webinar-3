import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import useStore from '../../store/use-store';
import {translateWord} from '../../utils';
import useSelector from '../../store/use-selector';
import './style.css';

function ItemBasket(props) {

  const store = useStore();
  const selectedLanguage = useSelector(state => state.language.language);

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),

    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={callbacks.closeModal}>
        <Link to={`/${props.item._id}`}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {selectedLanguage === "ru-RU" ? "шт" : ""}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{translateWord("Удалить", selectedLanguage)}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
