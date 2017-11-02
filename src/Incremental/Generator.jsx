import React from "react";

export default class Generator extends React.Component {
    constructor(props) {
        super(props);
        this.isRuleUpdated = this.isRuleUpdated.bind(this);
        this.computeTransactions = this.computeTransactions.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.isDisabled !== nextProps.isDisabled
            || this.isRuleUpdated(nextProps.rule);
    }

    isRuleUpdated(otherRule) {
        return this.props.rule.generatedAmount !== otherRule.generatedAmount
            || JSON.stringify(this.props.rule.resCost) !== JSON.stringify(otherRule.resCost);
    }

    computeCosts() {
        let costs = this.props.rule.resCost.map((resCost, idx) => `: ${idx > 1 ? ', ' : ''}${resCost.cost} ${this.props.getResInfo(resCost.id).name}`);
        if (costs.length === 0) {
            costs = 'Free';
        }

        return costs;  
    }

    computeTransactions() {
        const generationTransaction = [{
            id: this.props.rule.generatedResource,
            cost: this.props.rule.generatedAmount
        }];

        const exchangeTransactions = this.props.rule.resCost
                .map(res => {
                    return {
                        id: res.id,
                        cost: -1 * res.cost
                    }
                });

        return generationTransaction.concat(exchangeTransactions);
    }

    render() {
        const assetName = this.props.getResInfo(this.props.rule.generatedResource).name;
        return (
            <button onClick={() => this.props.modifyAssets(this.computeTransactions())}
                disabled={this.props.isDisabled}>
                {'Get ' + assetName + ' for ' + this.computeCosts()}
            </button>
        );
    }
}