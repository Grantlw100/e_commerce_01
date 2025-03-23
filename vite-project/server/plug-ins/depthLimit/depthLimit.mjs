import { useDepthLimit } from "@envelop/depth-limit";


const depthLimit = (maxDepth) => {
    return useDepthLimit({
        maxDepth: maxDepth,
        ignore: [ 'Query.*' ],
            onMaxDepth: (depth) => {
                throw new Error(`Query is too deep: ${depth}`);
            },
    });
};

export default depthLimit;
