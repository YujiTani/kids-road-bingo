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
  LogoMcdibaldo,
  WeatherRainbow,
  WeatherKaminari,
  ObjectTunnel,
  ObjectTorii,
  ObjectTettou,
  ObjectTera,
  ObjectKouen,
  ObjectChosuitou,
  ObjectCircusTent,
  ObjectFoodHamburger,
  ObjectFoodPizza,
  ObjectByouin,
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
  {
    name: "まくどなるど",
    image: LogoMcdibaldo,
    rarity: 3,
  },
  {
    name: "てんき：にじ",
    image: WeatherRainbow,
    rarity: 5,
  },
  {
    name: "てんき：かみなり",
    image: WeatherKaminari,
    rarity: 4,
  },
  {
    name: "とんねる",
    image: ObjectTunnel,
    rarity: 3,
  },
  {
    name: "とりい",
    image: ObjectTorii,
    rarity: 3,
  },
  {
    name: "てっとう",
    image: ObjectTettou,
    rarity: 3,
  },
  {
    name: "てら",
    image: ObjectTera,
    rarity: 3,
  },
  {
    name: "こうえん",
    image: ObjectKouen,
    rarity: 1,
  },
  {
    name: "ちょすいそう",
    image: ObjectChosuitou,
    rarity: 2,
  },
  {
    name: "まるいがすたんく",
    image: ObjectCircusTent,
    rarity: 4,
  },
  {
    name: "はんばーがーやさん",
    image: ObjectFoodHamburger,
    rarity: 3,
  },
  {
    name: "ぴざやさん",
    image: ObjectFoodPizza,
    rarity: 3,
  },
  {
    name: "びょういん",
    image: ObjectByouin,
    rarity: 3,
  },
  {
    name: "さーかすてんと",
    image: ObjectCircusTent,
    rarity: 5,
  },
]
