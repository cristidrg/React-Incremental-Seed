import React, {Component} from "react";

/*
    This component keeps calling a function at the specified delta time interval.
    It makes use of requestAnimationFrame rather than setInterval or setTimeout for performance purposes.
    The GameState has the fps as options because high amount of calls in a rAF loop may reduce performance on poor machines.
    Providing a slider in the game to reduce the fps will solve this issue.

    More about rAF: https://medium.com/@paul_irish/requestanimationframe-scheduling-for-nerds-9c57f7438ef4


    While working on this project I noticed something interesting happening in React 16 and rAF:
        https://github.com/facebook/react/issues/11392
*/
export default class Loop extends Component {
    constructor(props) {
        super(props);
        this.rafId = 0;
        this.lastInvocationMs = 0;
        this.loop = this.loop.bind(this);
    }

    loop(time) {
        let delta = time - this.lastInvocationMs;
        if (delta >= this.props.callbackDelta) { // delta time since last frame > 500ms
            this.props.callback(delta);
            this.lastInvocationMs = time;
        }
        this.rafId = requestAnimationFrame(this.loop);
    }
    
    componentDidMount() {
        this.rafId = requestAnimationFrame(this.loop);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rafId);
    }

    render() {
        return React.Children.only(this.props.children)
    }
}