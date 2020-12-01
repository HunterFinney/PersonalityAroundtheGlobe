BAR_CHART_MIN_HEIGHT = 5;
BAR_CHART_MAX_HEIGHT = 40;


class CountryCompare {
    constructor(distanceData, globalData, mapRef) {
        this.compareWrapper = d3.select('#country-compare');
        this.compareHeader = d3.select('#compare-header');
        this.compareHeaderTitle = d3.select('#compare-header-title');
        this.agrDisplay = d3.select('#compare-agr');
        this.extDisplay = d3.select('#compare-ext');
        this.csnDisplay = d3.select('#compare-csn');
        this.estDisplay = d3.select('#compare-est');
        this.intDisplay = d3.select('#compare-int');
        this.responsesDisplay = d3.select('#compare-responses');
        this.headerSvg = d3.select('#compare-header-svg');

        this.compareBody = d3.select('#compare-body');
        this.compareSimilar = d3.select('#compare-similar');
        this.compareDifferent = d3.select('#compare-different');
        
        this.distanceData = distanceData;

        this.compareClose = d3.select('#compare-close');
        this.compareClose.on('click', (d) => {
            this.clearCountry();
        });

        this.globalData = globalData;
        this.mapRef = mapRef;
        this.extents = null;
    }

    /**
     * Fills in the necessary data for the country comparison view
     * 
     * @param {object} countryData Data object containing 2 countries and their distance
     * @param {*} x Click location to determine where to draw comparison view
     * @param {*} y Click location to determine where to draw comparison view
     */
    showCountry(countryData, x, y) {
        let countryName = countryData.name;
        let countryDistanceData = this.distanceData
            .filter( d => 
                d.Country1 === countryName || d.Country2 === countryName
            );

        //The country distance data only has 1 entry for each country pair rather than 2
        //So for entries where the desired country is set as Country2 the countries must be swapped
        countryDistanceData = countryDistanceData.map( d => {
            if (d.Country1 !== countryName) {
                let temp = d.Country1;
                d.Country1 = d.Country2;
                d.Country2 = temp;
            }
            return d;
        });

        this.compareWrapper.classed('compare-hidden', false);
        this.compareWrapper.style('left', (x - 200) + 'px');
        this.compareWrapper.style('top', (y) + 'px');
        this.compareHeaderTitle.text(countryName);
        this.agrDisplay.text('Agreeableness: ' + parseFloat(countryData.avgAgr).toFixed(3));
        this.extDisplay.text('Extraversion: ' + parseFloat(countryData.avgExt).toFixed(3));
        this.estDisplay.text('Emotional Stability: ' + parseFloat(countryData.avgEst).toFixed(3));
        this.intDisplay.text('Intelligence: ' + parseFloat(countryData.avgInt).toFixed(3));
        this.csnDisplay.text('Conscientiousness: ' + parseFloat(countryData.avgCsn).toFixed(3));
        this.responsesDisplay.text('Number of Responses: ' + countryData.n);
        let country1 = this.globalData.find(obj => {
            return obj.Name === countryName
        });
        let country1Data = [
            country1.avgAgr, 
            country1.avgExt, 
            country1.avgCsn, 
            country1.avgEst,
            country1.avgInt
        ]
        this.drawMiniBarChart(this.headerSvg, country1Data);

        countryDistanceData.sort((a,b) => {
            return a.Dist - b.Dist ;
        });

        //After the data is sorted by distance, the first 10 entries will be the most similar
        //and the last 10 will be the most dissimilar
        let similarCountries = countryDistanceData.slice(0,5);
        let differentCountries = countryDistanceData.slice(-5);

        //Adds data from big5 data set
        //Order is compliant with requirements to draw bar chart
        similarCountries.forEach((d) => {
            let country = this.globalData.find(obj => {
                return obj.Name === d.Country2;
            });

            d.Country2Data = [
                country.avgAgr, 
                country.avgExt, 
                country.avgCsn, 
                country.avgEst,
                country.avgInt
            ];
        });

        console.log(similarCountries);

        //Adds data from big5 data set
        //Order is compliant with requirements to draw bar chart
        differentCountries.forEach((d) => {
            let country = this.globalData.find(obj => {
                return obj.Name === d.Country2;
            });

            d.Country2Data = [
                country.avgAgr, 
                country.avgExt, 
                country.avgCsn, 
                country.avgEst,
                country.avgInt
            ];
        });

        //Selects necessary elements and adds data to them
        let similarSelection = this.compareSimilar.selectAll('div');

        //If svg and p elements have not been added yet, they need to be added here
        //This prevents duplicate svgs being added
        if (similarSelection.empty()) {
            let newSelection = this.compareSimilar.selectAll('div').data(similarCountries).enter()
                .append('div')
                    .classed('compare-entry', true);
            newSelection.append('p');
            newSelection.append('svg')
                .attr('height', '50px')
                .attr('width', '75px');
        } else {
            console.log(similarCountries);
            this.compareSimilar.selectAll('p').data(similarCountries);
            this.compareSimilar.selectAll('svg').data(similarCountries);
        }
        this.compareSimilar.exit()
            .remove();
        let differentSelection = this.compareDifferent.selectAll('div');
        if (differentSelection.empty()) {
            let newSelection = this.compareDifferent.selectAll('div').data(differentCountries).enter()
            .append('div')
                .classed('compare-entry', true);
            newSelection.append('p');
            newSelection.append('svg')
                .attr('height', '50px')
                .attr('width', '75px');
        } else {
            this.compareDifferent.selectAll('p').data(differentCountries);
            this.compareDifferent.selectAll('svg').data(differentCountries);
        }
        this.compareDifferent.exit()
            .remove();
            
        //Apply country name text to p elements
        this.compareSimilar.selectAll('p')
            .text(d => d.Country2);
        this.compareDifferent.selectAll('p')
            .text(d => d.Country2);

        //Draw bar charts for each comparison entry
        this.compareSimilar.selectAll('svg')
            .each((d,i,j) => {
                console.log(d);
                this.drawMiniBarChart(d3.select(j[i]), d.Country2Data);
                
            });
        this.compareDifferent.selectAll('svg')
            .each((d,i,j) => {
                this.drawMiniBarChart(d3.select(j[i]), d.Country2Data);
                
            });
    }

