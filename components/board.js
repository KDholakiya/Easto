import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, ImageBackground, Button,Dimensions } from "react-native";
import { Icon } from "native-base";
// import Addon from "./AddonProvider.js"
// import PlaceComponent from "./PlaceComponent";
import { Text,View } from "react-native-animatable";
const d = Dimensions.get("window");
class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gridforPlacement: [
                [5, 0, 4, 40, 5],
                [10, -10, 40, -40, 0],
                [1,10, -1 ,30,3],
                [0, -20, 20, -30, 30],
                [5, 20, 2, 0, 5]
            ],
            readyToPlay: false,
            totalPlayer: this.props.player,
            gameGrid: [
                [[], [], [4,4,4,4], [], []],
                [[], [], [], [], []],
                [[1,1,1,1], [], [], [], [3,3,3,3]],
                [[], [], [], [], []],
                [[], [], [2,2,2,2], [], []],
            ],
            physicalGrid:[
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []],
            ],
            currentPlayer: 1,
            diceValue: 0,
            isKiller:[0,0,0,0],
            winStat:[0,0,0,0]
        };
    }
    componentDidMount() {
        this.setState({readyToPlay:true})
        this.physicalGridSetter();
    }

    physicalGridSetter=(firstTime=true)=>{
        physicalGrid=this.deepCopy(this.state.physicalGrid);
        logicalGrid=this.state.gameGrid;
        if(firstTime){
           for(i=0;i<physicalGrid.length;i++){
                for(j=0;j<physicalGrid.length;j++){
                    for(k=0;k<physicalGrid.length;k++){
                        if(logicalGrid[i][j][k]!==undefined){
                            player=logicalGrid[i][j][k];
                            physicalGrid[i][j][k]=this.gridItemSender(player,'zoomIn',1000);
                        }
                    }
                }
            }
        }
        this.setState({physicalGrid:physicalGrid});
    }
    getUniqueId=()=>{
        b=Board.a++;
        //console.warn(b)
        return b;
    }
    gridItemSender=(player=0,animat,timing=100)=>{
        let icon;
        let style;
        if(player==1){
            icon='ios-flame';
            style={color:'blue'}
        } 
        else if(player==2){
            icon='ios-star';
            style={color:'orange'}
        } 
        else if(player==3){
            icon='ios-flash';
            style={color:'red'}
        } 
        else if(player==4){
            icon='ios-flower';
            style={color:'green'}
        } 
        return (
            <View
                animation={animat}
                duration={timing}
                style={styles.kukra} 
                key={this.getUniqueId()} >
                <Icon name={icon} style={[styles.kukri,style]}/>
            </View>
        );
    }
    putKukra = (src_row, src_col, dest_row, dest_col, logicalGrid = [],item) => {
        let pGrid=this.deepCopy(this.state.physicalGrid);
        let iterate=0;
        let tempArray=[];
        if(typeof(item) == 'number'){
            temp=item;
            item=[];
            item.push(temp);
        }
        for(i=0;i<item.length;i++){
            for (j = pGrid[src_row][src_col].length; j >= 0; j--) {
                if (logicalGrid[src_row][src_col][j] == item[0]) {
                    tempArray.push(j);
                    pGrid[src_row][src_col][j]=this.gridItemSender(item[0],'zoomOut',200);
                    pGrid[dest_row][dest_col].push(this.gridItemSender(item[0],'zoomIn',200));

                    logicalGrid[dest_row][dest_col].push(logicalGrid[src_row][src_col][j]);
                    logicalGrid[src_row][src_col].splice(j, 1);
                    break;
                }
            }
        }
        this.afterEffect(src_row,src_col,tempArray,this.deepCopy(pGrid))
        this.setState({
            gameGrid: logicalGrid,
            physicalGrid:pGrid
        });
    }
    afterEffect=(src_row,src_col,temp,pGrid)=>{
        setTimeout(()=>{
            for(i=0;i<temp.length;i++){
                pGrid[src_row][src_col].splice(temp[i], 1);
            }
            this.setState({
                physicalGrid:pGrid
            });
        },180)
    }
    isSafePlace = (row,col) =>{
        let safe=[1,2,3,4,-1];
        for(i=0;i<safe.length;i++){
            if(this.state.gridforPlacement[row][col]==safe[i]) return true;
        };
        return false;
    }
    collision = (row,col,grid=[]) => {
        isCollide=true;
        let split=grid[row][col];
        let me=0;
        let others=[];
        if(this.isSafePlace(row,col) || grid[row][col].length==1){
            isCollide=false;
        }else{
            for(i=0;i<split.length;i++){
                if(split[i]==this.state.currentPlayer){
                    me++;
                }else{
                    if(others.length !== 0){
                        if(others[others.length-1]==split[i]){
                            others.push(split[i]);
                        }else{
                            isCollide=false;
                            break;
                        }
                    }else{
                        others.push(split[i]);
                    }
                }
            }
            if(isCollide){
                if(others.length == 0) isCollide=false;
                if(!(me>=others.length)) isCollide=false;  
            }
        }
        //IF COLLIDE IS POSSIBLE THEN...
        if(isCollide){
            this.setKiller();
            this.returnHome(row,col,others,grid)
        }
        if( (!isCollide) && ( (this.state.diceValue != 4) && (this.state.diceValue != 8) ) && (row!==2 && col!==2)){
            this.changeTurn();
        }else{
            this.setState({diceValue:0})
        }
    }
    getKiller=(player=this.state.currentPlayer)=>{
        var killr=this.deepCopy(this.state.isKiller);
        if(killr[player-1]==1) return true;
        return false;
    }
    setKiller=(player=this.state.currentPlayer)=>{
        if(this.state.isKiller[player-1]==0){
            var killr=this.deepCopy(this.state.isKiller);
            killr[player-1]=1;
            this.setState({ isKiller:killr});
        }
    }
    returnHome=(src_row,src_col,item,grid)=>{
        let dest_row;
        let dest_col;
        for(let i=0;i<grid.length;i++){
            for(let j=0;j<grid.length;j++){
                if(this.state.gridforPlacement[i][j]==item[0]){
                    dest_col = j;
                    dest_row = i;
                }
            }
        }
        this.goBack(src_row,src_col,dest_row,dest_col,grid,item);
    }
    goBack=(src_row,src_col,dest_row,dest_col,grid=[],item)=>{
        this.setState({readyToPlay:false})
        let player;
        let last_row = src_row;
        let last_col = src_col;
        if(typeof(item) == 'number'){
            player=item;
        }else{
            player=item[0]
        }
        if(src_row != dest_row || src_col != dest_col){
            dir=this.getDir(src_row,src_col,true,player);
            //console.log('step :',src_row,src_col,'dir >',dir,'item >',item);
            if(dir == 1) src_col--;
            else if(dir == 2) src_row++;
            else if(dir == 3) src_col++;
            else if(dir == 4) src_row--;
            this.putKukra(last_row, last_col, src_row, src_col, grid,item);
            last_row = src_row;
            last_col = src_col;
            setTimeout(()=>{
                this.goBack(src_row,src_col,dest_row,dest_col,grid,item);
            },200)
        }else{
            //console.log('step :',src_row,src_col,(src_row != dest_row && src_col != dest_col));
            //console.log('reached home');
            this.setState({readyToPlay:true})
        }
    }
    changeTurn=()=>{
        CurrentTurn=this.state.currentPlayer;
        if(CurrentTurn != 4) CurrentTurn++;
        else CurrentTurn=1;
        this.setState({
            diceValue:0,
            currentPlayer:CurrentTurn
        })
    }
    moveKukra = (row, col, grid = [], diceValue = this.state.diceValue) => {
        let this_row = row;
        let this_col = col;
        let last_row = row;
        let last_col = col;
        let dir = this.getDir(this_row, this_col)
        let i = 0;
        this.setState({readyToPlay:false})
        delay = () => {
            //console.log('dir',dir); 
            if (dir === 2) this_row--; //up
            else if (dir === 1) this_col++; //right
            else if (dir === 4) this_row++; //down
            else if (dir === 3) this_col--; //left
            dir = this.getDir(this_row, this_col,false,this.state.currentPlayer,i+1)

            this.putKukra(last_row, last_col, this_row, this_col, grid,this.state.currentPlayer);
            last_row = this_row;
            last_col = this_col;
            i++;
            //TODO:set delay to 100ms
            if (i < diceValue) setTimeout(delay,200);
            else{
                setTimeout(() => {
                    if(this.state.gridforPlacement[this_row][this_col] !== -1 ){
                        this.collision(this_row,this_col,this.deepCopy(grid));
                    }else{
                        stat=this.state.winStat;
                        stat[this.state.currentPlayer-1]=stat[this.state.currentPlayer-1]+1;
                        if(stat[this.state.currentPlayer-1]==4) {
                            console.warn("winner winner Chiken dinner")
                        }
                        grid[this_row][this_col]=0;
                        pgrid=this.deepCopy(this.state.physicalGrid);
                        pgrid[this_row][this_col]=null;
                        this.setState({
                            winStat:stat,
                            logicalGrid:grid,
                            physicalGrid:pgrid
                        });
                    }
                    this.setState({readyToPlay:true}) 
                }, 200);
            }
        };
        delay();
        //console.log('DESTINATION :', this_row, this_col);
    }
    canBePass=(row,col,remainDiceValue,item)=>{
        if(this.isInside(row,col)){
            if( (this.state.diceValue - remainDiceValue == 1) && this.getKiller()){
                return item;
            } 
            return false;
        }
        return item;
    }
    moveInside=(row,col,isReverse,item=this.state.currentPlayer,remainDiceValue)=>{
        if(isReverse){
            if(this.state.gridforPlacement[row][col]==(item)*(-10)) return item;
            else return false;
        }else{
            if(this.state.gridforPlacement[row][col]==(item)*10){
                return this.canBePass(row,col,remainDiceValue,item);
            } 
            else return false;
        }
    }
    //Moving Direction
    getDir=(row,col,isReverse=false,parcel,remainDiceValue)=>{
        if(a=this.moveInside(row,col,isReverse,parcel,remainDiceValue)) return a;
        else{
            if(isReverse){
                if      ( (row !== 0 && col == 0) || (col == 3 && (row > 1 && row !== 4)) ) return 4 //up
                else if ( (row == 0 && col !== 4) || (row == 3 && (col < 3 && col !== 0)) ) return 3 //right
                else if ( (row !== 4 && col == 4) || (col == 1 && (row < 3 && row !== 0)) ) return 2 //down
                else if ( (row == 4 && col !== 0) || (row == 1 && (col > 1 && col !== 4)) ) return 1 //left
            }else{
                if      ( (row !== 4 && col == 0) || (col == 3 && (row < 3 && row !== 0)) ) return 4 //down
                else if ( (row == 0 && col !== 0) || (row == 3 && (col > 1 && col !== 4)) ) return 3 //left 
                else if ( (row !== 0 && col == 4) || (col == 1 && (row > 1 && row !== 4)) ) return 2 //up 
                else if ( (row == 4 && col !== 4) || (row == 1 && (col < 3 && col !== 0)) ) return 1 //right 
            }
        }
    }
    isInside=(x,y)=>{
        if( (x>0 && x<4) && (y>0 && y<4) ) return true;
        return false;
    }
    // Deep Copy Of An Array
    deepCopy=array=>[...array].map(item=>item instanceof Array ? this.deepCopy(item):item)
	BoxTouchHandler(row,col){
        if(row==0 && col==4){
            //console.log(this.state.physicalGrid)
            //console.log(this.state.gameGrid)
        }
        if(this.state.diceValue==0 || !(this.state.readyToPlay) || (row == 2 && col == 2) ) return;
        let grid=this.deepCopy(this.state.gameGrid)
        if(grid[row][col].includes(this.state.currentPlayer)){
            this.moveKukra(row,col,grid)
        }else{
            // console.log("in valid touch");
        }
    }
	PutButton(row,col){
		//let cord=this.state.gridforPlacement[row][col];
		return(
			<TouchableOpacity activeOpacity={1} key={this.getUniqueId()} style={styles.box}
				onPress={()=>this.BoxTouchHandler(row,col)}>
                <View style={{flex:1}}>
                        <View style={styles.innerWrapper}>
                            <View style={styles.innerWrapper}>                           
                                {this.state.physicalGrid[row][col]}
                            </View>
                        </View>
                </View>
			</TouchableOpacity>
		)
    }
	renderBoard(){
        let board=[];
		for(i=0;i<5;i++){
			temp=[];
			for(j=0;j<5;j++){
				temp.push(this.PutButton(i,j))
			}
			board.push(<View key={this.getUniqueId()} style={styles.row}>{temp}</View>);
		}
		return (
        <View>
            {board}
        </View>)
	}
	dice=()=>{
        if(this.state.diceValue != 0) return;
        if(!this.state.readyToPlay) return;
        let possible=[1,2,1,2,3,3,3,4,8];
        let random=possible[Math.floor(Math.random() * 9)]
		this.setState({
			diceValue:random
        })
	}
	render(){
		return(
			<View style={{flex:1,justifyContent:'center'}}>
                <View>
                    <Text style={{textAlign:'center',fontSize:20}}>
                        It's Player {this.state.currentPlayer} Turn
                    </Text>
                </View>
                <View>
                    <ImageBackground style={{width:null,height:null}} 
                        source={require('../assets/board.png')}> 
                        {this.renderBoard()}
                    </ImageBackground>
                </View>
				
				<View>
					<Text style={{fontSize:26,textAlign:'center'}}>
                        {this.state.diceValue}
                    </Text>
                    <View animation={"zoomIn"}>
                        <Button title="Roll A dice" onPress={()=>this.dice()}/>
                    </View>
                </View>
                <View style={styles.winist}>
                    <View style={styles.listitem}>
                        <Text>Player 1</Text>
                        <Text>{this.state.winStat[0]}</Text>
                    </View>
                    <View style={styles.listitem}>
                        <Text>Player 2</Text>
                        <Text>{this.state.winStat[1]}</Text>
                    </View>
                    <View style={styles.listitem}>
                        <Text>Player 3</Text>
                        <Text>{this.state.winStat[2]}</Text>
                    </View>
                    <View style={styles.listitem}>
                        <Text>Player 4</Text>
                        <Text>{this.state.winStat[3]}</Text>
                    </View>
                </View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
    row:{flexDirection:'row'},
    //row:{flexDirection:'row',transform:[{ rotateX: '45deg' }, { rotateZ: '0.785398rad' }]},
    box:{
        height:( (d.width/5) - (3) ),
        width:( (d.width/5) - (3) ),
        borderWidth:0
    },
    addon:{flex:1},
    addonText:{},
    kukra:{
        flex:3,
        flexWrap:'wrap',
    },
    kukri:{
        fontSize:20,
        flex:1,
        textAlign:'center',
        textAlignVertical:'center'
    },
    innerWrapper:{flex:1,flexDirection:'row',flexWrap:"wrap",alignItems:'flex-end'},
    winist:{
        marginTop: 30,
        flex:4,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    listitem:{ flex:1, alignItems:'center', }
}); 

export default Board;