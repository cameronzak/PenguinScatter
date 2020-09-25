
var penguinPromise = d3.json("../json/classData.json")

var succFCN = function(penguins)
{
    console.log("penguins",penguins);
    initGraph(penguins);
}

var failFCN = function(error)
{
    console.log("error",error)
}

penguinPromise.then(succFCN,failFCN);

var finalGrade = function(penguin)
{
    var getFinalGrades = function(final)
    {
        return final.grade
    }
    var finalGrades = penguin.final.map(getFinalGrades)
    return finalGrades
}

var hwMean = function(penguin)
{
    var getHwGrades = function(homework)
    {
        return homework.grade
    }
    var hwGrades = penguin.homework.map(getHwGrades)
    var hwMean = d3.mean(hwGrades)
   return hwMean
}

var quizMean = function(penguin)
{
    var getQuizGrades = function(quizes)
    {
        return quizes.grade
    }
    var quizGrades = penguin.quizes.map(getQuizGrades)
    var mean = d3.mean(quizGrades)
    return mean
}

var initGraph = function(penguins)
{
    var screen = {width:500,height:500}
    
    d3.select("#scatterplot")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var xScale = d3.scaleLinear()
    .domain([0,100])
    .range([0,screen.width]);
    
    var yScale = d3.scaleLinear()
    .domain([0,100])
    .range([screen.height,0])
    
    drawPlot(penguins,screen,xScale,yScale)
}


var drawPlot = function(penguins,screen,xScale,yScale)
{
    d3.select("#finalGraph")
    .on("click",function()
       {
    d3.select("#scatterplot")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx",function(penguin)
    {
        return xScale(finalGrade(penguin))  
    })
    .attr("cy",function(penguin)
    {
        return yScale(hwMean(penguin))
    })
    .attr("r",5)
    })
    d3.select("#quizGraph")
    .on("click",function()
       {
    d3.select("#scatterplot")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx",function(penguin)
    {
        return xScale(hwMean(penguin))  
    })
    .attr("cy",function(penguin)
    {
        return yScale(quizMean(penguin))
    })
    .attr("r",5)
    })
    
    .on("mouseenter",function(penguin)
        { 
        console.log("hovering");
        var xPos = d3.event.pageX;
        var yPos = d3.event.pageY;
    
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
    
})

}


