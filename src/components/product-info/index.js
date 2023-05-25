import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProductInfo({productInfo, onAddItem}) {

  const cn = bem('ProductInfo');

  const callbacks = {
    onAdd: (e) => onAddItem(productInfo._id)
  }

  return (
    <div className={cn()}>
      <p>{productInfo.description}</p>
      <p>Страна производитель: {productInfo.madeIn?.title} ({productInfo.madeIn?.code})</p>
      <p>Категория: {productInfo.category?.title}</p>
      <p>Год выпуска: {productInfo.edition}</p>
      <p>Цена: {productInfo.price}</p>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

ProductInfo.propTypes = {
  productInfo: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    edition: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
  onAddItem: PropTypes.func,
}

ProductInfo.defaultProps = {
  onAddItem: () => {},
}

export default memo(ProductInfo);
