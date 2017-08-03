/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import {
   AppRegistry,
   Text,
   View,
   Button,
   FlatList,
   StyleSheet,
   ListView,
   Navigator,
   Image,
 } from 'react-native';
 import { StackNavigator } from 'react-navigation';


 export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: '测试',
  };


  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
          <FlatList
            data={[
              {key: 'Devin'},
              {key: 'Jackson'},
              {key: 'James'},
              {key: 'Joel'},
              {key: 'John'},
              {key: 'Jillian'},
              {key: 'Jimmy'},
              {key: 'Julie'},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          />

        <Text>1</Text>


        <Button
          onPress={() => navigate('Chat')}
          title="点吧"
        />
      </View>
    );
  }
}
//----------
 class ChatScreens extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {r1 !== r2}});
        this.state = {
            dataSource: ds,
            load:false,
            text:''
        };
    }
    componentWillMount(){
        this.getNet();
    }
    getNet(){
        fetch('https://api.douban.com/v2/movie/coming_soon')//请求地址
        //fetch('https://facebook.github.io/react-native/movies.json')//请求地址
        .then((response) => response.json())//取数据
        .then((responseText) => {//处理数据
            //通过setState()方法重新渲染界面
            console.log("====== " + responseText.title);
            console.log("+++++" + responseText.subjects[0].images.small);
            // console.error("====== " + responseText.title);
            this.setState({
                //改变加载ListView
                load: true,
                //设置数据源刷新界面
                dataSource: this.state.dataSource.cloneWithRows(responseText.subjects),
            })
        })
        .catch((error) => {
            console.warn(error);
        }).done();
    }
    static navigationOptions = {
        title: '电影信息在此',
    };

    render() {
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData)=>
                        <View style={styles.row} >
                            <Image
                                style={{width: 65, height: 100, marginTop: 5 }}
                                source={{uri: rowData.images.small}}/>
                                <Text>{rowData.title}</Text>
                            </View>}
                        />
                    </View>
                );
            }
        }


//-------------
class ChatScreen extends React.Component {
  static navigationOptions = {
    title: '下一页电影信息',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>2</Text>
        <Button
          onPress={() => navigate('Lan')}
          title="电影信息"
        />
      </View>
    );
  }
}
//----------------
class Lans extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    return (
      <View>
        <Text>3</Text>

      </View>
    );
  }
}



/*

import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';

export default class FlatListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View>
    );
  }
}
*/
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 50,
  },
  item: {
    backgroundColor: '#ccc',
    color: '#3090f0',
    borderBottomColor: '#f09030',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
}
})

// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => FlatListBasics);





const cao = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
  Lan: {screen: ChatScreens }
  //Lans
});
AppRegistry.registerComponent('cao', () => cao);
