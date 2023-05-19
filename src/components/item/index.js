import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item({item, onAddCartItem, onDeleteCartItem}) {
  const callbacks = {
    onAdd: () => {
      onAddCartItem(item);
    },

    onDelete: () => {
      onDeleteCartItem(item);
    },
  };

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>{item.title}</div>
      {onAddCartItem && <div className='Item-actions'>
        <p>{`${item.price.toLocaleString("ru")} ₽`}</p>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>}
      {onDeleteCartItem && <div className='Item-actions'>
        <p>{`${item.price.toLocaleString("ru")} ₽`}</p>
        <p>{`${item.count} шт`}</p>
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>}
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onAddCartItem: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
  onAddCartItem: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
};

Item.defaultProps = {
  onAddCartItem: null,
  onDeleteCartItem: null,
};

export default React.memo(Item);
