const {test, expect} = require ('playwright/test');

test('CalenderValidation',async ({page})=>
{
const month = "12";
const date = "27";
const year = "2025";
const expectedList = [month,date,year];

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

await page.locator(".react-date-picker__inputGroup").click();

await page.locator(".react-calendar__navigation__label").click();   //choose months window
await page.locator(".react-calendar__navigation__label").click();   //choose year window
await page.getByText(year).click();
await page.locator(".react-calendar__year-view__months__month").nth(Number(month-1)).click();
await page.locator(".react-calendar__month-view__days__day").nth(Number(date-1)).click();
//await page.pause();

//assertions

const fullDate = page.locator(".react-date-picker__inputGroup [name = 'date']");
expect(await fullDate.inputValue() === year+"-"+month+"-"+date).toBeTruthy();

const inputs = page.locator(".react-date-picker__inputGroup__input")

for (let i=0; i<expectedList.length; i++)

    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }

})