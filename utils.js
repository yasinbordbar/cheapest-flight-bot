import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const sendMessageToTelegram = (pricesMessage) =>
  axios.post(`https://api.telegram.org/${process.env.BOT_TOKEN}/sendMessage`, {
    chat_id: process.env.CHAT_ID,
    text: pricesMessage,
    parse_mode: "markdown",
  });

const handleMessage = (weeklyPrices, cheapestFlight) =>
  `Tehran to Brussels ✈🇧🇪 \n\n${weeklyPrices.join(
    ", "
  )} \n\nThe Minimum price is *${cheapestFlight.price + " Toman"}* on *${
    cheapestFlight.date
  }*!`;
const convertToISODate = (today) => today.toISOString().substring(0, 10);

const convertToNumber = (priceText) =>
  Number(priceText.match(/[0-9]+/g).join(""));

export {
  convertToISODate,
  convertToNumber,
  handleMessage,
  sendMessageToTelegram,
};
