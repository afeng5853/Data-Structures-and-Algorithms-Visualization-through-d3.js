import {addSortButton} from "../classes/SortEnvironment.js"

let button = null;

export function dragStartEvent(self, sortingAlgo, graphicArray, nodeRadius, arrNodePadding, width, height, arrEncapWidth, buttonWidth, buttonHeight) {
    let g = d3.select(self).classed("dragging", true).raise();

    let dragged = () => {
        g.attr("transform", function(d) {
            let coordinates = d3.mouse(d3.select("svg").node());
            return "translate(" + (d.x = coordinates[0]) + "," + (d.y = coordinates[1]) + ")";
        });
        if (graphicArray.contains(g)) {
            d3.select(".array")
                .style("fill", "rgb(240, 240, 240)")
        } else if (d3.select(".array").style("fill") === "rgb(240, 240, 240)") {
            d3.select(".array")
                .style("fill", "none")
        }
    };

    let dragEnded = () => {
        g.classed("dragging", false);
        if (graphicArray.contains(g)) {
            d3.select(".array")
                .style("fill", "none");
            if ((graphicArray.getArray().length + 1) * (nodeRadius * 2 + arrNodePadding * 2) <= width - arrEncapWidth * 2) {
                // if not overflow
                graphicArray.push(g);
                if (graphicArray.getArray().length >= 1) {
                    button = addSortButton(sortingAlgo, width, height, buttonWidth, buttonHeight);
                }
            }
        } else {
            let removeFromArray = null;
            if ((removeFromArray = graphicArray.getGElements().indexOf(g.node())) !== -1) {
                graphicArray.getArray().splice(removeFromArray, 1);
                graphicArray.getGElements().splice(removeFromArray, 1);
                graphicArray.update();
            }
            if (graphicArray.getArray().length === 0 && button) {
                button.remove();
            }
        }
    };

    d3.event.on("drag", dragged)
        .on("end", dragEnded);

}