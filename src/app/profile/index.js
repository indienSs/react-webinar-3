import {memo, useCallback, useEffect, useMemo} from 'react';
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
import UserPage from '../../components/user-page';

function Profile() {
  const store = useStore();

  // useInit(() => {
  //   store.actions.article.load(params.id);
  // }, [params.id]);

  useEffect(()=> {
    store.actions.userInfo.getUserInfo();
  }, [])

  const select = useSelector(state => ({
    userInfo: state.userInfo.userInfo
  }));

  return (
    <PageLayout>
      <Head title="Магазин">
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <UserPage userInfo={select.userInfo}/>
      {/* <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner> */}
    </PageLayout>
  );
}

export default memo(Profile);
