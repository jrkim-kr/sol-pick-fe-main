// 식재료 아이콘을 import하는 파일
// 이 방법은 웹팩의 모듈 번들링 기능을 활용해 아이콘을 가져옵니다

// 필요한 식재료 아이콘 import
import carrotIcon from "../../assets/ing/ing_carrot.svg";
import onionIcon from "../../assets/ing/ing_onion.svg";
import potatoIcon from "../../assets/ing/ing_potato.svg";
import tomatoIcon from "../../assets/ing/ing_tomato.svg";
import cucumberIcon from "../../assets/ing/ing_cucumber.svg";
import broccoliIcon from "../../assets/ing/ing_broccoli.svg";
import meatIcon from "../../assets/ing/ing_meat.svg";
import fishIcon from "../../assets/ing/ing_fish.svg";
import cheeseIcon from "../../assets/ing/ing_cheese.svg";
import eggIcon from "../../assets/ing/ing_egg.svg";

// 추가 식재료 아이콘
import avocadoIcon from "../../assets/ing/ing_avocado.svg";
import breadIcon from "../../assets/ing/ing_bread.svg";
import cherryIcon from "../../assets/ing/ing_cherry.svg";
import chocolateIcon from "../../assets/ing/ing_chocolate.svg";
import coffeeIcon from "../../assets/ing/ing_coffee.svg";

// 상점 아이콘
import shopIcon from "../../assets/shop.svg";

// 식재료 아이콘 객체로 내보내기
export const IngredientIcons = {
  carrot: carrotIcon,
  onion: onionIcon,
  potato: potatoIcon,
  tomato: tomatoIcon,
  cucumber: cucumberIcon,
  broccoli: broccoliIcon,
  meat: meatIcon,
  fish: fishIcon,
  cheese: cheeseIcon,
  egg: eggIcon,
  avocado: avocadoIcon,
  bread: breadIcon,
  cherry: cherryIcon,
  chocolate: chocolateIcon,
  coffee: coffeeIcon,
};

// 아이콘 배열로 내보내기 (랜덤 선택 등에 유용)
export const IngredientIconsArray = [
  carrotIcon,
  onionIcon,
  potatoIcon,
  tomatoIcon,
  cucumberIcon,
  broccoliIcon,
  meatIcon,
  fishIcon,
  cheeseIcon,
  eggIcon,
  avocadoIcon,
  breadIcon,
  cherryIcon,
  chocolateIcon,
  coffeeIcon,
];

// 상점 아이콘 내보내기
export const ShopIcon = shopIcon;

export default IngredientIcons;
