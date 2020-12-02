d3.csv("data/Country_Region.csv").then(data => {
    //console.log(data);
    
    let pcSVG = d3.select("#pcDiv").append("svg")
        .attr("id","pcSVG")
        .attr("width",850)
        .attr("height",600);
    
    function Country(name,n,agr,csn,est,ext,int,region,subregion){
        this.name = name;
        this.N = n;
        this.Agr = agr;
        this.Csn = csn;
        this.Est = est;
        this.Ext = ext;
        this.Int = int;
        this.region = region;
        this.subregion = subregion;
    };
    
    big5 = [];
    for(let element of data) {
        big5.push(new Country(element.name,element.n,element.avgAgr,element.avgCsn,element.avgEst
            ,element.avgExt,element.avgInt,element.region,element.subregion));
    }
    //console.log(big5);

    let dimensions = d3.keys(big5[0]).filter(d => d == 'Agr' || d== 'Csn' || d == 'Est' || d== 'Ext' || d== 'Int');
    console.log(dimensions);
    //d!="name" && d!="N"

    let y = {};
    //console.log(d3.max(big5, d => +d[dimensions[0]]))
    for (let dim of dimensions) {
      //dname = dimensions[dim];
      //console.log(maxD);
      y[dim] = d3.scaleLinear()
        .domain([d3.max(big5, d => +d[dim]),d3.min(big5, d => +d[dim])])
        .range([0,550]);
    } 
    //console.log(y);

    let regOrdScale = d3.scaleOrdinal().domain(['','Africa','Americas','Asia','Europe','Oceania'])
	.range(['grey', 'purple', 'red','green','yellow','blue']);

    let xDiscrete = d3.scalePoint()
    .range([0, 1000])
    .padding(1)
    .domain(dimensions);

    const downShift = 35;
    // Add and store a brush for each axis.
    const agrBG = pcSVG.append('g').attr('transform', "translate(" + (xDiscrete(dimensions[0])-15) + ",0)").attr("id","Agr").classed('gbrushes', true)
    const csnBG = pcSVG.append('g').attr('transform', "translate(" + (xDiscrete(dimensions[1])-15) + ",0)").attr("id","Csn").classed('gbrushes', true)
    const estBG = pcSVG.append('g').attr('transform', "translate(" + (xDiscrete(dimensions[2])-15) + ",0)").attr("id","Est").classed('gbrushes', true)
    const extBG = pcSVG.append('g').attr('transform', "translate(" + (xDiscrete(dimensions[3])-15) + ",0)").attr("id","Ext").classed('gbrushes', true)
    const intBG = pcSVG.append('g').attr('transform', "translate(" + (xDiscrete(dimensions[4])-15) + ",0)").attr("id","Int").classed('gbrushes', true)

    const brushGroups = d3.selectAll('.gbrushes');
    //brushGroups.attr("class","no-display");

    let activeBrush = null;
    let activeBrushNode = null; 
    
    brushGroups.each(function(){
        const selectionThis = this;
        const selection = d3.select(selectionThis);
            const brush = d3.brushY().extent([[0,downShift], [30, 600]])
                      //Start of the brush
                      .on('start', function() {
                        if (activeBrush && selection !== activeBrushNode) {
                          activeBrushNode.call(activeBrush.move, null);
                        }
                        activeBrush = brush;
                        activeBrushNode = selection;                   
                      })
                      .on("brush", function () {
                        let gid = activeBrushNode.attr("id");
                        //console.log(gid);
                        const brushSelection = d3.brushSelection(selectionThis);
                        if (!brushSelection) return;
                        const selectedIndices = [];
                        if (brushSelection) {
                            //console.log(selection);
                            const [y1,y2] = brushSelection;
                            //console.log(y[gid].invert(y2-downShift)); 
                            big5.forEach((d, i) => {  
                                //console.log(+d[gid][0]);
                                //console.log(+d[gid][0] >= y[gid].invert(y1-downShift));
                                if (
                                    +d[gid] <= y[gid].invert(y1-downShift) &&
                                    +d[gid] >= y[gid].invert(y2-downShift)
                                ) {
                                    selectedIndices.push(i);
                                    //console.log(selectedIndices);
                                }
                            });
                        }
                        paths.classed("brushed",false);
                        //console.log(selectedIndices)
                        if (selectedIndices.length > 0) {
                            let subDat = big5
                                .filter((_, i) => {
                                    return selectedIndices.includes(i);
                                })
                                paths.filter((_, i) => {
                                    return selectedIndices.includes(i);
                                }).classed("brushed",true);
                                //console.log(subDat)
                                drawTable(subDat);
                                
                        }
                    })                           
                      //End of brush
                      .on("end",function(){
                        const brushSelection = d3.brushSelection(selectionThis);
                      })
            
            selection.call(brush)
        }) 
    
    function path(d) {
        return d3.line()(dimensions.map(function(p) { return [xDiscrete(p), y[p](+d[p])+downShift]; }));
    }
    //console.log(big5[0])
    //console.log(dimensions.map(function(p) { return y[p](big5[0][p]); }));
    
    let pathG = pcSVG.append("g");
    let paths = pathG
        .selectAll("path")
        .data(big5)
        .join("path")
        .attr("d", path)
        .attr("class","pcLine")
        .style("stroke",d => regOrdScale(d.region));
        //.on("mouseover", highlight)
        //.on("mouseleave", doNotHighlight );
    /*
    .style("fill", "none")
    .style("stroke", )
    .style("opacity", 0.4)
    */


// For each dimension of the dataset I add a 'g' element:
    // Draw the axis:
  pcSVG.selectAll("Axes")
  // For each dimension of the dataset I add a 'g' element:
  .data(dimensions)
  .join("g")
  // I translate this element to its right position on the x axis
  .attr("transform",d => "translate(" + xDiscrete(d) + ","+downShift+")")
    // function(d) { return "translate(" + xDiscrete(d) + ",35)"; }
  .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); } )
  //
  // Add axis title
  .append("text")
    .attr("class","AxisHead")
    .attr("y", -10)
    .text(d => d);
