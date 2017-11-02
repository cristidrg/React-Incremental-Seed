import React from 'react';
import ReactDOM from 'react-dom';

import GameLogic from './Incremental/GameLogic';
import GameState from './Incremental/GameState/GameState';
import {generateInitialStateFromModel, generateIDtoDetailsMapping} from './setupHelpers';
import model from './model';

import './index.css';
import registerServiceWorker from './registerServiceWorker';


/* Hello dear reader,
 This is the correct point to start exploring this React project.
 Folow the component hierarchy and open them to see the comments.

 As you can see my ReactDOM renders two components GameState and GameLogic.
 GameState is my own implementation of a Store, as I will be using a 
 simplistic version of the Flux architecture. It requires the following 3 props:
    initialState - the initialState for the game, check the setupHelpers.js file to read about the state.
    idToDetails - a map of assetId to details about the assetId
    model - the model of the game, check the model.js file to read more! 

I would suggest reading about the model and then moving to the GameState
*/


const initialState = generateInitialStateFromModel(model),
    idToDetails = generateIDtoDetailsMapping(model);
ReactDOM.render(
    <GameState initialState={initialState} idToDetails={idToDetails} model={model} >
        <GameLogic />
    </GameState>, 
    document.getElementById('root'));

registerServiceWorker();