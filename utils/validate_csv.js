const validateCsv = (data) => {
    return data.every(row => row['S.NO.'] && row['Product Name'] && row['Input Image Urls']);
}


module.exports = {validateCsv}