    /**
     * Hides the country comparison from view
     */
    clearCountry() {
        this.compareWrapper.style('left', '-1000px');
        this.compareWrapper.classed('compare-hidden', true);
    }

    /**
     * Given an svg element and a big5 data array, draws the 5 rectangles
     * 
     * Data should be in order: 
     *  agr, ext, csn, est, int
     * @param {d3 selection} svg svg element to draw rectangles on
     * @param {*} d big 5 datapoints to draw
     */
    drawMiniBarChart(svg, d) {
        if (this.extents === null) {
            this.getExtents()
        }
        svg.selectAll('rect').data(d).enter()
            .append('rect');

        this.scaleMiniHeight = d3.scaleLinear()
            .domain([1,5])
            .range([5,20]);

        svg.selectAll('rect')
            .attr('fill', (d,i) => {
                switch (i) {
                    case 0:
                        return d3.schemeReds[5][2];
                    case 1:
                        return d3.schemeOranges[5][2];
                    case 2:
                        return d3.schemePurples[5][2];
                    case 3:
                        return d3.schemeBlues[5][2];
                    case 4:
                        return d3.schemeGreens[5][2];
                }
            })
            .attr('height', (d, i) => this.scales[i](d))
            .attr('width', '15')
            .attr('y', (d, i) => 50 - this.scales[i](d))
            .attr('x', (d,i) => i*15);
        
    }

    /**
     * Gets the extreme values for the data points to correctly 
     * size the scales
     */
    getExtents() {
        this.extents = this.mapRef.getExtents();
        this.scales = Array();
        let parent = this;

        let i = 0;
        for (var key in this.extents) {
            this.scales[i] = d3.scaleLinear()
                .domain(this.extents[key])
                .range([BAR_CHART_MIN_HEIGHT, BAR_CHART_MAX_HEIGHT]);
            i++;
            
        }
    }
}