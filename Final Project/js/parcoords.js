d3.csv("data/CountryBig5.csv").then(data => {
    //console.log(data);
    
    let pcSVG = d3.select("#pcDiv").append("svg")
        .attr("id","pcSVG")
        .attr("width",850)
        .attr("height",600);
    
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
    //console.log(big5);

    let dimensions = d3.keys(big5[0]).filter(d => d!="name" && d!="N");
    console.log(dimensions);
    
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
    
    /*
    let agrScale = d3.scaleLinear()
    .domain([d3.max(big5, d => d.Agr),d3.min(big5, d => d.Agr)])
    .range([10,550]);
    console.log(d3.max(big5, d => +d.Agr));

    let csnScale = d3.scaleLinear()
    .domain([d3.max(big5, d => d.Csn),d3.min(big5, d => d.Csn)])
    .range([10,550]);
    */

    let xDiscrete = d3.scalePoint()
    .range([0, 1000])
    .padding(1)
    .domain(dimensions);

    /*
    let agrLineGen = d3
    .line()
    .x([xDiscrete('Agr'),xDiscrete('Csn')])
    .y(d => [agrScale(d.Agr),csnScale(d.Csn)] );

    console.log(agrScale(3.5));

    //draw 1st set of lines; Agr - Csn
    pcSVG
    .append("path")
    .attr("class","pcLine")
    .attr("d",agrLineGen(big5))

    // Draw agr axis:
    let agrAxis = d3.axisLeft();
    agrAxis.scale(agrScale);
    pcSVG.append("g").call(agrAxis).attr("transform", "translate(" + xDiscrete('Agr') + ",35)")
    */
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
            const brush = d3.brushY().extent([[0,downShift], [30, 550]])
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
        .attr("class","pcLine");
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
    .data(d => [d.name,d.N,Math.round(+d.Agr*1000)/1000,Math.round(+d.Csn*1000)/1000,Math.round(+d.Est*1000)/1000,Math.round(+d.Ext*1000)/1000,Math.round(+d.Int*1000)/1000])
    .join("td");
    cellSelect.text(d => d);
    }
    drawTable(big5);
})