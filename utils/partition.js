export let partitionLeftLine = (A, idx) => {
    console.log(idx);
    d3.select(A[idx].node().parentNode).append("rect")
        .attr("x", -60 + parseInt(A[idx].attr("transform").substring(10, 13)))
        .attr("y", -50 + parseInt(A[idx].attr("transform").substring(15, 18)))
        .attr("width", 5)
        .attr("height", 100)
        .classed("partitionLine", true);
};

export let partitionRightLine = (A, idx) => {
    console.log(idx);
    d3.select(A[idx].node().parentNode).append("rect")
        .attr("x", 60 + parseInt(A[idx].attr("transform").substring(10, 13)))
        .attr("y", -50 + parseInt(A[idx].attr("transform").substring(15, 18)))
        .attr("width", 5)
        .attr("height", 100)
        .classed("partitionLine", true);
};