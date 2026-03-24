import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

// Importando o array
import cardapio from "../cardapio";

export default function Categoria({ route }) {
  // Captura o parâmetro da aba
  const { categoria } = route.params;

  // Filtro inteligente: transforma ambos para minúsculo para evitar erro de digitação
  const listaFiltrada = cardapio.filter(
    (item) => item.categoria.toLowerCase() === categoria.toLowerCase(),
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Título da Categoria (Ex: Sushi) */}
        <Text style={styles.tituloCategoria}>
          {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
        </Text>

        {/* Listagem dos itens */}
        {listaFiltrada.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.imagem} style={styles.foto} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FF001E", padding: 20 },
  tituloCategoria: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#cacaca",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
    elevation: 4,
  },
  foto: { width: 100, height: 100, borderRadius: 15, borderColor: "#fff", borderWidth: 2, resizeMode: 'cover'  },
  info: { flex: 1, marginLeft: 15,padding:15, borderRadius: 15,backgroundColor: "#fff" },
  nome: { fontWeight: "bold", fontSize: 17, color: "#000" },
  descricao: { color: "#555", fontSize: 12, marginTop: 5 },
});
