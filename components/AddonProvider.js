import React,{Component} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import {Icon} from 'native-base';

const Addon=(cord,row,col)=>{
	if(cord<5 && cord>0){
		addon=<View style={styles.addon}>
				<Text style={styles.addonText}>H{cord}</Text>
				<Icon style={styles.addonText} name='ios-close'/>
			</View>
	}else if(cord>9){
		if(cord==11 || cord==40){
			addon=<View style={styles.addon}>
				<Text style={styles.addonText}>{row}{col}</Text>
				<Icon style={styles.addonText} name='arrow-up'/>
			</View>
		}else if(cord==22 || cord==10){
			addon=<View style={styles.addon}>
				<Text style={styles.addonText}>{row}{col}</Text>
				<Icon style={styles.addonText} name='arrow-forward'/>
			</View>
		}
		else if(cord==33 || cord==20){
			addon=<View style={styles.addon}>
				<Text style={styles.addonText}>{row}{col}</Text>
				<Icon style={styles.addonText} name='arrow-down'/>
			</View>
		}else if(cord==44 || cord==30){
			addon=<View style={styles.addon}>
				<Text style={styles.addonText}>{row}{col}</Text>
				<Icon style={styles.addonText} name='arrow-back'/>
			</View>
		}
	}else if(cord==-1){
		addon=<View style={styles.addon}>
			<Text style={styles.addonText}>AH</Text>
		</View>
	}else{
		addon=<View style={styles.addon}>
			<Text style={styles.addonText}>{row}{col}</Text>
		</View>
	}
	return addon;
}
const styles = StyleSheet.create({
    addon:{flex:1},
    addonText:{}
}); 
export default Addon;