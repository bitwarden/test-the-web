import { CookieOptions } from "express-serve-static-core";

export const ROUTES = {
  ACCOUNT: "/account",
  IDENTITY: "/identity",
  LOGIN: "/login",
  PAYMENT: "/payment",
  SEARCH: "/search",
  WELL_KNOWN_CHANGE_PASSWORD: "/.well-known/change-password",
  UPDATE_PASSWORD_FORM: "/forms/update/update-password",
};

export const QUERY_PARAMS = {
  HIDE_PAGINATION: "docusaurus-data-hide-pagination",
  HIDE_HEADER: "docusaurus-data-hide-header",
};

export const COOKIE_OPTIONS: CookieOptions = {
  sameSite: "strict",
  secure: true,
  maxAge: 1000 * 60 * 5,
};

export const STORED_VALUE_KEYS = {
  REFERRER_REQUEST_BODY: "referrerRequestBody",
  REQUEST_RESPONSE_BODY: "requestResponseBody",
} as const;

// Generated mock data
export const mockSearchData = [
  {
    created_on: 1631792438,
    name: "Edible honeysuckle",
    color: "#c17bcd",
    icon: ":wheelchair:",
  },
  {
    created_on: 1644813913,
    name: "Marionberry",
    color: "#d3336b",
    icon: ":point_right:",
  },
  {
    created_on: 1652239215,
    name: "Desert banana",
    color: "#c81b5b",
    icon: ":hourglass_flowing_sand:",
  },
  {
    created_on: 1064085703,
    name: "Loquat",
    color: "#5290be",
    icon: ":eight_pointed_black_star:",
  },
  {
    created_on: 1221850823,
    name: "Cola nut",
    color: "#97f31b",
    icon: ":gb:",
  },
  {
    created_on: 1017616073,
    name: "Coffee",
    color: "#4f9831",
    icon: ":shower:",
  },
  {
    created_on: 1602027146,
    name: "Black raspberry",
    color: "#7427da",
    icon: ":kimono:",
  },
  {
    created_on: 1619086794,
    name: "Dabai",
    color: "#982aa4",
    icon: ":helicopter:",
  },
  {
    created_on: 1476842231,
    name: "Blackcurrant",
    color: "#e8b4cd",
    icon: ":trophy:",
  },
  {
    created_on: 1016526594,
    name: "Galia melon",
    color: "#609823",
    icon: ":grey_exclamation:",
  },
  {
    created_on: 1653243933,
    name: "Banana",
    color: "#2a9124",
    icon: ":scorpius:",
  },
  {
    created_on: 1478278582,
    name: "Gambooge",
    color: "#d110cc",
    icon: ":confounded:",
  },
  {
    created_on: 1022315886,
    name: "Clementine",
    color: "#52c70d",
    icon: ":dango:",
  },
  {
    created_on: 1318013865,
    name: "Hippophae",
    color: "#35379f",
    icon: ":fireworks:",
  },
  {
    created_on: 1271549840,
    name: "Betel nut",
    color: "#400728",
    icon: ":cat:",
  },
  {
    created_on: 1435091602,
    name: "Bilberry",
    color: "#bd0c17",
    icon: ":closed_lock_with_key:",
  },
  {
    created_on: 1034277527,
    name: "Northern highbush blueberry",
    color: "#be25df",
    icon: ":hearts:",
  },
  {
    created_on: 1075179060,
    name: "Amelanchier",
    color: "#11b7c4",
    icon: ":clipboard:",
  },
  {
    created_on: 1269453491,
    name: "Kakadu lime",
    color: "#cc1520",
    icon: ":oncoming_taxi:",
  },
  {
    created_on: 1220648050,
    name: "Giant granadilla",
    color: "#436573",
    icon: ":no_smoking:",
  },
  {
    created_on: 1596570416,
    name: "Bog bilberry",
    color: "#5a6275",
    icon: ":small_red_triangle_down:",
  },
  {
    created_on: 1697545293,
    name: "Photinia",
    color: "#22bb80",
    icon: ":european_post_office:",
  },
  {
    created_on: 1072316781,
    name: "Cluster fig",
    color: "#f46286",
    icon: ":green_apple:",
  },
  {
    created_on: 1483465901,
    name: "Kakadu lime",
    color: "#3abf40",
    icon: ":couple:",
  },
  {
    created_on: 1497919500,
    name: "Clementine",
    color: "#c02fa3",
    icon: ":heartbeat:",
  },
  {
    created_on: 1611490891,
    name: "Dabai",
    color: "#538397",
    icon: ":mans_shoe:",
  },
  {
    created_on: 1220322973,
    name: "Doubah",
    color: "#285fef",
    icon: ":rage1:",
  },
  {
    created_on: 1570348111,
    name: "Coffee",
    color: "#4919e6",
    icon: ":rabbit:",
  },
  {
    created_on: 1136070944,
    name: "Desert banana",
    color: "#06e259",
    icon: ":u5272:",
  },
  {
    created_on: 1360855286,
    name: "European blueberry",
    color: "#126efa",
    icon: ":hurtrealbad:",
  },
  {
    created_on: 1344969366,
    name: "Aronia",
    color: "#f89da3",
    icon: ":heart_eyes:",
  },
  {
    created_on: 1132522176,
    name: "Pentadiplandra",
    color: "#00881e",
    icon: ":hammer:",
  },
  {
    created_on: 1000669804,
    name: "Berberis vulgaris",
    color: "#778c62",
    icon: ":abcd:",
  },
  {
    created_on: 1330344776,
    name: "Babaco",
    color: "#8af7de",
    icon: ":arrow_right_hook:",
  },
  {
    created_on: 1041145181,
    name: "Confederate huckleberry",
    color: "#5a7ab9",
    icon: ":ok_hand:",
  },
  {
    created_on: 1141800098,
    name: "Desert lime",
    color: "#15827a",
    icon: ":arrows_counterclockwise:",
  },
  {
    created_on: 1045909296,
    name: "Loganberry",
    color: "#3868b2",
    icon: ":nut_and_bolt:",
  },
  {
    created_on: 1382841956,
    name: "Berberis vulgaris",
    color: "#64b723",
    icon: ":grey_question:",
  },
  {
    created_on: 1026606495,
    name: "Edible honeysuckle",
    color: "#f937de",
    icon: ":blowfish:",
  },
  {
    created_on: 960222509,
    name: "Hippophae",
    color: "#7504ce",
    icon: ":key:",
  },
  {
    created_on: 1164211819,
    name: "Camu camu",
    color: "#05bc9c",
    icon: ":busts_in_silhouette:",
  },
  {
    created_on: 1366822024,
    name: "European Raspberry",
    color: "#1368fb",
    icon: ":diamonds:",
  },
];
