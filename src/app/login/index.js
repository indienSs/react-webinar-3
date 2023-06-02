import {memo, useCallback, useEffect} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../layouts/page-layout";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LoginForm from "../../components/login-form";
import Header from "../../containers/header";
import {useNavigate} from "react-router-dom";
import useTranslate from "../../hooks/use-translate";

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    userName: state.userInfo.userInfo.name,
    message: state.userInfo.error,
  }));

  useEffect(() => {
    store.actions.userInfo.getUserInfo();
    if (select.userName) {
      navigate("/profile")
    }
  }, [select.userName]);

  const callbacks = {
    // Отправка логин-формы на сервер
    onSendForm: useCallback(userData => store.actions.userInfo.login(userData), [store]),
  };

  return (
    <PageLayout>
      <Header title={t('title')}/>
      <Navigation />
      {/* <Spinner active={select.waiting}> */}
      <LoginForm onSendForm={callbacks.onSendForm} errorMessage={select.message} t={t}/>
      {/* </Spinner> */}
    </PageLayout>
  );
}

export default memo(Login);
