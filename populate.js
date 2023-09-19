const axios = require("axios");
const connectDB = require("./DB/connectDB");
const DataModel = require("./Model/model");
require("dotenv").config();

const URL = "https://api.wazirx.com/api/v2/tickers";

const getData = async () => {
  try {
    const { data } = await axios.get(URL);

    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const start = async () => {
  try {
    const data = await getData();
    // console.log({ data });

    const dataArray = Object.keys(data).map((key) => data[key]);

    if (Array.isArray(dataArray)) {
      let populateData = dataArray.slice(0, 10);

      populateData = populateData.map((item) => {
        return {
          name: item.name,
          last: item.last,
          buy: item.buy,
          sell: item.sell,
          volume: item.volume,
          base_unit: item.base_unit,
        };
      });

      console.log({ populateData });

      await connectDB(process.env.MONGO_URI);
      await DataModel.deleteMany(); // deletes previous data
      await DataModel.create(populateData); // add new data
      console.log("Data Creation Success !!");
      process.exit(0);
    }
  } catch (error) {
    console.log("Data Creation Failed !!");
    console.log(error);
    process.exit(1);
  }
};

start();
