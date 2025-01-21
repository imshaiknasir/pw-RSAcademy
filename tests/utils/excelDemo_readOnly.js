import ExcelJS from "exceljs";

/**
 * Read the excel file and print the values of each cell
 */
async function readExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = await workbook.xlsx.readFile("tests/utils/excelDemo_readOnly.xlsx")
    const sheetName = worksheet.getWorksheet("Sheet1");

    sheetName.eachRow((row) => {
        row.eachCell((cell) => {
            console.log(cell.value);
        });
    });
}

readExcel();