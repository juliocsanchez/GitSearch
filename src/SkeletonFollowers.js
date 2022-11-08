import { StyleSheet, Text, View, Animated } from 'react-native';
import React, {useEffect} from 'react';

export default function Skeleton({visible, children}) {

const AnimatedValue = new Animated.Value(0);   
const translateX = AnimatedValue.interpolate({
  inputRange:[0,1],
  outputRange:[-10,100]

}) 

useEffect(() => {

  circleAnimated();

  return () => circleAnimated();

}, []);

const circleAnimated = () => {
  AnimatedValue.setValue(0)
  Animated.timing(
    AnimatedValue,
    {
      toValue:7,
      duration:350,
      useNativeDriver: false
    }
  ).start(() => {
    setTimeout(() => {
      circleAnimated()
    },1000);
  })
}

if (visible){

return (
    <View style={styles.container}>

      <View style = {styles.followersProfile}>
        
        <Animated.View style={{
          width:'30%',
          height:'100%',
          opacity: 0.5,
          backgroundColor:'#fffafa',
          transform:[{ translateX: translateX}]
        }}>
          
        </Animated.View>

        </View>   
      <View style = {styles.skeletonName}>

      <Animated.View style={{
          width:'30%',
          height:'100%',
          opacity: 0.5,
          backgroundColor:'#fffafa',
          transform:[{ translateX: translateX}]
        }}>
          
        </Animated.View>
      </View>
    </View>
  );
}
    return(
        <>
        {children}
        </>
    );
}

const styles = StyleSheet.create({
  container: {
   flex:1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection:'column',
    flexDirection:'row',
    marginTop:30
  },
  skeletonName:{
    width:300,
    height:40,
    backgroundColor:'#ececec',
    borderRadius:60,
  },
  followersProfile: {
    width: 50,
    height: 50,
    borderRadius: 60,
    backgroundColor:'#ececec',
    marginRight:5
  },
});