//  .style("text-anchor", "middle") function(d) { return d; }

    
    pcSVG.on("click",function(){
        paths.classed("brushed",false);
        drawTable(big5);
        })
    
    let drawTable = function(tableData){
    let rowSelect = d3.select('#dataTableBody')
        .selectAll('tr')
        .data(tableData)
        .join('tr');
    //console.log(rowSelect)
    let cellSelect = rowSelect.selectAll("td")
    .data(d => [d.name,d.region,d.N,Math.round(+d.Agr*1000)/1000,Math.round(+d.Csn*1000)/1000,Math.round(+d.Est*1000)/1000,Math.round(+d.Ext*1000)/1000,Math.round(+d.Int*1000)/1000])
    .join("td");
    cellSelect.text(d => d);
    }
    //big5.sort(hAscend('name'));
    drawTable(big5);

   
    // Add sorting
    let hAscend = function(colName){
        return (a,b) => {
            //console.log(typeof(a[colName]))
            if(colName == "name") {
                a = a[colName];
                b = b[colName];
            } else {
                a = +a[colName];
                b = +b[colName];
            }
            if ( a > b )
            {
              return 1;
            }
            else if (a < b ) {
              return -1;
            }
            return 0;
        }
    }

    let hDescend = function(colName){
        return (a,b) => {
            //console.log(typeof(a[colName]))
            if(colName == "name") {
                a = a[colName];
                b = b[colName];
           } else {
                a = +a[colName];
                b = +b[colName];
            }
            if ( a > b )
            {
            return -1;
            }
            else if (a < b ) {
            return 1;
            }
            return 0;
        }
    }

    headerData = [
        {
            sorted: false,
            ascending: false,
            key: 'name'
        },
        {
            sorted: false,
            ascending: false,
            key: 'N'
        },
        {
            sorted: false,
            ascending: false,
            key: 'Agr'
        },
        {
            sorted: false,
            ascending: false,
            key: 'Csn'
        },
        {
            sorted: false,
            ascending: false,
            key: 'Est'
        },
        {
            sorted: false,
            ascending: false,
            key: 'Ext'
        },
        {
            sorted: false,
            ascending: false,
            key: 'Int'
        }
    ];

    let hDat = d3.select("#pcColumnHeaders").selectAll("th").data(headerData).join("th")
    hDat.on("click", d => {
        console.log(d)
        if(d.ascending){
            if( typeof subDat == "undefined"){
                big5.sort(hDescend(d.key))  
                drawTable(big5); 
            } else {
                subDat.sort(hDescend(d.key));
                drawTable(subDat); 
            }
            d.sorted = true;
            d.ascending = false;
             
        } else {
            if( typeof subDat == "undefined"){
                big5.sort(hAscend(d.key));
                drawTable(big5); 
            } else {
                subDat.sort(hAscend(d.key));
                drawTable(subDat); 
            }
            d.sorted = true;
            d.ascending = true;
             
        }
        for(let h of headerData){
            if(h.key != d.key){
           h.sorted = false;
           h.ascending = false;
            }
        }
    });
    
    /*
    // Enable Region Highlighting
    let highlight = function(d){

        selected_region = d.region
    
        // first every group turns grey
        d3.selectAll(".line")
          .transition().duration(200)
          .style("stroke", "lightgrey")
          .style("opacity", "0.2")
        // Second the hovered specie takes its color
        d3.selectAll("." + selected_region)
          .transition().duration(200)
          .style("stroke", regOrdScale(selected_region))
          .style("opacity", "1")
      }
    
      // Unhighlight
      let doNotHighlight = function(d){
        d3.selectAll(".line")
          .transition().duration(200).delay(500)
          .style("stroke", d => regOrdScale(d.region) )
          .style("opacity", "1")
      }
      */


})