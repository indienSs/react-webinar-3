import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartLayout from './components/cart-layout';
import Cart from "./components/cart"

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = list.filter(item => item.count > 0);
  const totalPrice = store.getState().totalPrice;

  const [isCartOpened, setIsCartOpened] = useState(false);

  const callbacks = {

    onOpenCart: () => {
      setIsCartOpened(prev => !prev)
    },

    onDeleteCartItem: useCallback((item) => {
      store.deleteCartItem(item);
    }, [store]),

    onAddCartItem: useCallback((item) => {
      store.addCartItem(item);
    }, [store]),
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls onOpenCart={callbacks.onOpenCart}
              cartItemsAmount={cart.length} 
              cartItemsPrice={totalPrice}/>
        <List list={list}
              onAddCartItem={callbacks.onAddCartItem}/>
      </PageLayout>
      <CartLayout>
        <List list={cart}
              onDeleteCartItem={callbacks.onDeleteCartItem}/>
        <Cart isOpened={isCartOpened}
              onDeleteCartItem={callbacks.onDeleteCartItem}
              cartItemsPrice={totalPrice}
              cartList={cart}
              onOpenCart={callbacks.onOpenCart}/>
      </CartLayout>
    </>
    
  );
}

export default App;
