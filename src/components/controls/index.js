import React from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import "./style.css";

function Controls({onOpenCart, cartItemsAmount, cartItemsPrice}) {
  return (
    <div className='Controls'>
      <div className='Controls-cart-amount'>
        <p>В корзине:</p>
        <p>
          {cartItemsAmount > 0
            ? `${cartItemsAmount} ${plural(cartItemsAmount, {one: "товар", few: "товара", many: "товаров"})} / ${cartItemsPrice} ₽`
            : "пусто"}
        </p>
      </div>
      <button onClick={() => onOpenCart()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onOpenCart: PropTypes.func,
  cartItemsAmount: PropTypes.number,
  cartItemsPrice: PropTypes.number,
};

Controls.defaultProps = {
  onOpen: () => {},
};

export default React.memo(Controls);
