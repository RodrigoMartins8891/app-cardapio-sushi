import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";

// 1. Importe o seu array de dados do arquivo correto
import cardapio from "../cardapio";

export default function Inicio() {
  const [busca, setBusca] = useState("");

  // 2. Lógica do Filtro: filtra por nome ignorando maiúsculas/minúsculas
  // Se a busca estiver vazia, ele mostra apenas os pratos sugeridos (pratoSugerido: true)
  const listaExibida =
    busca.length > 0
      ? cardapio.filter((item) =>
          item.nome.toLowerCase().includes(busca.toLowerCase()),
        )
      : cardapio.filter((item) => item.pratoSugerido === true);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {/* Certifique-se de que a logo está nesta pasta ou ajuste o caminho */}
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
            onChangeText={setBusca} // Atualiza o estado da busca em tempo real
          />
        </View>

        {/* Título muda conforme a busca */}
        <Text style={styles.subtitulo}>
          {busca.length > 0 ? "Resultados" : "Sugestões"}
        </Text>

        {/* 3. Mapeia a lista filtrada */}
        {listaExibida.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.imagem} style={styles.fotoProduto} />
            <View style={styles.infoProduto}>
              <Text style={styles.nomeProduto}>{item.nome}</Text>
              <Text style={styles.descricaoProduto}>{item.descricao}</Text>
            </View>
          </View>
        ))}

        {/* Mensagem caso não encontre nada */}
        {listaExibida.length === 0 && (
          <Text style={{ color: "#FFF", textAlign: "center", marginTop: 20 }}>
            Nenhum item encontrado.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f11635", padding: 20 },
  header: { alignItems: "center", marginBottom: 20, marginTop: 40 },
  logo: { width: 100, height: 100, marginBottom: 10, resizeMode: "contain" },
  tituloPrincipal: { color: "#FFF", fontWeight: "bold", fontSize: 20 },
  buscaContainer: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginVertical: 20,
    height: 45,
    justifyContent: "center",
  },
  input: { color: "#000" },
  subtitulo: {
    color: "#fff",
    fontSize: 26,
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
  fotoProduto: { width: 100, height: 100, borderRadius: 15, borderColor: "#fff", borderWidth: 2, resizeMode: 'cover' },
  infoProduto: { flex: 1, marginLeft: 15,padding:15, borderRadius: 15,backgroundColor: "#fff" },
  nomeProduto: { fontWeight: "bold", fontSize: 16, color: "#000" },
  descricaoProduto: { color: "#000", fontSize: 12, marginTop: 4 },
});
