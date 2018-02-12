function getDateDaysAgo(daysAgo) {
    let date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date
}

function getFormDate(date) {
    return date.toISOString().slice(0, 16);
}

function getTransformedData(key, value) {
    var transformedData = value;
    switch (key) {
        case "fromTime":
        case "toTime":
            transformedData = transformedData.length > 0 && transformedData !== undefined ? transformedData + "Z" : "";

    }
    return transformedData;
}

export {
    getDateDaysAgo,
    getFormDate,
    getTransformedData
}