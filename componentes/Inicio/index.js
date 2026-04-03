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
  Alert,
} from "react-native";

import cardapio from "../../data/cardapio";
import { useCart } from "../../context/CartContext";
import * as Location from "expo-location";

export default function Inicio() {
  const [cep, setCep] = useState("");
  const [busca, setBusca] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [complemento, setComplemento] = useState("");
  const [taxaEntrega, setTaxaEntrega] = useState(5); // pode mudar depois
  const [modalVisivel, setModalVisivel] = useState(false);
  const { limparCarrinho } = useCart();

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

    if (!rua || !numero || !bairro || !cidade) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios");
      return;
    }

    const enderecoCompleto = `
${rua}, ${numero}
${bairro} - ${cidade}
${complemento ? "Complemento: " + complemento : ""}
`;

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

    const totalFinal = totalCarrinho + taxaEntrega;

    const mensagem = `*Novo Pedido:*\n\n${itensFormatados}\n\n📍 Endereço:\n${enderecoCompleto}\n\n🚚 Taxa de entrega: R$ ${taxaEntrega.toFixed(
      2,
    )}\n\n*Total: ${totalFinal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}*`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      mensagem,
    )}`;

    Linking.openURL(url);

    limparCarrinho();
    setRua("");
    setNumero("");
    setBairro("");
    setCidade("");
    setComplemento("");
    setModalVisivel(false);

    Alert.alert("Pedido enviado!", "Seu pedido foi enviado com sucesso.");
  };
  const pagarComPayPal = () => {
    if (carrinho.length === 0) return;

    if (!rua || !numero || !bairro || !cidade) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios");
      return;
    }

    const total = (totalCarrinho + taxaEntrega).toFixed(2);
    const emailPayPal = "rmartinsdeoliveira2@gmail.com";
    const descricao = carrinho.map((item) => item.nome).join(", ");

    const url = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${emailPayPal}&amount=${total}&currency_code=BRL&item_name=${encodeURIComponent(
      descricao,
    )}`;

    Linking.openURL(url);

    setTimeout(() => {
      finalizarPedido();
    }, 1500);
  };
  const pegarLocalizacao = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permissão negada");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const { latitude, longitude } = location.coords;

    // 🔥 CALCULAR FRETE
    calcularDistancia(latitude, longitude);

    try {
      // 🔥 CONVERTE LAT/LONG → ENDEREÇO
      const endereco = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (endereco.length > 0) {
        const dados = endereco[0];
        
        setCep(dados.postalCode || "");
        setRua(dados.street || "");
        setNumero(dados.streetNumber || "");
        setBairro(dados.district || dados.subregion || "");
        setCidade(dados.city || dados.region || "");
      }
    } catch (error) {
      Alert.alert("Erro ao obter endereço");
    }
  };
  const RESTAURANTE = {
    latitude: -29.9483,
    longitude: -51.07927,
  };
  const calcularDistancia = (lat, lon) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371;
    const dLat = toRad(RESTAURANTE.latitude - lat);
    const dLon = toRad(RESTAURANTE.longitude - lon);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat)) *
        Math.cos(toRad(RESTAURANTE.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distancia = R * c;

    calcularFrete(distancia);
  };
  const calcularFrete = (distancia) => {
    if (distancia < 3) setTaxaEntrega(5);
    else if (distancia < 6) setTaxaEntrega(8);
    else setTaxaEntrega(12);
  };
  const buscarCEP = async (cepDigitado) => {
    setCep(cepDigitado);

    if (cepDigitado.length < 8) return;

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepDigitado}/json/`,
      );
      const data = await response.json();

      if (data.erro) {
        Alert.alert("CEP não encontrado");
        return;
      }

      setRua(data.logradouro);
      setBairro(data.bairro);
      setCidade(data.localidade);
    } catch (error) {
      Alert.alert("Erro ao buscar CEP");
    }
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
          <Text style={styles.tituloPrincipal}>Kikuti Sushi Delivery</Text>
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

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* ITENS */}
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

              {/* ENDEREÇO */}
              <Text
                style={{ fontWeight: "bold", marginTop: 20, marginBottom: 10 }}
              >
                Endereço de entrega:
              </Text>
              <TextInput
                style={styles.inputEndereco}
                placeholder="Digite seu CEP"
                keyboardType="numeric"
                value={cep}
                onChangeText={buscarCEP}
              />
              <TextInput
                style={styles.inputEndereco}
                placeholder="Rua"
                value={rua}
                onChangeText={setRua}
              />
              <TextInput
                style={styles.inputEndereco}
                placeholder="Número"
                value={numero}
                onChangeText={setNumero}
              />
              <TextInput
                style={styles.inputEndereco}
                placeholder="Bairro"
                value={bairro}
                onChangeText={setBairro}
              />
              <TextInput
                style={styles.inputEndereco}
                placeholder="Cidade"
                value={cidade}
                onChangeText={setCidade}
              />
              <TextInput
                style={styles.inputEndereco}
                placeholder="Complemento"
                value={complemento}
                onChangeText={setComplemento}
              />

              {/* ENTREGA */}
              <Text style={{ fontSize: 16, marginTop: 10 }}>
                Taxa: R$ {taxaEntrega.toFixed(2)}
              </Text>
              <TouchableOpacity
                style={{ marginBottom: 10 }}
                onPress={pegarLocalizacao}
              >
                <Text style={{ color: "blue" }}>📍 Usar minha localização</Text>
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.modalFooter}>
              <Text style={styles.totalTexto}>
                Total:{" "}
                {(totalCarrinho + taxaEntrega).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
              <TouchableOpacity
                style={styles.botaoFinalizar}
                onPress={finalizarPedido}
              >
                <Text style={styles.textoBotaoFinalizar}>
                  Pedir via WhatsApp
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botaoFinalizar, { backgroundColor: "#0070ba" }]}
                onPress={pagarComPayPal}
              >
                <Text style={styles.textoBotaoFinalizar}>Pagar com PayPal</Text>
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
    height: "90%",
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
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalTexto: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 15,
    color: "#000",
  },
  botaoFinalizar: {
    backgroundColor: "#27ae60",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  textoBotaoFinalizar: { color: "#fff", fontSize: 14, fontWeight: "bold" },

  inputEndereco: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});
