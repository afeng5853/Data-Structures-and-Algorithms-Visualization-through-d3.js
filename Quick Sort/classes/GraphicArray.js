export default class GraphicArray {
    constructor(width, nodeRadius, arrLeft, arrTop, arrRight, arrBottom, arrNodePadding, arrYMiddle) {
        let array = [];
        this.getArray = function() {
            return array;
        };

        let gElements = [];
        this.getGElements = function() {
            return gElements;
        };

        this.getWidth = function() {
            return width;
        };

        this.getNodeRadius = function() {
            return nodeRadius;
        };

        this.getArrLeft = function () {
            return arrLeft;
        };

        this.getArrRight = function () {
            return arrRight;
        };

        this.getArrTop = function () {
            return arrTop;
        };

        this.getArrBottom = function () {
            return arrBottom;
        };

        this.getArrNodePadding = function () {
            return arrNodePadding;
        };

        this.getArrYMiddle = function () {
            return arrYMiddle;
        };
    }

    iterate() {
        let interval = setInterval(visitNextNode, 1000);
        let prevNode = gArray.getArray()[0].selectAll("circle");
        let prevColor = prevNode.attr("fill");
        prevNode.attr("fill", "red");
        let i = 1;

        function visitNextNode() {
            if (i === this.getArray().length) {
                this.getArray()[i - 1].selectAll("circle").attr("fill", prevColor);
                clearInterval(interval);
            } else {
                prevNode.attr("fill", prevColor);
                let node = this.getArray()[i].selectAll("circle");
                let tempColor = node.attr("fill");
                node.attr("fill", "red");

                prevNode = node;
                prevColor = tempColor;
                i++;
            }
        }
    }

    contains(g) {
        let radius = g.datum().r;
        if (d3.event.x + radius > this.getArrLeft() && d3.event.x - radius < this.getArrRight() && d3.event.y - radius < this.getArrBottom() && d3.event.y + radius > this.getArrTop()) {
            return true;
        }
    }

    update() {
        let startingPos = (this.getWidth() / 2) - ((this.getArray().length - 1) * (this.getNodeRadius() + this.getArrNodePadding()));
        for (let i = 0; i < this.getArray().length; i++) {
            let x = startingPos + 2 * i * (this.getNodeRadius() + this.getArrNodePadding());
            let g = this.getArray()[i].transition()
                .duration(300)
                .attr("transform", "translate(" + (this.getArray()[i].datum().x = x) + "," + (this.getArray()[i].datum().y = this.getArrYMiddle()) + ")");
        }
    }

    push(g) {
        if (this.getGElements().indexOf(g.node()) === -1) {
            this.getArray().push(g);
            this.getGElements().push(g.node())
        }
        this.update();
    }
}