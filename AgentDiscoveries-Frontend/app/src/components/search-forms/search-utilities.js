import { searchAPI } from "../crud"

export function getDateDaysAgo(daysAgo) {
    let date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date
}

export function getFormDate(date) {
    return date.toISOString().slice(0, 16);
}

export function getTransformedData(key, value) {
    var transformedData = value;
    if (key === "fromTime" || key === "toTime") {
        transformedData = transformedData.length > 0 && transformedData !== undefined ? `${transformedData}Z` : "";
    }
    return transformedData;
}

function getSearchParams(searchForm) {
    const searchParams = Object.keys(searchForm).map((key) => {
        return searchForm[key].value === "" ? "" : `${encodeURIComponent(key)}=${encodeURIComponent(getTransformedData(key, searchForm[key].value))}`;
    }).filter(el => el !== "" && el).join('&');
    return searchParams
}

export function getResultsAsynch(apiAddress, searchForm) {
    const searchParams = getSearchParams(searchForm);

    var response = searchAPI(apiAddress, searchParams)
        .then(response => {
            if (response.status === 200) {
                let results = response.json()
                return results;
            } else {
                throw "API server could not process the request";
            }
        })

    return response;
}

