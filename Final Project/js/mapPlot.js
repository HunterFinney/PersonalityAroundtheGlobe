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

KEY_STEP_WIDTH = 50;
KEY_LEFT_MARGIN = 50;

class MapPlot {

    
    /**
     * Builds the necessary color scales needed for the map
     * 
     * @param {*} big5Data 
     */
    constructor(big5Data, countryClickHandler) {
        this.big5Data = big5Data;

        this.mapKey = d3.select('#map-key');
        this.mapKey.append('g')
            .attr('transform', 'translate(' + KEY_LEFT_MARGIN + ',25)');
        this.leftKeyText = this.mapKey.append('text')
            .attr('id', 'map-key-less')
            .attr('x', KEY_LEFT_MARGIN / 2)
            .attr('y', 15);
        this.rightKeyText = this.mapKey.append('text')
            .attr('id', 'map-key-more')
            .attr('x', (KEY_STEP_WIDTH * 5) + KEY_LEFT_MARGIN / 2)
            .attr('y', 15);

        //Extents will be needed for setting the color key later
        this.extents = Array();
        this.scales = Array();
        
        this.extents['agr'] = d3.extent(big5Data.map(d => d.avgAgr));
        this.scales['agr'] = d3.scaleQuantile(d3.schemeReds[5])
            .domain(d3.extent(big5Data.map(d => d.avgAgr)));

        this.extents['ext'] = d3.extent(big5Data.map(d => d.avgExt));
        this.scales['ext'] = d3.scaleQuantile(d3.schemeOranges[5])
            .domain(d3.extent(big5Data.map(d => d.avgExt)));
        
        this.extents['csn'] = d3.extent(big5Data.map(d => d.avgCsn));
        this.scales['csn'] = d3.scaleQuantile(d3.schemePurples[5])
            .domain(d3.extent(big5Data.map(d => d.avgCsn)));

        this.extents['est'] = d3.extent(big5Data.map(d => d.avgEst));
        this.scales['est'] = d3.scaleQuantile(d3.schemeBlues[5])
            .domain(d3.extent(big5Data.map(d => d.avgEst)));

        this.extents['int'] = d3.extent(big5Data.map(d => d.avgInt));
        this.scales['int'] = d3.scaleQuantile(d3.schemeGreens[5])
            .domain(d3.extent(big5Data.map(d => d.avgInt)));

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
                if (d.avgAgr === undefined ||
                    d.avgCsn === undefined ||
                    d.avgEst === undefined ||
                    d.avgExt === undefined ||
                    d.avgInt === undefined ) {
                        return;
                    }
                this.clearHighlight();
                d3.select(d3.event.target).attr('stroke', '#121212');
                d3.select(d3.event.target).attr('stroke-width', '2');
                this.countryClickHandler(d, d3.event.layerX, d3.event.layerY);
            })
            .on('mouseover', (d) => {
                d3.select(d3.event.target).attr('stroke', '#1f1f1f');
                d3.select(d3.event.target).attr('stroke-width', '1');
            })
            .on('mouseout', (d) => {
                this.clearHighlight();
            });
        
        d3.select("#tableChart").append("tr")
            .data(countryData)
            .attr("d", countryData)
            .attr("id", (d) => d.id)
            ;
        this.changeMapCategory('agr');
    }

    clearHighlight() {
        d3.select('#map-chart').select('svg').selectAll('path')
            .attr('stroke-width', '0');
    }

    /**
     * Switches the map's key to use the newly selected category
     * 
     * @param {string} newCategory three letter category code
     */
    setKey(newCategory) {
        let extents = this.extents[newCategory];
        let step = (extents[1] - extents[0]) / 5;
        let data = d3.range(extents[0], extents[1], step);

        
        let scale;
        let displayCategory = "";
        switch (newCategory) {
            case 'agr':
                scale = this.agrScale;
                displayCategory = "Agreeable";
                break;
            case 'ext':
                scale = this.extScale;
                displayCategory = "Extroverted";
                break;
            case 'est': 
                scale = this.estScale;
                displayCategory = "Emotionally Stable";
                break;
            case 'csn':
                scale = this.csnScale;
                displayCategory = "Conscientious";
                break;
            case 'int':
                scale = this.intScale;
                displayCategory = "Intelligent";
                break;
        }

        let rectSelection = this.mapKey.select('g')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect');
        rectSelection
            .attr('x', (d,i) => KEY_STEP_WIDTH * i)
            .attr('y', 0)
            .attr('height', 10)
            .attr('width', KEY_STEP_WIDTH)
            .attr('fill', (d) => scale(d));
        this.mapKey.select('g').selectAll('rect')
            .attr('fill', (d) => scale(d));
        

        this.leftKeyText.text('Less ' + displayCategory);
        this.rightKeyText.text('More ' + displayCategory);
    }

    /**
     * Switches the map to show data for a different category
     * 
     * @param {string} newCategory three letter category code
     */
    changeMapCategory(newCategory) {
        let countrySelection = d3.select('#map-chart').select('svg').selectAll('path');
        this.setKey(newCategory);
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

    getExtents() {
        return this.extents;
    }
}