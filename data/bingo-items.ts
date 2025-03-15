import {
  CarMailTruck,
  CarTruck,
  CarAmbulance,
  CarPolice,
  CarBus,
  CarGarbageTruck,
  CarKoujiShovelcar,
  CarKoujiCrane,
  CarKoujiRoadRoller,
  CarTankerTruck,
  CarMixerTruck,
  TrainBlue,
  Ship,
  AnimalDogSanpo,
  AnimalCatMike,
} from "@/assets/img"

/**
 * ビンゴアイテムの型
 * @param name アイテム名
 * @param image アイテム画像
 * @param rarity アイテムのレアリティ 1 ~ 5 (5が最もレア)
 */
type BingoItem = {
  name: string
  image: string
  rarity: number
}

export const bingoItems: BingoItem[] = [
  {
    name: "ゆうびんしゃ",
    image: CarMailTruck,
    rarity: 3,
  },
  {
    name: "とらっく",
    image: CarTruck,
    rarity: 1,
  },
  {
    name: "きゅうきゅうしゃ",
    image: CarAmbulance,
    rarity: 4,
  },
  {
    name: "ぱとかー",
    image: CarPolice,
    rarity: 4,
  },
  {
    name: "ばす",
    image: CarBus,
    rarity: 1,
  },
  {
    name: "ごみ しゅうしゅうしゃ",
    image: CarGarbageTruck,
    rarity: 4,
  },
  {
    name: "しょべるかー",
    image: CarKoujiShovelcar,
    rarity: 4,
  },
  {
    name: "くれーんしゃ",
    image: CarKoujiCrane,
    rarity: 4,
  },
  {
    name: "ろーどろーらー",
    image: CarKoujiRoadRoller,
    rarity: 5,
  },
  {
    name: "たんくろーりー",
    image: CarTankerTruck,
    rarity: 5,
  },
  {
    name: "みきさーしゃ",
    image: CarMixerTruck,
    rarity: 5,
  },
  {
    name: "でんしゃ",
    image: TrainBlue,
    rarity: 3,
  },
  {
    name: "ふね",
    image: Ship,
    rarity: 5,
  },
  {
    name: "いぬとさんぽしてるひと",
    image: AnimalDogSanpo,
    rarity: 3,
  },
  {
    name: "ねこ",
    image: AnimalCatMike,
    rarity: 3,
  },
  // {
  //   id: 13,
  //   name: "さんぽしてるひと",
  //   image:"",
  // },
  // {
  //   id: 14,
  //   name: "ねこ",
  //   image:"",
  // },
  // {
  //   id: 15,
  //   name: "まくどなるど",
  //   image:"",
  // },
  // {
  //   id: 16,
  //   name: "とりい",
  //   image:"",
  // },
  // {
  //   id: 17,
  //   name: "とんねる",
  //   image:"",
  // },
  // {
  //   id: 18,
  //   name: "でんしゃ",
  //   image:"",
  // },
  // {
  //   id: 19,
  //   name: "ふね",
  //   image:"",
  // },
  // {
  //   id: 20,
  //   name: "たくしー",
  //   image:"",
  // },
  // {
  //   id: 21,
  //   name: "びょういん",
  //   image:"",
  // },
  // {
  //   id: 22,
  //   name: "こうえん",
  //   image:"",
  // },
  // {
  //   id: 23,
  //   name: "にじ",
  //   image:"",
  // },
  // {
  //   id: 24,
  //   name: "かみなり",
  //   image:"",
  // },
  // {
  //   id: 25,
  //   name: "さーかすてんと",
  //   image:"",
  // },
  // {
  //   id: 26,
  //   name: "おてら",
  //   image:"",
  // },
  // {
  //   id: 27,
  //   name: "てっとう",
  //   image:"",
  // },
  // {
  //   id: 28,
  //   name: "ぴざやさん",
  //   image:"",
  // },
  // {
  //   id: 29,
  //   name: "ちょすいそう",
  //   image:"",
  // },
  // {
  //   id: 30,
  //   name: "まるいがすたんく",
  //   image:"",
  // },
]
