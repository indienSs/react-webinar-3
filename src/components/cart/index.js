import React from "react";
import PropTypes from "prop-types";
import CartItem from "../cart-item";
import "./style.css";

function Cart(props) {
  const closeCart = event => {
    if (event.target.classList.value === "Cart") {
      props.onOpenCart();
    }
  };

  return (
    <div className={props.isOpened ? "Cart" : "Cart-hidden"} onClick={closeCart}>
      <div className='Cart-window'>
        <div className='Cart-window__title'>
          <h1>Корзина</h1>
          <button onClick={() => props.onOpenCart()}>Закрыть</button>
        </div>
        {props.cartList.length > 0 ? (
          <div className='Cart-window__items'>
            {props.cartList.map(item => (
              <CartItem key={item.code} cartItem={item} onDeleteCartItem={props.onDeleteCartItem} />
            ))}
            <div className='Cart-window_total-price'>
              <p>Итого</p>
              <p>{props.cartItemsPrice} ₽</p>
            </div>
          </div>
        ) : (
          <div className='Cart-window__items-empty'>Корзина пустая</div>
        )}
      </div>
    </div>
  );
}

Cart.propTypes = {
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  isOpened: PropTypes.bool,
  cartItemsPrice: PropTypes.number,
  onDeleteCartItem: PropTypes.func,
  onOpenCart: PropTypes.func,
};

Cart.defaultProps = {
  onDeleteCartItem: () => {},
  onOpenCart: () => {},
};

export default React.memo(Cart);
