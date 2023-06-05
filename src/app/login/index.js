import {memo, useCallback, useEffect, useState} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../layouts/page-layout";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LoginForm from "../../components/login-form";
import Header from "../../containers/header";
import {Navigate} from "react-router-dom";
import useTranslate from "../../hooks/use-translate";

function Login() {
  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    userName: state.session.userInfo.name,
    message: state.user.error,
    waiting: state.user.waiting,
    loggedIn: state.user.loggedIn,
  }));

  const [errorMessage, setErrorMessage] = useState("");

  const callbacks = {
    // Отправка логин-формы на сервер
    onSendForm: useCallback(
      userData => {
        store.actions.user.login(userData);
        setErrorMessage(select.message);
      },
      [store]
    ),
  };

  if (select.loggedIn || select.userName) {
    return <Navigate to="/profile" />;
  }

  return (
    <PageLayout>
      <Header title={t("title")} />
      <Navigation />
      <Spinner active={select.waiting}>
        <LoginForm onSendForm={callbacks.onSendForm} errorMessage={errorMessage} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
