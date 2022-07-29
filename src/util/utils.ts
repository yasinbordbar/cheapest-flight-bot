import axios from "axios";
import "dotenv/config";
import { Flight } from "../type/types.js";

const findCheapestWeekFlight = (
  weekNumber: number,
  weeklyPrices: number[]
): Flight => {
  const MINIMUM_PRICE = Math.min(...weeklyPrices);
  const cheapestFlightDate = new Date();
  cheapestFlightDate.setDate(
    new Date().getDate() +
      (weeklyPrices.indexOf(MINIMUM_PRICE) + 1 + (weekNumber - 1) * 7)
  );

  return {
    price: MINIMUM_PRICE.toLocaleString(),
    date: convertToISODate(cheapestFlightDate),
  };
};

const convertToISODate = (today: Date) => today.toISOString().substring(0, 10);
const convertToNumber = (priceText: string) =>
  Number(priceText.match(/[0-9]+/g)?.join(""));

const handleMessage = (
  weekNumber: number,
  weeklyPrices: number[],
  cheapestFlight: Flight
) => {
  return `Week ${weekNumber} \n The Minimum price is *${cheapestFlight.price} Toman* on *${cheapestFlight.date}*!\n`;
};

const sendMessageToTelegram = (message: string) =>
  axios.post(`https://api.telegram.org/${process.env.BOT_TOKEN}/sendMessage`, {
    chat_id: process.env.CHAT_ID,
    text: message,
    parse_mode: "markdown",
  });

export {
  convertToISODate,
  convertToNumber,
  handleMessage,
  sendMessageToTelegram,
  findCheapestWeekFlight,
};
