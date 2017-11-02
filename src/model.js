/*
 This is the model for our data. In incremental games there are essentially two types of data:
   Player Assets - These can be either currencies (gold,diamonds,etc) or units (gold miners, soldiers, etc.)
   Asset Generation Rules - These describe how assets can be obtained. There are only two ways you can get assets:
     1. You can buy them for a cost --- generators
     2. They generate over time if a condition is met --- passiveIncome

    In our model we store assets in an array of object with the only requirement that each asset must have a unique id.
    This id will be used to access the asset directly throughout the game if needed.

    The first type of asset generation rules, the generators, will be stored in a object. 
    Each property of the object is a generator's unique id. 

    A generator must have :
     - the id of the resource it generates --- generatedResource
     - the amount of it generates --- generatedAmount
     - the cost for doing it --- resCost - an array of tuples which specify the resource id and the amount needed from the it

    The second type of asset generation rules, the passiveIncome, will follow a similar structure of the generators as seen in the code.
    Further details about this structure will be presented in the GameLogic component where I implement the passive generation.

    
    NOTE: Why do I prefer using objects with unique keys rather than arrays?***

    In my opinion, this represents an easier way to access the data, since all of the assets and generators are unique.
        If I wanted to put a specific generator in my layout, i would just access props.generators['id-of-generator']
        
        If I wanted to lay all of the generators which generate gold, I would do as following: 
            Object.values(props.generators).filter(generator => generator.generatedResource === 'gold')
                                           .map(generator => <Generator rule={generator} />)

        Furthermore, let's say we would like to implement upgrades for our generators. The upgrade must know what generator to upgrade.
        Thus using keys for generators lets us access them faster.


    *** Fun observation: arrays are also objects with unique keys.

*/
const model = {
    assets: [{
            id: 'gold',
            name: 'Gold',
            text: 'Gold is the most valued currency in this game',
            tooltip: 'You can purchase a lot of stuff with it',
            startingAmount: 0
        }, {
            id: 'lumber',
            name: 'Lumber'
        }, {
            id: 'diamond',
            name: 'Diamonds'
        }, {
            id: 'crystal',
            name: 'Crystals'
        }, {
            id: 'goldMiner',
            name: 'Miner'
        }, {
            id: 'influence',
            name: 'Influence'
        }
    ],
    generators: {
        'free-gold': {
            generatedResource: 'gold',
            generatedAmount: 1,
            resCost: []
        },
        'free-wood': {
            generatedResource: 'lumber',
            generatedAmount: 1,
            resCost: []
        },
        'wood-gold': {
            generatedResource: 'gold',
            generatedAmount: 1,
            resCost: [{id:'lumber', cost:3}]
        },
        'miner': {
            generatedResource: 'goldMiner',
            generatedAmount: 1,
            resCost: [{id:'lumber', cost:2}]
        },
        'lumber-gold-diamond': {
            generatedResource: 'diamond',
            generatedAmount: 1,
            resCost: [{id:'lumber', cost:1},{id:'gold', cost:1}]
        },
        'lumber-diamond-crystal': {
            generatedResource: 'crystal',
            generatedAmount: 1,
            resCost: [{id:'lumber', cost:1},{id:'diamond', cost:1}]
        }
    },
    passiveIncome: {
        'goldMining' : {
            generatedResource: 'gold',
            requiredRes: ['goldMiner'],
            resYieldPerSec: 2
        },
        'influenceGain' : {
            generatedResource: 'influence',
            requiredRes: ['crystal','diamond','lumber'],
            resYieldPerSec: 1
        }
    },
    passiveUpgrades: [{
        generatedResource: 'gold',
        generatedBy: ['goldMiner'],
        newAmount: 4
    }],
    availableGenUpgrades: [{
        key: 'wood-gold',
        newResCost: [{id:'lumber', cost:1}],
        resCost: [{id:'gold', cost:2}]
    }],
    persistentGenUpgrades: [{
        key: 'wood-gold',
        newResChange: [{id: 'lumber', change: -1}],
        resCost: [{id:'gold', cost:2}],
        costChange: 10
    }],
    options: {
        fps: 100
    }
};

export default model;