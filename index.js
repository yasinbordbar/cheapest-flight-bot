import {
  convertToISODate,
  convertToNumber,
  handleMessage,
  sendMessageToTelegram,
} from "./utils.js";
import {
  driver,
  findTheFirstPrice,
  goToNextPage,
  goToWebsite,
  waitToLoadPage,
} from "./driverUtils.js";

(async function findCheapestFlight() {
  const NUMBER_OF_DAYS = 7;

  try {
    await goToWebsite();
    let weeklyPrices = [];
    for (let i = 0; i < NUMBER_OF_DAYS; i++) {
      await waitToLoadPage();
      const dayPrice = await findTheFirstPrice();
      weeklyPrices.push(convertToNumber(dayPrice));
      await goToNextPage();
    }

    const indexOfCheapestDay =
      weeklyPrices.indexOf(Math.min(...weeklyPrices)) + 1;

    const cheapestDay = new Date();
    cheapestDay.setDate(new Date().getDate() + indexOfCheapestDay);

    const cheapestFlight = {
      price: Math.min(...weeklyPrices).toLocaleString(),
      date: convertToISODate(cheapestDay),
    };
    const message = handleMessage(weeklyPrices, cheapestFlight);

    await sendMessageToTelegram(message);
  } catch (err) {
    console.log(err);
  } finally {
    await driver.quit();
  }
})();
