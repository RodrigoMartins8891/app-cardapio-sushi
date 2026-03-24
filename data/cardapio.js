import urumaki from "../assets/imagens/uramaki.png";
import urumaki_atum from "../assets/imagens/uramaki-atum.jpg";
import sushi from "../assets/imagens/sushi.png";
import sushi_atum from "../assets/imagens/sushi-atum.jpg";
import sashimi_salmao from "../assets/imagens/sashimi-salmao.jpg";
import sashimi_atum from "../assets/imagens/sashimi.jpg";
import roll from "../assets/imagens/roll.png";
import hot from "../assets/imagens/hot.png";
import yakisoba_frango from "../assets/imagens/yakisoba-frango.jpg";
import yakisoba_legumes from "../assets/imagens/yakisoba-legumes.jpg";
import yakitori_ebi from "../assets/imagens/yakitori-ebi.jpg";
import yakitori_ika from "../assets/imagens/yakitori-ika.jpg";
import temaki_salmao from "../assets/imagens/temaki-salmao.jpg";
import temaki_atum from "../assets/imagens/temaki-atum.jpg";
import shimeji from "../assets/imagens/shimeji.jpg";
import shitake from "../assets/imagens/shitake.jpg";
import gyoza from "../assets/imagens/gyoza.jpg";
import tempura_camarao from "../assets/imagens/tempura-camarao.jpg";
import tempura_salmao from "../assets/imagens/tempura-salmao.jpg";

const cardapio = [
  {
    nome: "Uramaki (Salmão)",
    descricao: "Contém Arroz, alga, salmão, cream cheese e cebolinha",
    categoria: "Roll",
    pratoSugerido: false,
    imagem: urumaki,
    preco: 28.90,
  },
  {
    nome: "Uramaki (Atum)",
    descricao: "Contém Arroz, alga, atum, cream cheese e cebolinha",
    categoria: "Roll",
    pratoSugerido: false,
    imagem: urumaki_atum,
    preco: 30.50,
  },
  {
    nome: "Sushi (Salmão)",
    descricao: "Arroz coberto por uma lâmina de salmão",
    categoria: "Sushi",
    pratoSugerido: true,
    imagem: sushi,
    preco: 22.00,
  },
  {
    nome: "Sushi (Atum)",
    descricao: "Arroz coberto por uma lâmina de atum",
    categoria: "Sushi",
    pratoSugerido: false,
    imagem: sushi_atum,
    preco: 24.50,
  },
  {
    nome: "Roll Tradicional",
    descricao: "Enrolado de alga nori com Arroz, Cream Cheese e Salmão",
    categoria: "Roll",
    pratoSugerido: false,
    imagem: roll,
    preco: 26.00,
  },
  {
    nome: "Hot Filadelfia",
    descricao: "Empanado de alga crocante, arroz, salmão, cream cheese e cebolinha.",
    categoria: "Roll",
    pratoSugerido: false,
    imagem: hot,
    preco: 32.00,
  },
  {
    nome: "Yakisoba (Frango)",
    descricao: "Macarrão oriental, frango, repolho, cenoura e brócolis americano.",
    categoria: "Yakisoba",
    pratoSugerido: false,
    imagem: yakisoba_frango,
    preco: 45.00,
  },
  {
    nome: "Yakisoba (Legumes)",
    descricao: "Macarrão oriental, repolho, cenoura e brócolis americano",
    categoria: "Yakisoba",
    pratoSugerido: false,
    imagem: yakisoba_legumes,
    preco: 38.00,
  },
  {
    nome: "Yakitori (Ebi)",
    descricao: "Espetinho de camarão.",
    categoria: "Yakitori",
    pratoSugerido: false,
    imagem: yakitori_ebi,
    preco: 18.00,
  },
  {
    nome: "Yakitori (Ika)",
    descricao: "Espetinho de lula.",
    categoria: "Yakitori",
    pratoSugerido: false,
    imagem: yakitori_ika,
    preco: 16.50,
  },
  {
    nome: "Temaki (Salmão)",
    descricao: "Cones feitos de alga recheado com salmão, arroz e cebolinha.",
    categoria: "Temaki",
    pratoSugerido: false,
    imagem: temaki_salmao,
    preco: 34.00,
  },
  {
    nome: "Temaki (Atum)",
    descricao: "Cones feitos de alga recheado com atum, arroz e cebolinha.",
    categoria: "Temaki",
    pratoSugerido: false,
    imagem: temaki_atum,
    preco: 36.00,
  },
  {
    nome: "Sashimi (Salmão)",
    descricao: "Fatias finas de salmao cru.",
    categoria: "Sashimi",
    pratoSugerido: true,
    imagem: sashimi_salmao,
    preco: 42.00,
  },
  {
    nome: "Sashimi (Atum)",
    descricao: "Fatias finas de atum cru.",
    categoria: "Sashimi",
    pratoSugerido: false,
    imagem: sashimi_atum,
    preco: 45.00,
  },
  {
    nome: "Shimeji",
    descricao: "Porção de cogumelos Shimeji na manteiga",
    categoria: "Cogumelos",
    pratoSugerido: false,
    imagem: shimeji,
    preco: 35.00,
  },
  {
    nome: "Shitake",
    descricao: "Porção de cogumelos Shitake na manteiga",
    categoria: "Cogumelos",
    pratoSugerido: false,
    imagem: shitake,
    preco: 39.00,
  },
  {
    nome: "Gyoza (Carne)",
    descricao: "Bolinho frito recheado com carne",
    categoria: "Gyoza",
    pratoSugerido: true,
    imagem: gyoza,
    preco: 25.00,
  },
  {
    nome: "Gyoza (Legumes)",
    descricao: "Bolinho frito recheado com legumes",
    categoria: "Gyoza",
    pratoSugerido: false,
    imagem: gyoza,
    preco: 22.00,
  },
  {
    nome: "Tempurá (Camarão)",
    descricao: "Camarões fritos em uma massa leve.",
    categoria: "Tempura",
    pratoSugerido: false,
    imagem: tempura_camarao,
    preco: 48.00,
  },
  {
    nome: "Tempura (Salmão)",
    descricao: "Salmão frito em uma massa leve.",
    categoria: "Tempura",
    pratoSugerido: true,
    imagem: tempura_salmao,
    preco: 44.00,
  },
];

export default cardapio;
