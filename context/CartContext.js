import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => setCarrinho([...carrinho, produto]);
  
  const removerDoCarrinho = (indexParaRemover) => {
    setCarrinho(carrinho.filter((_, index) => index !== indexParaRemover));
  };

  const totalCarrinho = carrinho.reduce((sum, item) => sum + item.preco, 0);

  return (
    <CartContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, totalCarrinho, setCarrinho }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
