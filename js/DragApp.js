import React, {Component} from 'react';
import {
    View,
    Text,
    Animated,
    PanResponder,
    StyleSheet
} from 'react-native';
import clamp from 'clamp';

const People = [
    'red',
    'green',
    'blue',
    'purple'
];

const SWIPE_THRESHOLD = 120;

export default class DragArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY(),
            person: People[0]
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

                if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
                    Animated.decay(this.state.pan, {
                        velocity: {x: velocity, y: vy},
                        deceleration: 0.98
                    }).start(() => this._resetState());
                } else {
                    Animated.spring(this.state.pan, {
                        toValue: {x: 0, y: 0},
                        friction: 4
                    }).start();
                }
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
        let opacity = pan.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: [0.5, 1, 0.5]
        });

        let animatedCardStyles = {
            transform: [
                {translateX},
                {translateY},
                {rotate}
            ],
            opacity
        };

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.card, animatedCardStyles, {backgroundColor: this._getRandomColour()}]} {...this._panResponder.panHandlers} />
            </View>
        );
    }

    _goToNextPerson() {
        let currentPersonInd = People.indexOf(this.state.person);
        let newInd = currentPersonInd + 1;

        this.setState({
            person: People[newInd > People.length - 1 ? 0 : newInd]
        });
    }

    _resetState() {
        this.state.pan.setValue({
            x: 0,
            y: 0
        });
        this._goToNextPerson();
    }

    _getRandomColour() {
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
    card: {
        width: 200,
        height: 200,
        backgroundColor: 'red',
    }
});
