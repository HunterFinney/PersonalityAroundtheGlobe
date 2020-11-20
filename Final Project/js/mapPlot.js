
/**
 * Object to hold the necessary GeoJson data combined with the big5 data on each country
 */
class CountryData {
    constructor(type, id, properties, geometry, avgAgr, avgCsn, avgEst, avgExt, avgInt, medAgr, medCsn, medEst, medExt, medInt, name, n) {
        this.type = type;
        this.id = id;
        this.properties = properties;
        this.geometry = geometry;
        this.avgAgr = avgAgr;
        this.avgCsn = avgCsn;
        this.avgEst = avgEst;
        this.avgExt = avgExt;
        this.avgInt = avgInt;
        this.medAgr = medAgr;
        this.medCsn = medCsn;
        this.medEst = medEst;
        this.medExt = medExt;
        this.medInt = medInt;
        this.name = name;
        this.n = n;

    }
}

class MapPlot {
    /**
     * Builds the necessary color scales needed for the map
     * 
     * @param {*} big5Data 
     */
    constructor(big5Data, countryClickHandler) {
        this.big5Data = big5Data;
        this.agrScale = d3.scaleQuantile(d3.schemeReds[5])
            .domain(d3.extent(big5Data.map(d => d.avgAgr)));
        this.csnScale = d3.scaleQuantile(d3.schemePurples[5])
            .domain(d3.extent(big5Data.map(d => d.avgCsn)));
        this.extScale = d3.scaleQuantile(d3.schemeOranges[5])
            .domain(d3.extent(big5Data.map(d => d.avgExt)));
        this.estScale = d3.scaleQuantile(d3.schemeBlues[5])
            .domain(d3.extent(big5Data.map(d => d.avgEst)));
        this.intScale = d3.scaleQuantile(d3.schemeGreens[5])
            .domain(d3.extent(big5Data.map(d => d.avgInt)));

        this.noDataColor = "#afafaf";

        this.countryClickHandler = countryClickHandler;
    }

    /**
     * Returns a CountryData object from a regular GeoJson object so it can include all of the big5 data
     * 
     * @param {GeoJsonFeature} data GeoJson feature object to get type, id, properties, and geometry from
     */
    generateCountryData(data) {
        let big5Entry = big5Data.filter(d => d.Code === data.id)[0];

        if (big5Entry === undefined) {
            return new CountryData(
                data.type,
                data.id,
                data.properties,
                data.geometry
            );
        }

        return new CountryData(
            data.type,
            data.id,
            data.properties,
            data.geometry,
            big5Entry.avgAgr,
            big5Entry.avgEst,
            big5Entry.avgEst,
            big5Entry.avgExt,
            big5Entry.avgInt,
            big5Entry.medAgr,
            big5Entry.medCsn,
            big5Entry.medEst,
            big5Entry.medExt,
            big5Entry.medInt,
            big5Entry.Name,
            big5Entry.n
        );
    }

    /**
     * Builds the initial map and sets its category to agr
     * 
     * @param {TopoJson} worldData Data for each country on the map
     */
    drawMap(worldData) {
        let path = d3.geoPath().projection(d3.geoWinkel3().scale(140).translate([365, 225]));

        let geoJson = topojson.feature(worldData, worldData.objects.countries);
        

        let countryData = geoJson.features.map(
            d => this.generateCountryData(d)
        );

        let svg = d3.select("#map-chart").append("svg");

        d3.select("#map-chart").select("svg").selectAll("path")
            .data(countryData)
            .join("path")
            .attr("d", path)
            .attr("id", (d) => d.id)
            .on('click', (d) => {
                this.countryClickHandler(d, d3.event.layerX, d3.event.layerY);
            });
        
        d3.select("#tableChart").append("tr")
            .data(countryData)
            .attr("d", countryData)
            .attr("id", (d) => d.id)
            ;
        this.changeMapCategory('agr');
    }

    /**
     * Switches the map to show data for a different category
     * 
     * @param {string} newCategory three letter category code
     */

    changeMapCategory(newCategory) {
        let countrySelection = d3.select('#map-chart').select('svg').selectAll('path');

        switch (newCategory) {
            case 'agr':
                countrySelection.attr('fill', (d) => {
                    let color = this.agrScale(d.avgAgr);
                    if (color === undefined) {
                        color = this.noDataColor;
                    }
                    return color;
                });
                return;
            case 'csn':
                countrySelection.attr('fill', (d) => {
                    let color = this.csnScale(d.avgCsn);
                    if (color === undefined) {
                        color = this.noDataColor;
                    }
                    return color;
                });
                return;
            case 'ext':
                countrySelection.attr('fill', (d) => {
                    let color = this.extScale(d.avgExt);
                    if (color === undefined) {
                        color = this.noDataColor;
                    }
                    return color;
                });
                return;
            case 'est':
                countrySelection.attr('fill', (d) => {
                    let color = this.estScale(d.avgEst);
                    if (color === undefined) {
                        color = this.noDataColor;
                    }
                    return color;
                });
                return;
            case 'int':
                countrySelection.attr('fill', (d) => {
                    let color = this.intScale(d.avgInt);
                    if (color === undefined) {
                        color = this.noDataColor;
                    }
                    return color;
                });
                return;
        }
    }
}