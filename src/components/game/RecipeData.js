import bolognese from "../../assets/game/recipe/bolognese.jpg";
import carbonara from "../..//assets/game/recipe/carbonara.jpg";
import seaweedSoup from "../../assets/game/recipe/seaweed_soup.jpg";
import kimchiStew from "../../assets/game/recipe/kimchi_stew.jpg";
import mapoDofuRice from "../../assets/game/recipe/mapo_dofu_rice.jpg";
import eggFriedRice from "../../assets/game/recipe/egg_fried_rice.jpg";

import spaghettiIcon from "../../assets/ing/ing_spaghetti.svg";
import beefIcon from "../../assets/ing/ing_meat.svg";
import onionIcon from "../../assets/ing/ing_onion.svg";
import carrotIcon from "../../assets/ing/ing_carrot.svg";
import tomatoIcon from "../../assets/ing/ing_tomato.svg";
import garlicIcon from "../../assets/ing/ing_garlic.svg";
import cheeseIcon from "../../assets/ing/ing_cheese.svg";
import baconIcon from "../../assets/ing/ing_bacon.svg";
import eggIcon from "../../assets/ing/ing_egg.svg";
import porkIcon from "../../assets/ing/ing_pork.svg";
import riceIcon from "../../assets/ing/ing_rice.svg";
import kimchiIcon from "../../assets/ing/ing_kimchi.svg";
// import seaweedIcon from "../../assets/ing/ing_seaweed.svg";
// import tofuIcon from "../../assets/ing/ing_tofu.svg";

// 레시피 데이터
export const recipes = [
  {
    id: 1,
    name: "볼로네제파스타",
    imagePath: bolognese,
    points: 13000,
    ingredients: [
      { name: "스파게티면", quantity: 2, icon: spaghettiIcon },
      { name: "소고기", quantity: 3, icon: beefIcon },
      { name: "양파", quantity: 2, icon: onionIcon },
      { name: "당근", quantity: 1, icon: carrotIcon },
      { name: "토마토", quantity: 3, icon: tomatoIcon },
      { name: "마늘", quantity: 2, icon: garlicIcon },
      { name: "치즈", quantity: 2, icon: cheeseIcon },
    ],
  },
  {
    id: 2,
    name: "까르보나라",
    imagePath: carbonara,
    points: 11000,
    ingredients: [
      { name: "스파게티면", quantity: 2, icon: spaghettiIcon },
      { name: "베이컨", quantity: 3, icon: baconIcon },
      { name: "계란", quantity: 2, icon: eggIcon },
      { name: "치즈", quantity: 2, icon: cheeseIcon },
    ],
  },
  {
    id: 3,
    name: "미역국",
    imagePath: seaweedSoup,
    points: 10000,
    ingredients: [
      // { name: "미역", quantity: 2, icon: seaweedIcon },
      { name: "소고기", quantity: 2, icon: beefIcon },
      { name: "마늘", quantity: 1, icon: garlicIcon },
    ],
  },
  {
    id: 4,
    name: "김치찌개",
    imagePath: kimchiStew,
    points: 10000,
    ingredients: [
      { name: "김치", quantity: 3, icon: kimchiIcon },
      { name: "돼지고기", quantity: 2, icon: porkIcon },
      // { name: "두부", quantity: 1, icon: tofuIcon },
      { name: "양파", quantity: 1, icon: onionIcon },
      { name: "마늘", quantity: 1, icon: garlicIcon },
    ],
  },
  {
    id: 5,
    name: "마파두부덮밥",
    imagePath: mapoDofuRice,
    points: 12000,
    ingredients: [
      // { name: "두부", quantity: 2, icon: tofuIcon },
      { name: "돼지고기", quantity: 2, icon: porkIcon },
      { name: "양파", quantity: 1, icon: onionIcon },
      { name: "마늘", quantity: 1, icon: garlicIcon },
      { name: "밥", quantity: 2, icon: riceIcon },
    ],
  },
  {
    id: 6,
    name: "계란볶음밥",
    imagePath: eggFriedRice,
    points: 9500,
    ingredients: [
      { name: "밥", quantity: 2, icon: riceIcon },
      { name: "계란", quantity: 2, icon: eggIcon },
      { name: "양파", quantity: 1, icon: onionIcon },
    ],
  },
];

export default recipes;
