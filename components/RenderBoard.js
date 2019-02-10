




// not in use



import React, { Component } from "react";
import { View,Text,StyleSheet,TouchableOpacity } from "react-native";
import {Icon} from "native-base";
class RenderBoard extends Component{
	BoxTouchHandler = (a,b) =>{
		//console.log(a,b)
	}
	render(){
		return(
			<View>
				<View style={styles.row}>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(0,0)} style={styles.box}>
						<Text>00</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(0,1)} style={styles.box}>
						<Text>01</Text>
						<Icon name="arrow-down" />
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(0,2)} style={styles.box}>
						<Text>02</Text>
						<Icon name="close"/>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(0,3)} style={styles.box}>
						<Text>03</Text>
						<Icon name="arrow-forward" />
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(0,4)} style={styles.box}>
						<Text>04</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(1,0)} style={styles.box}>
						<Icon name="arrow-up" />
						<Text>10</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(1,1)} style={styles.box}>
						<Text>11</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(1,2)} style={styles.box}>
						<Text>12</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(1,3)} style={styles.box}>
						<Text>13</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(1,4)} style={styles.box}>
						<Text>14</Text>
						<Icon name="arrow-back" />
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(2,0)} style={styles.box}>
						<Text>20</Text>
						<Icon name="close"/>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(2,1)} style={styles.box}>
						<Text>21</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(2,2)} style={styles.box}>
						<Text>22</Text>
						<Icon name="close"/>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(2,3)} style={styles.box}>
						<Text>23</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(2,4)} style={styles.box}>
						<Text>24</Text>
						<Icon name="close"/>
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(3,0)} style={styles.box}>
						<Text>30</Text>
						<Icon name="arrow-forward" />
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(3,1)} style={styles.box}>
						<Text>31</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(3,2)} style={styles.box}>
						<Text>32</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(3,3)} style={styles.box}>
						<Text>33</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(3,4)} style={styles.box}>
						<Text>34</Text>
						<Icon name="arrow-down" />
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(4,0)} style={styles.box}>
						<Text>40</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(4,1)} style={styles.box}>
						<Text>41</Text>
						<Icon name="arrow-back" />
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(4,2)} style={styles.box}>
						<Text>42</Text>
						<Icon name="close"/>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(4,3)} style={styles.box}>
						<Text>43</Text>
						<Icon name="arrow-up" />
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>this.BoxTouchHandler(4,4)} style={styles.box}>
						<Text>44</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
    row:{flexDirection:'row'},
    box:{height:80,width:80,borderWidth:1}
}); 

export default RenderBoard;