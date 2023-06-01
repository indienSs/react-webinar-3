import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {numberFormat} from "../../utils";
import "./style.css";

function LoginForm({onSendForm}) {
  const cn = bem("LoginForm");

  const [loginFormData, setLoginFormData] = useState({
    login: "",
    password: "",
  });

  const onChangeForm = e => {
    e.preventDefault();
    const {name, value} = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const sendForm = (e) => {
    e.preventDefault();
    onSendForm(loginFormData)
  }

  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <form className={cn("form")}>
        <label htmlFor="login">Логин</label>
        <input type="text" value={loginFormData.login} onChange={onChangeForm} name="login" id="login"/>
        <label htmlFor="password">Пароль</label>
        <input type="password" value={loginFormData.password} onChange={onChangeForm} name="password" id="password"/>
        <button onClick={sendForm}>Войти</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onSendForm: PropTypes.func,
};

LoginForm.defaultProps = {
  onSendForm: () => {},
};

export default memo(LoginForm);
