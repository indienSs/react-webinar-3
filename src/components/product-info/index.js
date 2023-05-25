import {memo} from "react";
import PropTypes from "prop-types";
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function ProductInfo({productInfo, onAddItem}) {
  
  const cn = bem("ProductInfo");

  const callbacks = {
    onAdd: e => onAddItem(productInfo._id),
  };

  return (
    <div className={cn()}>
      <p>{productInfo.description}</p>
      <div className={cn("details")}>
        Страна производитель: <p>{productInfo.madeIn?.title} ({productInfo.madeIn?.code})</p>
      </div>
      <div className={cn("details")}>Категория: <p>{productInfo.category?.title}</p></div>
      <div className={cn("details")}>Год выпуска: <p>{productInfo.edition}</p></div>
      <h3>Цена: {numberFormat(productInfo.price)} ₽</h3>
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
};

ProductInfo.defaultProps = {
  onAddItem: () => {},
};

export default memo(ProductInfo);
