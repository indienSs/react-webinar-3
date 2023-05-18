import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item({item, onAddCartItem}){

  const callbacks = {
    onAdd: () => {
      onAddCartItem(item);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title}
      </div>
      <div className='Item-actions'>
        <p>{`${item.price} ₽`}</p>
        <button onClick={callbacks.onAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAddCartItem: PropTypes.func,
};

Item.defaultProps = {
  onAddCartItem: () => {},
}

export default React.memo(Item);
