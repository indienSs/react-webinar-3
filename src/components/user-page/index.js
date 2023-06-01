import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function UserPage({userInfo}) {
  const cn = bem("UserPage");
  return (
    <div className={cn()}>
      <h3>Профиль</h3>
      <div className={cn("info")}>
        Имя: <p>{userInfo.name}</p>
      </div>
      <div className={cn("info")}>
        Телефон: <p>{userInfo.phone}</p>
      </div>
      <div className={cn("info")}>
        email: <p>{userInfo.email}</p>
      </div>
    </div>
  );
}

UserPage.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

UserPage.defaultProps = {};

export default memo(UserPage);
