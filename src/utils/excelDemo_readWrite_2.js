import ExcelJS from 'exceljs'

/**
 * Read and Write to excel file
 * Change the price of "Banana" to "799"
 */
async function writeToExcel(params) {
    const workbook = new ExcelJS.Workbook()
    const worksheet = await workbook.xlsx.readFile(params.sheetPath)
    const sheetName = worksheet.getWorksheet(params.sheetName)
    const myObject = await readFromExcel(sheetName, params.searchText)

    const currentCell = sheetName.getCell(myObject.row, myObject.col + params.colOffset)
    currentCell.value = params.updatedText

    // for git commit, i am writing into new file
    await workbook.xlsx.writeFile(params.outputPath)
}

async function readFromExcel(sheetName, searchText) {
    let myObject = { row: -1, col: -1 }
    sheetName.eachRow((row) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                console.log(`${searchText} found in row ${row.number} & column ${colNumber}`)
                myObject.row = row.number
                myObject.col = colNumber
            }
        })
    })
    return myObject
}

writeToExcel({
    sheetPath: 'tests/utils/excelDemo_readWrite.xlsx',
    sheetName: 'Sheet1',
    searchText: 'Banana',
    updatedText: 799,
    colOffset: 2,
    outputPath: 'tests/utils/excelDemo_readWrite_updated.xlsx',
})
