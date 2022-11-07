import React from "react";
import {View , Text, StyleSheet, Dimensions} from 'react-native';

const {widht} = Dimensions.get('window');

export default function Skeleton() {

    return(

        <View style={styles.container}>
        <View style={styles.card}>  

                <View style={{backgroundColor: '#ececec', width: 200, height: 200, borderRadius: 60, marginTop: 20}}>
                  
                {/* <View style={{backgroundColor: '#ececec', height:32, widht:20, borderRadius:20, marginTop:210}}></View>
                <View style={{backgroundColor: '#ececec', height: 32, borderRadius: 10, marginTop:10}}></View> */}
                </View>
        </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container:{
      margin:10
    },
    card:{
        width: widht - 20,
        flexDirection:'column',
        justifyContent:'space-around'
    },
});