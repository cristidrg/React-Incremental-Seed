import React from "react";
import Loop from "./Loop";
import GameLayout from "./GameLayout";

/*
    This component implements logic which can't be derived from the model's properties.
    Currently it has two methods, each commented below.
*/
const GameLogic = (props) => {

    // This function makes use of the available resources to check if a transaction is possible
    // This could also be computed in the children of this component, however their purpose is
    // tied to the UI rather than the logic.

    const isTransactionPossible = function(resCost) {
        return resCost.length === 0 || resCost.every((res) => props.assets[res.id] >= res.cost);
    }

    // This function is called by loop at the specified framerate.
    // It checks if any passiveIncome rules are satisfied and then modifies the available assets
    // The argument represents the amount of time since last call.
    const passivelyIncrement = function(delta) {
        const res = props.assets;
        const resCosts  = Object.values(props.passiveIncome).reduce((acc, curr) => {

            // If we have multiple requirements, we check how many of each do we have
            const combinationsAvailable = Math.min(...curr.requiredRes.map(req => res[req]));
            const amountToAdd = combinationsAvailable * curr.resYieldPerSec * delta / 1000;

            if (amountToAdd !== 0) {
                acc.push({id: curr.generatedResource, cost: amountToAdd});
            }

            return acc
        }, []);

        // If there is something to increment
        if (resCosts.length > 0) {
            props.modifyAssets(resCosts);
        }
    }

    return (
        <Loop callback={passivelyIncrement} callbackDelta={1000 / props.options.fps}>
            <GameLayout isTransactionPossible={isTransactionPossible} {...props}/>
        </Loop>
    );
}

export default GameLogic;