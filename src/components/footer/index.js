import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Footer({totalPrice}) {
  if (totalPrice <= 0) {
    return <> </>;
  }

  return (
    <div className='Footer'>
      <p>Итого</p>
      <p>{totalPrice.toLocaleString("ru")} ₽</p>
    </div>
  );
}

Footer.propTypes = {
  title: PropTypes.number,
};

export default Footer;
