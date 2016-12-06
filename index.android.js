/**
 * Simple drag demo app
 * with React Native on Android.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator
} from 'react-native';

import HelloScene from './components/HelloScene';
import DragApp from './js/DragApp';

export default class ReactNativeDragDemo extends Component {
    render() {
        return (
            <DragApp />
        );
    }
}

AppRegistry.registerComponent('ReactNativeDragDemo', () => ReactNativeDragDemo);
