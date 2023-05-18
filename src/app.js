import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart"

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;

  const [isCartOpened, setIsCartOpened] = useState(false);

  const totalPrice = cart.reduce((acc, item) => (item.price * item.count + acc), 0)
  
  const callbacks = {

    onOpenCart: () => {
      setIsCartOpened(prev => !prev)
    },

    onDeleteCartItem: useCallback((code) => {
      store.deleteCartItem(code);
    }, [store]),

    onAddCartItem: useCallback((item) => {
      store.addCartItem(item);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onOpenCart={callbacks.onOpenCart}
            cartItemsAmount={cart.length} 
            cartItemsPrice={totalPrice}/>
      <List list={list}
            onAddCartItem={callbacks.onAddCartItem}/>
      <Cart isOpened={isCartOpened}
            onDeleteCartItem={callbacks.onDeleteCartItem}
            cartItemsPrice={totalPrice}
            cartList={cart}
            onOpenCart={callbacks.onOpenCart}/>
    </PageLayout>
  );
}

export default App;
