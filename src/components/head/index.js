import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head(props){
  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      {props.button && <button onClick={props.onOpenCart}>{props.button}</button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  button: PropTypes.string,
  onOpenCart: PropTypes.func,
};

Head.defaultProps = {
  onOpenCart: () => {},
};

export default React.memo(Head);
