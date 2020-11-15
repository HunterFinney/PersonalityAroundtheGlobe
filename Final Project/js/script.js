var converter;
var big5Data;
loadFile('data/countryCodeConversions.csv').then(data => {
    converter = data;
});
loadFile('data/CountryBig5.csv').then(data => {
    big5Data = data;
    let mapPlot = new MapPlot(big5Data);
    d3.json('data/world.json').then(mapData => {
        cleanCountryCodes(mapData);
        mapPlot.drawMap(mapData);

        d3.select('#mapCategorySelection').on('change', (e) => {
            mapPlot.changeMapCategory(d3.event.target.value);
        })
    });
});


/**
 * Countries in the world json data use 3 digit codes while countries in the big 5
 * dataset use 2 digit codes. This function uses a csv file matching 3 digit codes to
 * 2 digits codes and updates the codes in the world json file
 * @param {} mapData 
 */
function cleanCountryCodes(mapData) {
    mapData.objects.countries.geometries.forEach(d => {
        d.id = convert3DigitCountryCode(d.id);
    });
}



/**
 * Returns a 2 digit country code given a 3 digit code
 * 
 * If it does not exist in the converter then returns the original 3 digit code
 * 
 * @param {string} code 3 digit country code
 */
function convert3DigitCountryCode(code) {
    let entry = converter.filter(d => {
        return d["Alpha-3 code"] === code;
    });
    if (entry.length === 0) {
        return code;
    } else {
        return entry[0]["Alpha-2 code"];
    }
}


async function loadFile(file) {
    let data = await d3.csv(file).then(d => {
        let mapped = d.map(g => {
            for (let key in g) {
                let numKey = +key;
                if (numKey) {
                    g[key] = +g[key];
                }
            }
            return g;
        });
        return mapped;
    });
    return data;
}

