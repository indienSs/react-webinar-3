import {memo, useCallback, useMemo} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import LoginButtons from '../../components/login-buttons';
import LoginForm from '../../components/login-form';

function Login() {
  const store = useStore();

  const select = useSelector(state => ({
    userName: state.userInfo.name,
  }))

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Отправка логин-формы на сервер
    onSendForm: useCallback(userData => store.actions.userInfo.login(userData), [store]),
  }

  return (
    <PageLayout>
      <Head title="Магазин" userName={select.userName}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      {/* <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner> */}
      <LoginForm onSendForm={callbacks.onSendForm}/>
    </PageLayout>
  );
}

export default memo(Login);
