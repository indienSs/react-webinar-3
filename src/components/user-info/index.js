import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function UserInfo({userInfo}) {
  const cn = bem('UserInfo');
  return (
    <div className={cn()}>
      <h3>Профиль</h3>
      <div>Имя: {userInfo.name}</div>
      <div>Телефон: {userInfo.phone}</div>
      <div>email: {userInfo.email}</div>
    </div>
  );
}

UserInfo.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

UserInfo.defaultProps = {}

export default memo(ArticleCard);
