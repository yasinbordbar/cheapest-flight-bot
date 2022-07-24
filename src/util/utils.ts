import axios from "axios";
import dotenv from "dotenv";
import { Flight } from "../type/types.js";
dotenv.config();

const sendMessageToTelegram = (pricesMessage: string) =>
  axios.post(`https://api.telegram.org/${process.env.BOT_TOKEN}/sendMessage`, {
    chat_id: process.env.CHAT_ID,
    text: pricesMessage,
    parse_mode: "markdown",
  });

const handleMessage = (
  weekIndex: number,
  weeklyPrices: number[],
  cheapestFlight: Flight
) =>
  `Week ${weekIndex} \n${weeklyPrices.join("\n")} \n\nThe Minimum price is *${
    cheapestFlight.price + " Toman"
  }* on *${cheapestFlight.date}*!`;
const convertToISODate = (today: Date) => today.toISOString().substring(0, 10);

const convertToNumber = (priceText: string) =>
  Number(priceText.match(/[0-9]+/g)?.join(""));

const findCheapestWeekFlight = (weeklyPrices: any[], weekNumber: number) => {
  const indexOfCheapestDay =
    weeklyPrices.indexOf(Math.min(...weeklyPrices)) + 1;

  const cheapestDay = new Date();
  cheapestDay.setDate(
    new Date().getDate() + (indexOfCheapestDay + (weekNumber - 1) * 7)
  );

  const cheapestFlight: Flight = {
    price: Math.min(...weeklyPrices).toLocaleString(),
    date: convertToISODate(cheapestDay),
  };
  return cheapestFlight;
};

export {
  convertToISODate,
  convertToNumber,
  handleMessage,
  sendMessageToTelegram,
  findCheapestWeekFlight,
};
