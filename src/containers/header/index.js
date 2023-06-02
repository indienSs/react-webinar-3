import {memo, useCallback, useEffect, useMemo} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import LoginButtons from "../../components/login-buttons";
import HeaderLayout from "../../layouts/header-layout";
import Head from "../../components/head";

function Header({title}) {

  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    userName: state.userInfo.userInfo.name
  }));

  useEffect(() => {
    store.actions.userInfo.getUserInfo();
  }, [select.userName])

  const callbacks = {
    onExitAccount: useCallback(() => {store.actions.userInfo.removeUserInfo()}, [select.userName])
  }

  return (
    <HeaderLayout>
      <LoginButtons userName={select.userName} onExitAccount={callbacks.onExitAccount} t={t}/>
      <Head title={title}/>
    </HeaderLayout>
  );
}



export default memo(Header);
