class TableChart
{
    init()
    {
        this.tabulate(big5, ['name', 'Agr']);
    }

    changeMapCategory(newCategory) {
        d3.select('#tableChartData2').remove();
        d3.select('#tableChartData').append("tbody").attr("id", "tableChartData2");
        switch (newCategory) {
            case 'agr':
                this.tabulate(big5, ['name', 'Agr']);
                return;
            case 'csn':
                this.tabulate(big5, ['name', 'Csn']);
                return;
            case 'ext':
                this.tabulate(big5, ['name', 'Ext']);
                return;
            case 'est':
                this.tabulate(big5, ['name', 'Est']);
                return;
            case 'int':
                this.tabulate(big5, ['name', 'Int']);
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
            .text(function (column) { return column; });
    
        // create a row for each object in the data
        var rows = tbody.selectAll('tr')
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
            .text(function (d) { return d.value; });
    
      return table;
    }
}


d3.csv("data/CountryBig5.csv").then(data => {
    
    function Country(name,n,agr,csn,est,ext,int){
        this.name = name;
        this.N = n;
        this.Agr = agr;
        this.Csn = csn;
        this.Est = est;
        this.Ext = ext;
        this.Int = int;
    };
    
    big5 = [];
    for(let element of data) {
        big5.push(new Country(element.Name,element.n,element.avgAgr,element.avgCsn,element.avgEst,element.avgExt,element.avgInt));
    }
    let tableChart = new TableChart();
    tableChart.init();
    
})
