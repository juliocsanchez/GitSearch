import { StyleSheet, Text, View, Animated } from 'react-native';
import React, {useEffect} from 'react';

export default function SkeletonOrgs({visible, children}) {

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

      <View style = {styles.skeletonBio}>

      <Animated.View style={{
          width:'30%',
          height:'100%',
          opacity: 0.5,
          backgroundColor:'#fffafa',
          transform:[{ translateX: translateX}]
        }}>
        </Animated.View>
      </View>
      <View style = {styles.skeletonBio1}>

      <Animated.View style={{
          width:'30%',
          height:'100%',
          opacity: 0.5,
          backgroundColor:'#fffafa',
          transform:[{ translateX: translateX}]
        }}>
        </Animated.View>
      </View>
      
      <View style = {styles.skeletonBio2}>

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
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
  
  },
  square:{
    width:200,
    height:50,
    backgroundColor:'#ececec',
    borderRadius:60,
    overflow:'hidden',
    marginTop:70
  
  },
  skeletonBio:{
    width:400,
    height:20,
    backgroundColor:'#ececec',
    borderRadius:60,
    marginTop:10,   
  },
  skeletonBio1:{
    width:300,
    height:20,
    backgroundColor:'#ececec',
    borderRadius:60,
    marginTop:10,   
  },
  skeletonBio2:{
    width:200,
    height:20,
    backgroundColor:'#ececec',
    borderRadius:60,
    marginTop:10,   
  },
});
