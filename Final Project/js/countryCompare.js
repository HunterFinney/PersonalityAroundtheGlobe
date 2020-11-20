class CountryCompare {
    constructor(distanceData) {
        this.compareWrapper = d3.select('#country-compare');
        this.compareHeader = d3.select('#compare-header');
        this.compareHeaderTitle = d3.select('#compare-header-title');
        this.agrDisplay = d3.select('#compare-agr');
        this.extDisplay = d3.select('#compare-ext');
        this.csnDisplay = d3.select('#compare-csn');
        this.estDisplay = d3.select('#compare-est');
        this.intDisplay = d3.select('#compare-int');
        this.responsesDisplay = d3.select('#compare-responses');

        this.compareBody = d3.select('#compare-body');
        this.compareSimilar = d3.select('#compare-similar');
        this.compareDifferent = d3.select('#compare-different');
        
        this.distanceData = distanceData;

        this.compareClose = d3.select('#compare-close');
        this.compareClose.on('click', (d) => {
            this.clearCountry();
        })
    }

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


        countryDistanceData.sort((a,b) => {
            return a.Dist - b.Dist ;
        });

        //After the data is sorted by distance, the first 10 entries will be the most similar
        //and the last 10 will be the most dissimilar
        let similarCountries = countryDistanceData.slice(0,10);
        let differentCountries = countryDistanceData.slice(-10);

        this.compareSimilar.selectAll('p').data(similarCountries).enter()
            .append('p');
        this.compareSimilar.exit()
            .remove();
        this.compareDifferent.selectAll('p').data(differentCountries).enter()
            .append('p');
        this.compareDifferent.exit()
            .remove();
            
            
        this.compareSimilar.selectAll('p')
            .text(d => d.Country2);
        this.compareDifferent.selectAll('p')
            .text(d => d.Country2);
    }

    clearCountry() {
        this.compareWrapper.style('left', '-1000px');
        this.compareWrapper.classed('compare-hidden', true);
    }
}