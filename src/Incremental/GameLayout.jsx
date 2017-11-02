import React from "react";
import Resources from "./Resources";
import Generators from "./Generators";

// From now the components are straightforward
const GameLayout = (props) => (
    <div id="gameContainer">
        <Resources assets={props.assets} 
            getResInfo={props.getResInfo} 
            />
        <Generators generators={props.generators}
            modifyAssets={props.modifyAssets} 
            getResInfo={props.getResInfo}
            isTransactionPossible={props.isTransactionPossible}
            />
    </div>
);

export default GameLayout;