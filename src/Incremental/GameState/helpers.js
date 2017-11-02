const mergeDepthTwo = function(target, varArgs) {
    if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
    }
    
    var to = Object(target);

    for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];

        if(nextSource !== null || nextSource !== undefined) {
            for (var nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    if (typeof nextSource[nextKey] === 'object' && typeof target[nextKey] === ' object'
                        && !Array.isArray(target[nextKey])) {
                            target[nextKey] = Object.assign({}, target[nextKey], nextSource[nextKey]);
                    } else {
                        target[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
    }

    return to;
}

export {mergeDepthTwo};