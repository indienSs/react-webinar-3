import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import "./style.css";

function LoginButtons({userName, onExitAccount}) {
  const cn = bem("LoginButtons");

  return (
    <div className={cn()}>
      {userName ? (
        <div>
          <p>{userName}</p>
          <button onClick={() => onExitAccount()}>Выход</button>
        </div>
      ) : (
        <Link to="/login">
          <button>Вход</button>
        </Link>
      )}
    </div>
  );
}

LoginButtons.propTypes = {
  userName: PropTypes.string,
};

LoginButtons.defaultProps = {
  userName: "",
};

export default memo(LoginButtons);
