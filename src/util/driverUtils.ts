import { Builder, By, until } from "selenium-webdriver";
import { convertToISODate } from "./utils.js";

export const driver = await new Builder().forBrowser("chrome").build();

const goToWebsite = async (DEPARTURE: string, DESTINATION: string) => {
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);

  await driver.get(
    `https://flightio.com/flight/search/1/${DEPARTURE}-${DESTINATION}/${convertToISODate(
      tomorrow
    )}/1-0-0-1`
  );
};

const waitToLoadPage = () =>
  driver.wait(
    until.elementLocated(
      By.className(
        "flabel ResultItemPriceLabel_price__ayC_S   flabel--hasnot-bg"
      )
    )
  );

const findTheFirstPrice = () =>
  driver
    .findElement(
      By.className(
        "flabel ResultItemPriceLabel_price__ayC_S   flabel--hasnot-bg"
      )
    )
    .getText();


const goToNextPage = async () => {
  await waitUntilButtonIsClickable();
  await clickOnNextButton();
};

const waitUntilButtonIsClickable = async () => {
    await driver.wait(
        until.elementIsEnabled(
            driver.findElement(
                By.className(
                    "btn searchresult-header__change-date-btn searchresult-header__nextdate-btn"
                )
            )
        )
    );
};

const clickOnNextButton = async () => {
    await driver
        .findElement(
            By.className(
                "btn searchresult-header__change-date-btn searchresult-header__nextdate-btn"
            )
        )
        .click();
};

export {
  clickOnNextButton,
  goToNextPage,
  findTheFirstPrice,
  waitUntilButtonIsClickable,
  waitToLoadPage,
  goToWebsite,
};
