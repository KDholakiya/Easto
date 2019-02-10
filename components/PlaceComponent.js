import React, { Component } from "react";
import { Text,} from "react-native";

class PlaceComponent extends Component{
    render(){
        return (
            <Text>{this.props.put}</Text>
        );
    }
}
export default PlaceComponent;