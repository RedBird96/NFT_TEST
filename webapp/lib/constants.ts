const API_URL = "http://localhost:3000";
const OPENSEA_URL = "https://opensea.io/assets/ethereum/";
const ORDER_BY = [
  {
    label: "Sale date",
    value: "sale_date",
  },
  {
    label: "Sale count",
    value: "sale_count",
  }
];
const ORDER_DIRECTION = [
  {
    label: "Ascending",
    value: "asc",
  },
  {
    label: "Descending",
    value: "desc",
  },
];
const MENU = [
  {
    value: "/",
    label: "Home",
  }
];

const NETWORKS = {
  ETHEREUM:{
    chainId:1,
    show:'Ethereum'
  },
  BINANCE:{
    chainId:2,
    show:'Binance'
  }
};

const EXPORTS = {
  API_URL,
  ORDER_BY,
  ORDER_DIRECTION,
  MENU,
  OPENSEA_URL,
  NETWORKS
};

export default EXPORTS;
