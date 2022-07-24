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

  try {
    await goToWebsite();
    let weeklyPrices = [];
    let messageList = ["Tehran to Brussels ✈🇧🇪 \n"];

    for (let i = 1; i <= NUMBER_OF_DAYS; i++) {
      await waitToLoadPage();
      const dayPrice = await findTheFirstPrice();
      weeklyPrices.push(convertToNumber(dayPrice));
      await goToNextPage();

      if (i % 7 === 0) {
        const weekNumber = i / 7;
        const cheapestFlight = findCheapestWeekFlight(weeklyPrices, weekNumber);
        messageList.push(
          handleMessage(weekNumber, weeklyPrices, cheapestFlight)
        );
        weeklyPrices = [];
      }
    }

    await sendMessageToTelegram(messageList.join("\n==========\n"));
  } catch (err) {
    console.log(err);
  } finally {
    await driver.quit();
  }
})();
