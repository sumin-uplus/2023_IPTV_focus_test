// json 데이터 이용
const xlsx = require('xlsx');
const jsonData = [
    {name: 'kim', age: 23},
    {name: 'park', age: 24},
]

const workbook = xlsx.utils.book_new();
const worksheet = xlsx.utils.json_to_sheet(jsonData);

xlsx.utils.book_append_sheet(workbook, worksheet, 'sheet1');
xlsx.writeFile(workbook, 'json_to_sheet_result.xlsx');