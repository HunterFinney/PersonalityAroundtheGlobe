class TableChart
{
    init()
    {
        this.tabulate(big5, ['name', 'Agr', 'N']);
    }

    changeMapCategory(newCategory) {
        d3.select('#tableChartData2').remove();
        d3.select('#tableChartData').append("tbody").attr("id", "tableChartData2");
        switch (newCategory) {
            case 'agr':
                this.tabulate(big5, ['name', 'Agr', 'N']);
                return;
            case 'csn':
                this.tabulate(big5, ['name', 'Csn', 'N']);
                return;
            case 'ext':
                this.tabulate(big5, ['name', 'Ext', 'N']);
                return;
            case 'est':
                this.tabulate(big5, ['name', 'Est', 'N']);
                return;
            case 'int':
                this.tabulate(big5, ['name', 'Int', 'N']);
                return;
        }
    }

    tabulate(data, columns) {
        var table = d3.select('#tableChartData2').append('table')
        var thead = table.append('thead')
        var	tbody = table.append('tbody');
    
        // append the header row
        thead.append('tr')
          .selectAll('th')
          .data(columns).enter()
          .append('th')
            .text(function (column) { 
                if(column == "Agr") return "Agreeableness";
                if(column == "Csn") return "Conscientiousness";
                if(column == "Ext") return "Extraversion";
                if(column == "Est") return "Emotional Stability";
                if(column == "Int") return "Intellect";
                if(column == "name") return "Country Name";
                if(column == "N") return "Number of Responses";
                return column; });
    
        // create a row for each object in the data
        var rows = tbody.selectAll('tr')
        /*  .data(function (data) { 
            if(!isNaN(data)) return "Agreeableness";
            return data; })*/
          .data(data)
          .enter()
          .append('tr');
    
        // create a cell in each row for each column
        var cells = rows.selectAll('td')
          .data(function (row) {
            return columns.map(function (column) {
              return {column: column, value: row[column]};
            });
          })
          .enter()
          .append('td')
            .text(function (d) { 
                if(!isNaN(d.value)) return Math.round(+d.value*1000)/1000;
                return d.value; });
    
      return table;
    }
}


d3.csv("data/Country_Region.csv").then(data => {
    
    function Country(name,n,agr,csn,est,ext,int){
        this.name = name;
        this.N = n;
        this.Agr = Math.round(+agr*1000)/1000;
        this.Csn = Math.round(+csn*1000)/1000;
        this.Est = Math.round(+est*1000)/1000;
        this.Ext = Math.round(+ext*1000)/1000;
        this.Int = Math.round(+int*1000)/1000;
    };
    
    big5 = [];
    big5Agr = [];
    big5Csn = [];
    big5Est = [];
    big5Ext = [];
    big5Int = [];
    big5N = [];
    
    for(let element of data) {
        big5.push(new Country(element.name,element.n,Math.round(+element.avgAgr*1000)/1000,Math.round(+element.avgCsn*1000)/1000,Math.round(+element.avgEst*1000)/1000,Math.round(+element.avgExt*1000)/1000,Math.round(+element.avgInt*1000)/1000));
    }
    let tableChart = new TableChart();
    tableChart.init();
    
})
