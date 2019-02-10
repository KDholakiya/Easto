import React, { Component } from "react";
import {StyleSheet,View,Text,TouchableOpacity,Alert} from "react-native";
import { Icon } from "native-base";
import Board from "./../components/board"
class PlayGround extends Component{
    render(){
        return (
            <View style={styles.View}>
                <View style={styles.Wrapper}>
                    <Board player={4}/>
                </View>
            </View>
        );
    }
}
export default PlayGround;

const styles = StyleSheet.create({
    View:{flex:1},
    row:{flexDirection:'row'},
    Wrapper:{flex:1,alignItems:'center',justifyContent:'center'},
    box:{height:80,width:80,borderWidth:1}
});       