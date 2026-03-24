import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";

import cardapio from "../../data/cardapio";
import { useCart } from "../../context/CartContext";

export default function Inicio() {
  const [busca, setBusca] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);

  const { carrinho, adicionarAoCarrinho, removerDoCarrinho, totalCarrinho } =
    useCart();

  const listaExibida =
    busca.length > 0
      ? cardapio.filter((item) =>
          item.nome.toLowerCase().includes(busca.toLowerCase()),
        )
      : cardapio.filter((item) => item.pratoSugerido === true);

  const finalizarPedido = () => {
    if (carrinho.length === 0) return;

    const numeroWhatsApp = "5551985642953";

    const itensFormatados = carrinho
      .map(
        (item) =>
          `• ${item.nome} (${item.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })})`,
      )
      .join("\n");

    const mensagem = `*Novo Pedido:*\n\n${itensFormatados}\n\n*Total: ${totalCarrinho.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      },
    )}*`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      mensagem,
    )}`;

    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/imagens/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.tituloPrincipal}>CARDÁPIO JAPONÊS</Text>
        </View>

        <View style={styles.buscaContainer}>
          <TextInput
            style={styles.input}
            placeholder="O que você procura?"
            placeholderTextColor="#888"
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        <Text style={styles.subtitulo}>
          {busca.length > 0 ? "Resultados" : "Sugestões"}
        </Text>

        {listaExibida.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => adicionarAoCarrinho(item)}
          >
            <Image source={item.imagem} style={styles.fotoProduto} />
            <View style={styles.infoProduto}>
              <Text style={styles.nomeProduto}>{item.nome}</Text>
              <Text style={styles.descricaoProduto}>{item.descricao}</Text>
              <Text style={styles.precoProduto}>
                {item.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {listaExibida.length === 0 && (
          <Text style={{ color: "#FFF", textAlign: "center", marginTop: 20 }}>
            Nenhum item encontrado.
          </Text>
        )}
      </ScrollView>

      {carrinho.length > 0 && (
        <TouchableOpacity
          style={styles.barraCarrinho}
          onPress={() => setModalVisivel(true)}
        >
          <View style={styles.carrinhoInfo}>
            <Text style={styles.carrinhoQtd}>{carrinho.length} itens</Text>
            <Text style={styles.carrinhoTexto}>Ver Carrinho</Text>
          </View>
          <Text style={styles.carrinhoTotal}>
            {totalCarrinho.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalConteudo}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Seu Pedido</Text>
              <TouchableOpacity onPress={() => setModalVisivel(false)}>
                <Text style={styles.fecharModal}>X</Text>
              </TouchableOpacity>
            </View>

            <ScrollView>
              {carrinho.map((item, index) => (
                <View key={index} style={styles.itemCarrinho}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemNome}>{item.nome}</Text>
                    <Text style={styles.itemPrecoCarrinho}>
                      {item.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removerDoCarrinho(index)}
                    style={styles.botaoRemover}
                  >
                    <Text style={styles.textoRemover}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <View style={styles.modalFooter}>
              <Text style={styles.totalTexto}>
                Total:{" "}
                {totalCarrinho.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
              <TouchableOpacity
                style={styles.botaoFinalizar}
                onPress={finalizarPedido}
              >
                <Text style={styles.textoBotaoFinalizar}>Finalizar Pedido</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f11635", paddingHorizontal: 20 },
  header: { alignItems: "center", marginBottom: 10, marginTop: 40 },
  logo: { width: 80, height: 80, marginBottom: 10, resizeMode: "contain" },
  tituloPrincipal: { color: "#FFF", fontWeight: "bold", fontSize: 20 },
  buscaContainer: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginVertical: 15,
    height: 45,
    justifyContent: "center",
  },
  input: { color: "#000" },
  subtitulo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#cacaca",
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  fotoProduto: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderColor: "#fff",
    borderWidth: 2,
  },
  infoProduto: {
    flex: 1,
    marginLeft: 15,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  nomeProduto: { fontWeight: "bold", fontSize: 16, color: "#000" },
  descricaoProduto: { color: "#555", fontSize: 11, marginTop: 4 },
  precoProduto: { color: "#e74c3c", fontWeight: "bold", marginTop: 5 },

  // Estilos compartilhados para Carrinho e Modal
  barraCarrinho: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#2d3436",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 15,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  carrinhoInfo: { flexDirection: "column" },
  carrinhoQtd: { color: "#fff", fontSize: 12 },
  carrinhoTexto: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  carrinhoTotal: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  modalConteudo: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    height: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitulo: { fontSize: 22, fontWeight: "bold", color: "#333" },
  fecharModal: {
    fontSize: 24,
    color: "#e74c3c",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  itemCarrinho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Garante que o botão e o texto fiquem na mesma linha
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemNome: { fontSize: 16, color: "#333", fontWeight: "500" },
  itemPreco: { fontSize: 14, color: "#666" },
  botaoRemover: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e74c3c",
    borderRadius: 8,
  },
  textoRemover: { color: "#e74c3c", fontSize: 10, fontWeight: "bold" },
  modalFooter: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalTexto: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 15,
    color: "#000",
  },
  botaoFinalizar: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  textoBotaoFinalizar: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
