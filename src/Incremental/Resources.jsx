import React from "react";

const Resources = (props) => {
    const listOfResources = Object.keys(props.assets).map((resId, idx) => (
        <li key={idx}> 
            {props.getResInfo(resId).name}: {Number(props.assets[resId]).toFixed(1)}
        </li>
    ));
    return (
        <ul className="assetList">
            {listOfResources}
        </ul>
    );
}

export default Resources;