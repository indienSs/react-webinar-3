import {memo, useCallback, useEffect, useState} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import ProductInfo from '../../components/product-info';
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useParams} from 'react-router';

function About() {

  const store = useStore();
  const {id} = useParams();

  useEffect(() => {
    store.actions.product.load(id);
  }, [id]);

  const productInfo = useSelector(state => ({product: state.product.product}))

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={productInfo.product.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <ProductInfo productInfo={productInfo.product} onAddItem={callbacks.addToBasket}/>
    </PageLayout>

  );
}

export default memo(About);
