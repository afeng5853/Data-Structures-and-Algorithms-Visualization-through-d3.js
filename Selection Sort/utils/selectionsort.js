export default function selectionSort(graphicArray) {
    let startIndex = 0;

    let selectionSort_ = () => {
        let arr = graphicArray.getArray();
        if (startIndex !== arr.length - 1) {
            // if not at the end of the array
            let prevNode; //used to store the prev nodes color
            let minG = arr[startIndex]; //init min as first element
            let minGIndex = startIndex; //init min index as first index
            let currentMin = minG.datum().value; // current min value, init with first element value
            let minNode = prevNode = minG.selectAll("circle"); // min circle element, init as first circle
            let minNodeColor = minNode.attr("fill"); //min circle color, used to restore the color when passing
            let prevColor = prevNode.attr("fill"); //previous node color, used to restore the color when passing
            prevNode.attr("fill", "red"); //start with red
            let i = startIndex + 1;

            let visitNextNode = () => {
                if (i === arr.length) {
                    // if at the end
                    arr[i - 1].selectAll("circle").attr("fill", prevColor);
                    clearInterval(interval);
                    let temp = arr[startIndex];
                    arr[startIndex] = minG;
                    arr[minGIndex] = temp;
                    graphicArray.getGElements()[startIndex] = minG.node();
                    graphicArray.getGElements()[minGIndex] = temp.node();
                    minG.selectAll("circle").attr("fill", minNodeColor);
                    graphicArray.update();
                    startIndex += 1;
                    selectionSort_();
                } else {
                    //if not at the end
                    prevNode.attr("fill", prevColor); //restore the previous node color

                    let g = arr[i]; //let the current g element be the one at index i
                    let node = g.selectAll("circle"); // get current node

                    if (g.datum().value < currentMin) {
                        // if current value is less than the current min
                        //restore old min
                        minNode.attr("fill", minNodeColor); // restore the ex-min node's color

                        // setting new min
                        currentMin = g.datum().value; //set the current min to current g's value
                        minNode = node; //set the new min node to the current node
                        minNodeColor = minNode.attr("fill"); //set the new min node's color to the current node's color
                        minG = g; //set the new min g to the current g
                        minGIndex = i; //set the new min g's index to the current g's index
                    }

                    let tempColor = node.attr("fill"); // temporarily store the current node's color
                    node.attr("fill", "red"); //set the current node's color to red
                    minNode.attr("fill", "yellow"); //set the min node's color to yellow

                    prevNode = node; //save the previous node
                    prevColor = tempColor; //save the previous color;
                    i++; //next node
                }
            };
            let interval = setInterval(visitNextNode, 1000); //iterate through the arary
        }
    };

    selectionSort_();

};