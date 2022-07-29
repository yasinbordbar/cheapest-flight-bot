import {
  driver,
  findTheFirstPrice,
  goToNextPage,
  goToWebsite,
  waitToLoadPage,
} from "./util/driverUtils.js";
import {
  convertToNumber,
  findCheapestWeekFlight,
  handleMessage,
  sendMessageToTelegram,
} from "./util/utils.js";

(async function findCheapestFlight() {
  const NUMBER_OF_DAYS = 14;
  const DEPARTURE = "THR";
  const DESTINATION = "BRU";

  try {
    let weeklyPrices = [];
    let message = `Cheapest flights from ${DEPARTURE} to ${DESTINATION} ✈ \n`;
    await goToWebsite(DEPARTURE, DESTINATION);
    for (let i = 1; i <= NUMBER_OF_DAYS; i++) {
      await waitToLoadPage();
      const dayPrice = await findTheFirstPrice();
      weeklyPrices.push(convertToNumber(dayPrice));
      await goToNextPage();

      if (i % 7 === 0) {
        const weekNumber = i / 7;
        const cheapestFlight = findCheapestWeekFlight(weekNumber, weeklyPrices);
        message += handleMessage(weekNumber, weeklyPrices, cheapestFlight);
        weeklyPrices = [];
      }
    }

    await sendMessageToTelegram(message);
  } catch (err) {
    console.log(err);
  } finally {
    await driver.quit();
  }
})();
