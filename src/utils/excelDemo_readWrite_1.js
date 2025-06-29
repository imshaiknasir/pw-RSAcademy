import ExcelJS from 'exceljs'

/**
 * Read and Write to excel file
 * Update the value of "Apple" to "updated_Apple"
 */
async function readExcel() {
    let myObject = { row: -1, col: -1 }
    const workbook = new ExcelJS.Workbook()
    const worksheet = await workbook.xlsx.readFile('tests/utils/excelDemo_readWrite.xlsx')
    const sheetName = worksheet.getWorksheet('Sheet1')

    sheetName.eachRow((row) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === 'Apple') {
                console.log(`Apple found in row ${row.number} & column ${colNumber}`)
                // cell.value = "Orange";
                myObject.row = row.number
                myObject.col = colNumber
            }
        })
    })

    const currentCell = sheetName.getCell(myObject.row, myObject.col)
    currentCell.value = 'updated_Apple'

    // for git commit, i am writing into new file
    await workbook.xlsx.writeFile('tests/utils/excelDemo_readWrite_updated.xlsx')
}

readExcel()
