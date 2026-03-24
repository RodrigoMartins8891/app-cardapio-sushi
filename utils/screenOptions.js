const options = {
  tabBarScrollEnabled: true, // Permite deslizar o menu
  tabBarGap: 10, // Define a distância entre um item e outro
  
  tabBarStyle: {
    backgroundColor: '#f11635',
    paddingTop: 10,
    elevation: 0, // Remove sombra no Android
    shadowColor: 'transparent', // Remove sombra no iOS
    height: 60, // Ajuste a altura se precisar de mais espaço
  },

  tabBarItemStyle: {
    width: "auto", // Importante: faz a aba ter o tamanho do texto
    paddingHorizontal: 10, // Espaçamento interno para não grudar no indicador
  },

  tabBarLabelStyle: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase', // Deixa em caixa alta igual à imagem
  },

  tabBarIndicatorStyle: {
    backgroundColor: 'white',
    height: 3,
    marginBottom: 5, // Ajustado para ficar próximo ao texto
  },

  tabBarActiveTintColor: '#ffffff',
  tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
};

export default options;
