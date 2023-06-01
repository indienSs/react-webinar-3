import {memo} from "react";
import PropTypes from "prop-types";
import LoginButtons from "../login-buttons";
import './style.css';

function Head({title, children, userName, onExitAccount}){
  return (
    <>
      <LoginButtons userName={userName} onExitAccount={onExitAccount}/>
      <div className='Head'>
        <div className='Head-place'>
          <h1 >{title}</h1>
        </div>
        <div className='Head-place'>{children}</div>
      </div>
    </>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(Head);
