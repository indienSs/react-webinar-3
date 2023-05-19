import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function CartItem({cartItem, onDeleteCartItem}) {
  const callbacks = {
    onDelete: () => {
      onDeleteCartItem(cartItem);
    },
  };

  return (
    <div className='CartItem'>
      <div className='CartItem-name'>
        <div className='CartItem-name__code'>{cartItem.code}</div>
        <div className='CartItem-name__title'>{cartItem.title}</div>
      </div>
      <div className='CartItem-details'>
        <div className='CartItem-details__price'>
          <p>{`${cartItem.price.toLocaleString("ru")} ₽`}</p>
          <p>{`${cartItem.count} шт`}</p>
        </div>
        <div className='CartItem-details__actions'>
          <button onClick={callbacks.onDelete}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onDeleteCartItem: PropTypes.func,
};

CartItem.defaultProps = {
  onDeleteCartItem: () => {},
};

export default React.memo(CartItem);
