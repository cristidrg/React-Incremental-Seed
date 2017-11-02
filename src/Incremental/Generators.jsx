import React from "react";
import Generator from "./Generator";

// This is produces a list of all the available generators
export default class Generators extends React.Component {
    constructor(props) {
        super(props);
        this.createGenerators = this.createGenerators.bind(this);
    }

    createGenerators() {
        return Object.values(this.props.generators).map((generator,idx) => {
            return (
               <Generator isDisabled={!this.props.isTransactionPossible(generator.resCost)}
                key={idx}
                rule={generator}
                getResInfo={this.props.getResInfo} 
                modifyAssets={this.props.modifyAssets} 
                />
            );
        });
    }

    render() {
        return (
            <div className="generators">
                {this.createGenerators()}
            </div>
        );
    }
}