import Node from "./Node.js";

export class Environment {
    constructor(sortAlgo, graphicArray, width, height, dragStartEvent, arrPadding, arrNodePadding, arrHeight, arrEncapWidth, nodeRadius, fontSize, buttonWidth, buttonHeight) {
        //Keeps track of all the nodes
        let data = [];

        this.getSortAlgo = function () {
            return sortAlgo;
        };

        this.getData = function() {
            return data;
        };

        this.getGraphicArray = function() {
            return graphicArray;
        };

        this.getHeight = function() {
            return height;
        };

        this.getWidth = function() {
            return width;
        };

        this.getArrPadding = function() {
            return arrPadding;
        };

        this.getArrNodePadding = function() {
            return arrNodePadding;
        };

        this.getArrHeight = function() {
            return arrHeight;
        };

        this.getArrEncapWidth = function() {
            return arrEncapWidth;
        };

        this.getNodeRadius = function() {
            return nodeRadius;
        };

        this.getFontSize = function() {
            return fontSize;
        };

        const arrSpacing = this.getWidth() - this.getArrEncapWidth() * 2 - this.getArrPadding() * 2;
        this.getArrSpacing = function () {
            return arrSpacing;
        };

        const arrLeft = this.getArrPadding();
        this.getArrLeft = function () {
            return arrLeft;
        };

        const arrRight = this.getArrPadding() + this.getArrEncapWidth() * 2 + (this.getArrSpacing());
        this.getArrRight = function () {
            return arrRight;
        };

        const arrTop = this.getArrPadding();
        this.getArrTop = function () {
            return arrTop;
        };

        const arrBottom = this.getArrPadding() + this.getHeight();
        this.getArrBottom = function () {
            return arrBottom;
        };

        const arrYMiddle = this.getArrPadding() + this.getHeight() / 2;
        this.getArrYMiddle = function () {
            return arrYMiddle;
        };


        this.getDragStartEvent = function() {
            return function () { dragStartEvent(this, function() { return sortAlgo(graphicArray) }, graphicArray, nodeRadius, arrNodePadding, width, height, arrEncapWidth, buttonWidth, buttonHeight) };
        };
    }



    getNodes(tag) {
        return d3.select(tag)
            .selectAll(".nodes")
            .data(this.getData())
            .enter();
    }

    addNodeTo(tag) {
        this.getData().push(new Node(d3.event.x, d3.event.y, this.getNodeRadius(), Math.floor(Math.random() * 255)));
        let nodes = this.getNodes(tag);
        this.updateNodes(nodes);
    }

    updateNodes(nodes) {
        let g = nodes.append("g")
            .classed("nodes", true)
            .call(d3.drag().on("start", this.getDragStartEvent()))
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")"
            });

        let node = g.append("circle")
            .attr("r", function(d) {
                return d.r
            })
            .attr("fill", function(d) {
                return "rgb(" + (255 - d.value) + ", 255, 255)"
            });

        let text = g.append("text")
            .text(function(d) {
                return d.value
            })
            .attr("text-anchor", "middle")
            .attr("y", ".3em")
            .attr("font-size", (d) => {
                return this.getFontSize() - String(d.value).length * 6;
            });
    }

    updateArray(svg, data) {
        let g = svg.append("g")
            .data(data)
            .attr("transform", (d) => {
                return "translate(" + this.getArrPadding() + "," + this.getArrPadding() + ")";
            });

        let array = g.append("rect")
            .attr("width", this.getWidth() - this.getArrPadding() * 2)
            .attr("height", this.getArrHeight())
            .classed("array", true)
            .style("stroke-dasharray", String(this.getArrEncapWidth()) + "," + String(this.getArrSpacing()) + "," + String(this.getArrEncapWidth() * 2 + this.getArrHeight()) + "," + String(this.getArrSpacing()) + "," + String(this.getArrEncapWidth() * 2 + this.getArrHeight()));
    }
}

export let addSortButton = (sortAlgo, width, height, buttonWidth, buttonHeight) => {
    let svg = d3.selectAll("svg");
    let g = svg.append("g")
        .attr("transform", "translate(" + (width / 2 - buttonWidth / 2) + "," + (height * 0.75) + ")")
        .on("click", sortAlgo);
    let button = g;

    let rect = g.append("rect")
        .attr("width", buttonWidth)
        .attr("height", buttonHeight)
        .classed("actionButton", true);

    let text = g.append("text")
        .text("Selection Sort")
        .attr("transform", "translate(" + (buttonWidth / 2) + "," + (buttonHeight / 2) + ")")
        .attr("text-anchor", "middle")
        .attr("y", ".3em")
        .attr("font-size", (buttonWidth / 10) + "pt");
    return button;
};