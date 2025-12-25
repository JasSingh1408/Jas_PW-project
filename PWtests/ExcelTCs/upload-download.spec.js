// exceljs supports reading excel and Json
// using async function type and await to waiting while workbook is getting loaded.
const { test, expect } = require('playwright/test');
const ExcelJs = require('exceljs');

async function readTheExcel(worksheet, oldValue) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {
            if (cell.value === oldValue) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;
}

//writeExcel("EastName", "Rainham", "C:/Users/JasSingh/Downloads/PW_practice.xlsx")

async function writeExcel(oldValue, newValue, change, filePath) {

    const workbook = new ExcelJs.Workbook();  // workbook is a existing method in exceljs class.

    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');

    const output = await readTheExcel(worksheet, oldValue);

    const cell = worksheet.getCell(output.row + change.rowChange, output.column + change.ColChange);
    cell.value = newValue;
    await workbook.xlsx.writeFile(filePath);
}

//writeExcel("RainHam",1800,{rowChange:0,ColChange:2},"C:/Users/JasSingh/Downloads/PW_practice.xlsx")

test('upload-download Excel', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const searchText = "Banana";
    const updatedValue = 900;
    const fileName = "C:/Users/JasSingh/Downloads/download.xlsx"

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button", {name:'Download'}).click();
    await downloadPromise;     // downladPromise is used to wait for the download event to get over from the browser.

    writeExcel(searchText, updatedValue, { rowChange: 0, ColChange: 2 }, fileName);

    await page.locator("#fileinput").click();     // to choose a file from window folder system - use setInputFiles
    await page.locator("#fileinput").setInputFiles(fileName);

    const textLocator = page.getByText(searchText);
    const desiredRow = await page.getByRole('row').filter({has: textLocator})

    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatedValue);

})