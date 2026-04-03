import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => [...prev, produto]);
  };

  const removerDoCarrinho = (indexParaRemover) => {
    setCarrinho((prev) =>
      prev.filter((_, index) => index !== indexParaRemover)
    );
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  const totalCarrinho = carrinho.reduce(
    (sum, item) => sum + item.preco,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        totalCarrinho,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);