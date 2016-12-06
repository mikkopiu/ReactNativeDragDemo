import React, {Component} from 'react';
import {
    View,
    Text,
    Animated,
    PanResponder,
    StyleSheet
} from 'react-native';
import clamp from 'clamp';

export default class DragArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY(),
            colour: DragArea._getRandomColour()
        };
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({
                    x: this.state.pan.x._value,
                    y: this.state.pan.y._value
                });
                this.state.pan.setValue({
                    x: 0,
                    y: 0
                });
            },

            onPanResponderMove: Animated.event([
                null, {dx: this.state.pan.x, dy: this.state.pan.y}
            ]),

            onPanResponderRelease: (e, {vx, vy}) => {
                this.state.pan.flattenOffset();
                let velocity;

                if (vx >= 0) {
                    velocity = clamp(vx, 3, 5);
                } else if (vx < 0) {
                    velocity = clamp(vx * -1, 3, 5) * -1;
                }

                this._resetState();
            }
        })   
    }

    render() {
        let {pan} = this.state;

        let [translateX, translateY] = [pan.x, pan.y];

        let rotate = pan.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ['-30deg', '0deg', '30deg']
        });

        let animatedTargetStyles = {
            transform: [
                {translateX},
                {translateY},
                {rotate}
            ]
        };

        return (
            <View style={styles.container}>
                <Animated.View
                    style={[
                        styles.dragTarget,
                        animatedTargetStyles,
                        {backgroundColor: this.state.colour}
                    ]}
                    {...this._panResponder.panHandlers} />
            </View>
        );
    }

    _resetState() {
        Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
        }).start(() => this.setState({colour: DragArea._getRandomColour()}));
    }

    /**
     * Get random hex colour
     * for the drag target
     */
    static _getRandomColour() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    dragTarget: {
        width: 200,
        height: 200,
        backgroundColor: 'red',
    }
});
