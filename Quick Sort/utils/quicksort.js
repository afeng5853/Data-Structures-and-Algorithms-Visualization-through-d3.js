import {partitionLeftLine, partitionRightLine} from "../../utils/partition.js"

export default async function quickSort(graphicArray) {
    let startIndex = 0;
    let partitionIndex = graphicArray.getArray().length - 1;

    let partition = async (A, lo, hi) => {
        return new Promise((resolve, reject) => {
            let pivot = A[hi];
            let pivotNode = pivot.selectAll("circle");
            let pivotOrigColor = pivotNode.attr("fill");
            pivotNode.attr("fill", "yellow");

            let i = lo - 1;
            let j = lo;
            let prevNode = null;
            let prevNodeColor;

            let iterateArray = async (ms) => {
                return new Promise((resolve, reject) => {
                    setTimeout(function() {
                        if (j > hi - 1) {
                            pivotNode.attr("fill", pivotOrigColor); //restore pivot's original color
                            prevNode.attr("fill", prevNodeColor); //restore previous node's original color

                            if (A[hi].datum().value < A[i+1].datum().value) {
                                [A[i + 1], A[hi]] = [A[hi], A[i + 1]];
                                graphicArray.update();
                            }
                            resolve(i + 1);
                        } else {
                            let currentNode = A[j].selectAll("circle");
                            prevNodeColor = currentNode.attr("fill"); //color to be restored for previous node
                            if (prevNode) {
                            // if there is a previous node, fill it with it's original color
                                prevNode.attr("fill", prevNodeColor);
                            }
                            currentNode.attr("fill", "red");
                            if (A[j].datum().value < pivot.datum().value) {
                                i++;
                                [A[i], A[j]] = [A[j], A[i]];
                                graphicArray.update();
                            }
                            j++;
                            prevNode = currentNode;
                            resolve(iterateArray(1000));
                        }
                    }, ms)
                });
            };
            resolve(iterateArray(1000));
        });
    };

    let quickSort_ = async (A, lo, hi) => {
        d3.selectAll("rect.partitionLine").remove();
        if (lo < hi) {
            console.log(lo,hi);
            partitionLeftLine(A, lo);
            partitionRightLine(A, hi);
            let p = await partition(A, lo, hi);
            await quickSort_(A, lo, p-1);
            quickSort_(A, p+1, hi);
        }
    };

    await quickSort_(graphicArray.getArray(), startIndex, partitionIndex);
}