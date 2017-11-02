/*
    This function just maps the assets from the model into properties under an assets object
    and gives them the starting value of 0.
*/
const generateInitialStateFromModel = function(model) {
    const state = {};

    state.assets = model.assets.reduce((prev, curr) => {
        prev[curr.id] = 0
        return prev;
    }, {});

    state.options = model.options;
    
    return state;
}

/*
    This function generates a map of assetId to its details (all the fields from the asset present in the model).
*/
const generateIDtoDetailsMapping = function(model) {
    const idToDetails = model.assets.reduce((prev, curr) => {
        prev[curr.id] = Object.assign({}, curr);
        return prev;
    }, {});

    return idToDetails;
}

export {generateInitialStateFromModel, generateIDtoDetailsMapping};