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
        <div className={cn("user-info")}>
          <Link to="/profile">
            <p>{userName}</p>
          </Link>
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
  onExitAccount: PropTypes.func,
};

LoginButtons.defaultProps = {
  userName: "",
  onExitAccount: () => {},
};

export default memo(LoginButtons);
