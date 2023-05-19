import React from "react";
import PropTypes from "prop-types";
import './style.css';

function CartLayout({children}) {

  return (
    <div className='CartLayout'>
      <div>
        {children}
      </div>
    </div>
  );
}

CartLayout.propTypes = {
  children: PropTypes.node
}

export default React.memo(CartLayout);
