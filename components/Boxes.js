import React, { Component } from "react";
import { View,Text,StyleSheet,TouchableOpacity} from "react-native";

const Box = ({ style, text, onPress }) => {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
           		<Text>
           			{text}
           		</Text>
        </TouchableOpacity>
    );
};
export default Box;