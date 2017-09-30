export default function selectionSort(graphicArray) {
    let startIndex = 0;

    selectionSortOnce();

    function selectionSortOnce() {
        if (startIndex !== graphicArray.getArray().length - 1) {
            //If not at the end of the array
            let prevNode;
            let minG = graphicArray.getArray()[startIndex];
            let minGIndex = startIndex;
            let currentMin = minG.datum().value;
            let minNode = prevNode = minG.selectAll("circle");
            let minNodeColor = minNode.attr("fill");
            let interval = setInterval(visitNextNode, 1000);
            let prevColor = prevNode.attr("fill");
            prevNode.attr("fill", "red");
            let i = startIndex + 1;

            function visitNextNode() {
                if (i === graphicArray.getArray().length) {
                    graphicArray.getArray()[i - 1].selectAll("circle").attr("fill", prevColor);
                    clearInterval(interval);
                    let temp = graphicArray.getArray()[startIndex];
                    graphicArray.getArray()[startIndex] = minG;
                    graphicArray.getArray()[minGIndex] = temp;
                    graphicArray.getGElements()[startIndex] = minG.node();
                    graphicArray.getGElements()[minGIndex] = temp.node();
                    minG.selectAll("circle").attr("fill", minNodeColor);
                    graphicArray.update();
                    startIndex += 1;
                    selectionSortOnce();
                } else {
                    prevNode.attr("fill", prevColor);

                    let g = graphicArray.getArray()[i];

                    if (g.datum().value < currentMin) {
                        minNode.attr("fill", minNodeColor);
                        currentMin = g.datum().value;
                        minNode = g.selectAll("circle");
                        minNodeColor = minNode.attr("fill");
                        minG = g;
                        minGIndex = i;
                    }
                    let node = g.selectAll("circle");
                    let tempColor = node.attr("fill");
                    node.attr("fill", "red");
                    minNode.attr("fill", "yellow");

                    prevNode = node;
                    prevColor = tempColor;
                    i++;
                }
            }
        }
    }
};