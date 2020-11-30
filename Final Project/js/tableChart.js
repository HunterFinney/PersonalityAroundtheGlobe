class TableChart
{
    init()
    {
        this.tabulate(big5, ['name', 'Agr', 'N']);
    }
    AgrButton()
    {
        d3.select('#tableChartData2').remove();
        d3.select('#tableChartData').append("tbody").attr("id", "tableChartData2");
        this.tabulate(big5AgrR, ['name', 'Agr', 'N']);
        console.log(big5AgrR);
    }
    CsnButton()
    {
        d3.select('#tableChartData2').remove();
        d3.select('#tableChartData').append("tbody").attr("id", "tableChartData2");
        this.tabulate(big5Csn, ['name', 'Csn', 'N']);
        console.log(big5Csn);
    }
    ExtButton()
    {
        d3.select('#tableChartData2').remove();
        d3.select('#tableChartData').append("tbody").attr("id", "tableChartData2");
        this.tabulate(big5Ext, ['name', 'Ext', 'N']);
        console.log(big5Ext);
    }
    EstButton()
    {
        d3.select('#tableChartData2').remove();
        d3.select('#tableChartData').append("tbody").attr("id", "tableChartData2");
        this.tabulate(big5Est, ['name', 'Est', 'N']);
        console.log(big5Est);
    }
    IntButton()
    {
        d3.select('#tableChartData2').remove();
        d3.select('#tableChartData').append("tbody").attr("id", "tableChartData2");
        this.tabulate(big5Int, ['name', 'Int', 'N']);
        console.log(big5Int);
    }
    NameButton()
    {
        d3.select('#tableChartData2').remove();
        d3.select('#tableChartData').append("tbody").attr("id", "tableChartData2");
        this.tabulate(big5R, ['name', 'Agr', 'N']);
    }
    NButton()
    {
        d3.select('#tableChartData2').remove();
        d3.select('#tableChartData').append("tbody").attr("id", "tableChartData2");
        this.tabulate(big5N, ['name', 'Agr', 'N']);
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
        
        thead.append('tr')
          .selectAll('th')
          .data(columns).enter()
          .append('th')
          .text(function (column) { 
            if(column == "Agr") return ("Trusting, Helpful vs Suspicious, Antagonistic");
            if(column == "Csn") return "Careful, disciplined vs Impulsive, Disorganized";
            if(column == "Ext") return "Sociable, Outward vs Reserved, Thoughtful";
            if(column == "Est") return "Calm, Confident vs Anxious, Neurotic";
            if(column == "Int") return "Imaginative, Spontaneous vs Structured, Practical";
            if(column == "name") return "";
            if(column == "N") return "";
            return column; });
        // append the header row
        thead.append('tr')
          .selectAll('th')
          .data(columns).enter()
          .append('th')
          .append('button')
            // .attr("onclick", function (column){
            //     if(column == "Agr") return "AgrButton()";
            //     if(column == "Csn") return "CsnButton()";
            //     if(column == "Ext") return "ExtButton()";
            //     if(column == "Est") return "EstButton()";
            //     if(column == "Int") return "IntButton()";
            //     if(column == "name") return "NameButton()";
            //     if(column == "N") return "NButton()";
            // })
            .attr("id", function (column){
                if(column == "Agr") return "AgrButton";
                if(column == "Csn") return "CsnButton";
                if(column == "Ext") return "ExtButton";
                if(column == "Est") return "EstButton";
                if(column == "Int") return "IntButton";
                if(column == "name") return "NameButton";
                if(column == "N") return "NButton";
            })
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
    big5NR = [];
    
    for(let element of data) {
        big5.push(new Country(element.name,element.n,Math.round(+element.avgAgr*1000)/1000,Math.round(+element.avgCsn*1000)/1000,Math.round(+element.avgEst*1000)/1000,Math.round(+element.avgExt*1000)/1000,Math.round(+element.avgInt*1000)/1000));
    }
    big5R = big5.reverse();
    big5temp = big5;
    for( i = 0; i < big5temp.length-1; i++)
    {
        min_index = i;
        for(j = i +1; j < big5temp.length; j++)
        {
            if(Number(big5temp[j].N) > Number(big5temp[min_index].N))
            {
                min_index = j;
            }
            temp= big5temp[min_index];
            big5temp[min_index] = big5temp[i];
            big5temp[i] = temp;
        }

    }
    big5N = big5temp;
    big5NR = big5N.reverse();

    big5temp = big5;
    for( i = 0; i < big5temp.length-1; i++)
    {
        min_index = i;
        for(j = i +1; j < big5temp.length; j++)
        {
            if(Number(big5temp[j].Agr) > Number(big5temp[min_index].Agr))
            {
                min_index = j;
            }
            temp= big5temp[min_index];
            big5temp[min_index] = big5temp[i];
            big5temp[i] = temp;
        }
    }
    big5Agr = big5temp;
    big5AgrR = big5Agr.reverse();

    big5temp = big5;
    for( i = 0; i < big5temp.length-1; i++)
    {
        min_index = i;
        for(j = i +1; j < big5temp.length; j++)
        {
            if(Number(big5temp[j].Csn) > Number(big5temp[min_index].Csn))
            {
                min_index = j;
            }
            temp= big5temp[min_index];
            big5temp[min_index] = big5temp[i];
            big5temp[i] = temp;
        }
    }
    big5Csn = big5temp;
    big5CsnR = big5Csn.reverse();

    
    big5temp = big5;
    for( i = 0; i < big5temp.length-1; i++)
    {
        min_index = i;
        for(j = i +1; j < big5temp.length; j++)
        {
            if(Number(big5temp[j].Est) > Number(big5temp[min_index].Est))
            {
                min_index = j;
            }
            temp= big5temp[min_index];
            big5temp[min_index] = big5temp[i];
            big5temp[i] = temp;
        }
    }
    big5Est = big5temp;
    big5EstR = big5Est.reverse();

    big5temp = big5;
    for( i = 0; i < big5temp.length-1; i++)
    {
        min_index = i;
        for(j = i +1; j < big5temp.length; j++)
        {
            if(Number(big5temp[j].Ext) > Number(big5temp[min_index].Ext))
            {
                min_index = j;
            }
            temp= big5temp[min_index];
            big5temp[min_index] = big5temp[i];
            big5temp[i] = temp;
        }
    }
    big5Ext = big5temp;
    big5ExtR = big5Ext.reverse();

    big5temp = big5;
    for( i = 0; i < big5temp.length-1; i++)
    {
        min_index = i;
        for(j = i +1; j < big5temp.length; j++)
        {
            if(Number(big5temp[j].Int) > Number(big5temp[min_index].Int))
            {
                min_index = j;
            }
            temp= big5temp[min_index];
            big5temp[min_index] = big5temp[i];
            big5temp[i] = temp;
        }
    }
    big5Int = big5temp;
    big5IntR = big5Int.reverse();

    let tableChart = new TableChart();
    tableChart.init();
    
})
