import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function UserPage({userInfo}) {
  const cn = bem('UserPage');
  return (
    <div className={cn()}>
      <h3>Профиль</h3>
      <div>Имя: {userInfo.name}</div>
      <div>Телефон: {userInfo.phone}</div>
      <div>email: {userInfo.email}</div>
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

UserPage.defaultProps = {}

export default memo(UserPage);
