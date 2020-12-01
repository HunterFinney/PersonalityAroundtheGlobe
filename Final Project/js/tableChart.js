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
        var min_index = 0;
        for(var i = 0; i < big5.length-1; i++)
        {
            min_index = i;
            for(var j = i +1; j < big5.length; j++)
            {
                if(Number(big5[j].Agr) < Number(big5[min_index].Agr))
                {
                     min_index = j;
                }
                var temp= big5[min_index];
                big5[min_index] = big5[i];
                big5[i] = temp;
            }
        }
        if(isAscend)
        {   
            isAscend = false;
            this.tabulate(big5, ['name', 'Agr', 'N']);
        }
        else
        {
            isAscend = true;
            big5.reverse();
            this.tabulate(big5, ['name', 'Agr', 'N']);
        }
    }
    CsnButton()
    {
        d3.select('#tableChartData2').remove();
        d3.select('#tableChartData').append("tbody").attr("id", "tableChartData2");
        var min_index = 0;
        for(var i = 0; i < big5.length-1; i++)
        {
            min_index = i;
            for(var j = i +1; j < big5.length; j++)
            {
                if(Number(big5[j].Csn) < Number(big5[min_index].Csn))
                {
                     min_index = j;
                }
                var temp= big5[min_index];
                big5[min_index] = big5[i];
                big5[i] = temp;
            }
        }
        if(isAscend)
        {   
            isAscend = false;
            this.tabulate(big5, ['name', 'Csn', 'N']);
        }
        else
        {
            isAscend = true;
            big5.reverse();
            this.tabulate(big5, ['name', 'Csn', 'N']);
        }
    }
    ExtButton()
    {
        d3.select('#tableChartData2').remove();
        d3.select('#tableChartData').append("tbody").attr("id", "tableChartData2");
        var min_index = 0;
        for(var i = 0; i < big5.length-1; i++)
        {
            min_index = i;
            for(var j = i +1; j < big5.length; j++)
            {
                if(Number(big5[j].Ext) < Number(big5[min_index].Ext))
                {
                     min_index = j;
                }
                var temp= big5[min_index];
                big5[min_index] = big5[i];
                big5[i] = temp;
            }
        }
        if(isAscend)
        {   
            isAscend = false;
            this.tabulate(big5, ['name', 'Ext', 'N']);
        }
        else
        {
            isAscend = true;
            big5.reverse();
            this.tabulate(big5, ['name', 'Ext', 'N']);
        }
    }
    EstButton()
    {
        d3.select('#tableChartData2').remove();
        d3.select('#tableChartData').append("tbody").attr("id", "tableChartData2");
        var min_index = 0;
        for(var i = 0; i < big5.length-1; i++)
        {
            min_index = i;
            for(var j = i +1; j < big5.length; j++)
            {
                if(Number(big5[j].Est) < Number(big5[min_index].Est))
                {
                     min_index = j;
                }
                var temp= big5[min_index];
                big5[min_index] = big5[i];
                big5[i] = temp;
            }
        }
        if(isAscend)
        {   
            isAscend = false;
            this.tabulate(big5, ['name', 'Est', 'N']);
        }
        else
        {
            isAscend = true;
            big5.reverse();
            this.tabulate(big5, ['name', 'Est', 'N']);
        }
    }
    IntButton()
    {
        d3.select('#tableChartData2').remove();
        d3.select('#tableChartData').append("tbody").attr("id", "tableChartData2");
        var min_index = 0;
        for(var i = 0; i < big5.length-1; i++)
        {
            min_index = i;
            for(var j = i +1; j < big5.length; j++)
            {
                if(Number(big5[j].Int) < Number(big5[min_index].Int))
                {
                     min_index = j;
                }
                var temp= big5[min_index];
                big5[min_index] = big5[i];
                big5[i] = temp;
            }
        }
        if(isAscend)
        {   
            isAscend = false;
            this.tabulate(big5, ['name', 'Int', 'N']);
        }
        else
        {
            isAscend = true;
            big5.reverse();
            this.tabulate(big5, ['name', 'Int', 'N']);
        }
    }
    NameButton()
    {
        d3.select('#tableChartData2').remove();
        d3.select('#tableChartData').append("tbody").attr("id", "tableChartData2");
        var min_index = 0;
        for(var i = 0; i < big5.length-1; i++)
        {
            min_index = i;
            for(var j = i +1; j < big5.length; j++)
            {
                if(big5[j].name < big5[min_index].name)
                {
                     min_index = j;
                }
                var temp= big5[min_index];
                big5[min_index] = big5[i];
                big5[i] = temp;
            }
        }
        if(isAscend)
        {   
            isAscend = false;
            switch (currentCategory) {
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
        else
        {
            isAscend = true;
            big5.reverse();
            switch (currentCategory) {
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
    }
    NButton()
    {
        d3.select('#tableChartData2').remove();
        d3.select('#tableChartData').append("tbody").attr("id", "tableChartData2");
        var min_index = 0;
        for(var i = 0; i < big5.length-1; i++)
        {
            min_index = i;
            for(var j = i +1; j < big5.length; j++)
            {
                if(Number(big5[j].N) < Number(big5[min_index].N))
                {
                     min_index = j;
                }
                var temp= big5[min_index];
                big5[min_index] = big5[i];
                big5[i] = temp;
            }
        }
        if(isAscend)
        {   
            isAscend = false;
            switch (currentCategory) {
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
        else
        {
            isAscend = true;
            big5.reverse();
            switch (currentCategory) {
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
    }

    changeMapCategory(newCategory) {
        isAscend = false;
        currentCategory = newCategory;
        d3.select('#tableChartData2').remove();
        d3.selectAll('#tableLabel').remove();
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
        
        d3.select('#tableLabel')
            .data(columns).enter()
            .append("div")
            .attr("id", 'tableLabel')
            .attr("class", 'tableLabel')
            .text(function (column) { 
            if(column == "Agr") return ("Lower\xa0\xa0\xa0--\xa0\xa0\xa0 Suspicious, Antagonistic vs Trusting, Helpful \xa0\xa0\xa0--\xa0\xa0\xa0 Higher");
            if(column == "Csn") return "Lower\xa0\xa0\xa0--\xa0\xa0\xa0 Impulsive, Disorganized vs Careful, disciplined \xa0\xa0\xa0--\xa0\xa0\xa0 Higher";
            if(column == "Ext") return "Lower\xa0\xa0\xa0--\xa0\xa0\xa0 Reserved, Thoughtful vs Sociable, Outward \xa0\xa0\xa0--\xa0\xa0\xa0 Higher";
            if(column == "Est") return "Lower\xa0\xa0\xa0--\xa0\xa0\xa0 Anxious, Neurotic vs Calm, Confident \xa0\xa0\xa0--\xa0\xa0\xa0 Higher";
            if(column == "Int") return "Lower\xa0\xa0\xa0--\xa0\xa0\xa0 Structured, Practical vs Imaginative, Spontaneous \xa0\xa0\xa0--\xa0\xa0\xa0 Higher";
            if(column == "name") return "";
            if(column == "N") return "";
            return column; });

        thead.append('tr')

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
        d3.select('#AgrButton').on('click', (e) => {
            this.AgrButton();
        })
        d3.select('#CsnButton').on('click', (e) => {
            this.CsnButton();
        })
        d3.select('#ExtButton').on('click', (e) => {
            this.ExtButton();
        })
        d3.select('#EstButton').on('click', (e) => {
            this.EstButton();
        })
        d3.select('#IntButton').on('click', (e) => {
            this.IntButton();
        })
        d3.select('#NameButton').on('click', (e) => {
            this.NameButton();
        })
        d3.select('#NButton').on('click', (e) => {
            this.NButton();
        })
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
    isAscend = false;
    big5 = [];
    big5Agr = [];
    big5Csn = [];
    big5Est = [];
    big5Ext = [];
    big5Int = [];
    big5N = [];
    big5NR = [];
    currentCategory = "agr";
    
    for(let element of data) {
        big5.push(new Country(element.name,element.n,Math.round(+element.avgAgr*1000)/1000,Math.round(+element.avgCsn*1000)/1000,Math.round(+element.avgEst*1000)/1000,Math.round(+element.avgExt*1000)/1000,Math.round(+element.avgInt*1000)/1000));
    }
    // big5temp = big5;
    // for( i = 0; i < big5temp.length-1; i++)
    // {
    //     min_index = i;
    //     for(j = i +1; j < big5temp.length; j++)
    //     {
    //         if(Number(big5temp[j].N) < Number(big5temp[min_index].N))
    //         {
    //             min_index = j;
    //         }
    //         temp= big5temp[min_index];
    //         big5temp[min_index] = big5temp[i];
    //         big5temp[i] = temp;
    //     }
    // }

    let tableChart = new TableChart();
    tableChart.init();
    
})
