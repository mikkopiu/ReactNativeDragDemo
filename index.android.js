/**
 * Simple drag demo app
 * with React Native on Android.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ToolbarAndroid,
    View
} from 'react-native';

import DragApp from './js/DragApp';

export default class ReactNativeDragDemo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title="ReactNativeDragDemo"
                    titleColor="#FFFFFF" />
                <DragApp />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#62B5BF'
    },
    toolbar: {
        height: 56,
        backgroundColor: '#E5003D'
    }
});

AppRegistry.registerComponent('ReactNativeDragDemo', () => ReactNativeDragDemo);
