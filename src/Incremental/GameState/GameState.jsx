import React, {Component} from "react";
import {mergeDepthTwo} from "./helpers";

/*
    This Component is the store of the application.
    Keep in mind, that children of this component can also have their own state, however
    the difference is that they will hold only state which concerns about the UI, while this 
    component handles all of the state which concerns about the logic and data. 

    The job of this component is to separate the state of the game and model and map them
    together in props:

        MODEL         STATE
          |             |
          |_____  _____|     
                |
              PROPS
*/
export default class GameState extends Component {

    constructor(props) {
        super(props);
        this.state = props.initialState;
        this.mappings = this.props.idToDetails;
        this.getResInfo = this.getResInfo.bind(this);
        this.setGameState = this.setGameState.bind(this);
        this.modifyAssets = this.modifyAssets.bind(this);
    }

    // We don't want to expose information given from the model to our children components.
    // They should always interact with the store.
    getResInfo(resId) {
        return this.mappings[resId];
    }

    // This is a method which is available to the children, but should be used sparsely.
    // The store should provide methods of common operations of operations, like the 
    // modifyAssets. In addition, this method makes use of the functional setState.
    // Since state updates may happen independently from user actions (passiveIncome in our case)
    // it is not recommended to use the normal setState, which provides a reference to this.state
    // More about this subject here: https://medium.freecodecamp.org/functional-setstate-is-the-future-of-react-374f30401b6b
    setGameState(newState) {
        this.setState(function(prevState, props) {
            return newState(prevState, props);
        });
    }

    // Helper method for modifying resources in our state.
    // The argument is an array of tuples which specify the resource id and the amount to add to it
    modifyAssets(resCosts) {
        this.setState(function(prevState) {
            const updatedResource = {};
            
            resCosts.forEach(resCost => updatedResource[resCost.id] = prevState.assets[resCost.id] + resCost.cost);

            return {
                assets: Object.assign({}, prevState.assets, updatedResource)
            }
        });
    }

    /* The render method will return clones of its children injected with the props needed for the game
    
    
    Let's take a look at the generators field of the gameProps. mergeDepthTwo is just an Object.assign that
    goes two levels deep instead of one when copying properties and values.
    
    To understand what's happening in generators and passiveIncome,
    let's remind ourselves what kind of properties should the state have:
    
        A Component's state properties can't be computed from its props throughout its lifecycle.
        In other words, state properties must not be persistent.


     Currently, our code does not have any generators in the state. But what if we would like to reduce the cost
     of a generator in the future with an upgrade? 

        If we upgrade a generator, we will store its new values in the state. Now we have two places where we get
        generators: from the model and from the state. 
     
     But why can't we just store all of the generators in the state? 

        The answer is in the earlier explanation about state properties. We can compute the non upgraded generators 
        from the props as seen in gameProps. What if no generator will be upgraded throughout the lifecycle of the app?
        We would just store unnecessary data in the state which we already have from our props.
        
!!!     Another benefit of doing this is that it allows us to save the game easily. By serializing the current state,
        we know at what point we are in the game without comparing the information with the model 
        (checking if generators are upgraded or not)

    */ 
    render() {
        const gameProps = {
            options: this.state.options,
            assets: this.state.assets,
            generators: mergeDepthTwo({}, this.props.model.generators, this.state.generators),
            passiveIncome: mergeDepthTwo({}, this.props.model.passiveIncome, this.state.passiveIncome),
            getResInfo: this.getResInfo,
            setGameState: this.setGameState,
            modifyAssets: this.modifyAssets
        };

        return (
            React.cloneElement(this.props.children, {...gameProps})
        );
    }
}