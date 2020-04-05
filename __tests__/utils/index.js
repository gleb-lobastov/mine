export function toSelector(locator) {
  return `[data-locator="${locator}"] `;
}

export function evaluateInputValue(fieldSelector, value) {
  const element =
    document.querySelector(`${fieldSelector} input`) ||
    document.querySelector(`${fieldSelector}`);
  element.value = value;
}

export function evaluateClick(fieldSelector) {
  const element = document.querySelector(`${fieldSelector}`);
  element.click();
}

async function clickRandomOption(page, selector) {
  const actualSelector = `${selector} [role="option"]`;
  const items = await page.$$(actualSelector);
  const count = Array.from(items).length - 1; // except 1st option
  const randomIndex = Math.floor(Math.random() * count);
  await this.page.click(
    `${actualSelector}:nth-of-type(${randomIndex + 2 || 2})`,
  );
  await this.page.waitFor(actualSelector, { hidden: true });
}

export async function selectRandomOption(page, selectSelector, portalSelector) {
  await page.click(`${selectSelector} .MuiInputBase-root`);
  await page.waitFor(`${portalSelector} [role="option"]`);
  await clickRandomOption(page, portalSelector);
}
