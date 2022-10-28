import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Modal, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

// https://api.github.com/users/{id} -->  usuários
// https://api.github.com/users/{id}/followers --> seguidores
// https://api.github.com/users/{id}/repos --> repositórios
// https://api.github.com/users/{id}/orgs --> organizações

const Stack = createNativeStackNavigator();

function Home() {

  const [modal, setModal] = useState(false); 
  const [id, setId] = useState('');


  const navigation = useNavigation();

  const SearchID = () => {
    navigation.navigate ('Profile',{
      id: id,
    })
  };

  return (


    <SafeAreaView style={styles.container}>

      <Modal
        animationType='fade'
        transparent={true} 
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}
      >


        <SafeAreaView style={styles.containerSearch}>

        <View style ={styles.div}>
        <Text style={styles.textAlert}>Digite o nome de usuário</Text>
        </View>
          <TouchableOpacity style={styles.backButton} onPress={() => setModal(!modal)}>
            <Ionicons name="arrow-back-sharp" size={25} color="black"/>
          </TouchableOpacity>

          <TextInput style={styles.textInput}
            placeholder="User"
            keyboardType='default'
            value={id}
            onChangeText={idtext => setId(idtext)}
            
          />

          <TouchableOpacity style={styles.OkButton} onPress={SearchID} >
            <Text style={styles.text}>Ok</Text>
          </TouchableOpacity>



        </SafeAreaView>

       


      </Modal>

      <View style={styles.square}>
        <TouchableOpacity style={styles.lupa} onPress={() => setModal(true)}>
          <FontAwesome name="search" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Clique na lupa e escreva o nome do usuário (id) do Github que você deseja consultar
      </Text>

    </SafeAreaView>
  );
}

function Profile({ navigation }) {


  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [orgs, setOrgs] = useState(null);

  const route = useRoute();
  const search = route.params.id;

  const Repository = () => {
    navigation.navigate ('Repo',{
      id: search,
    })
  };

  const Biography= () => {
    navigation.navigate ('Bio',{
      id: search,
    })
  };

  const Followers= () => {
    navigation.navigate ('Followers',{
      id: search,
    })
  };


  useEffect(() => {
    fetch(`https://api.github.com/users/${search}`)
      .then((response) => response.json())
      .then((data) => {
        return setAvatar(data.avatar_url);
      });
  }, []);

  useEffect(() => {
    fetch(`https://api.github.com/users/${search}`)
      .then((response) => response.json())
      .then((data) => setUser(data.login));
  }, []);

  useEffect(() => {
    fetch(`https://api.github.com/users/${search}`)
      .then((response) => response.json())
      .then((data) => setName(data.name));
  }, []);

 

  return (

    
    <SafeAreaView style={styles.containerProfile}>
  
      <Image style={styles.squareProfile}source ={{uri:avatar}}/>


      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{name}</Text>
      <Text style={{ fontSize: 20, color: '#8f8e93' }}>@{user}</Text>

      <View style={styles.info}>

        <TouchableOpacity style={[styles.specifies, { borderTopEndRadius: 20, borderTopStartRadius: 20 }]} onPress={Biography}>

          <View style={styles.boxIcons}>
            <Ionicons name="person-outline" size={30} color="black" />
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15 }} >Bio</Text>
              <Text style={{ fontSize: 15, color: '#bfbfbf', marginLeft: 15 }} >Um pouco sobre o usuário</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'flex-end', marginLeft: 95 }}>
            <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
          </View>

        </TouchableOpacity>


        <TouchableOpacity style={styles.specifies}>
          <View style={styles.boxIcons}>
            <Feather name="headphones" size={30} color="black" />
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15 }} >Orgs</Text>
            <Text style={{ fontSize: 15, color: '#bfbfbf', marginLeft: 15 }} >Organização que o usuário faz parte</Text>
          </View>
          <View style={{ justifyContent: 'flex-end', margin: 25 }}>
            <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
          </View>

        </TouchableOpacity>


        <TouchableOpacity style={styles.specifies} onPress={Repository}>
          <View style={styles.boxIcons}>
            <Ionicons name="document-text-outline" size={30} color="black" />
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15 }} >Repositórios</Text>
            <Text style={{ fontSize: 15, color: '#bfbfbf', marginLeft: 15 }} >Lista contendo todo os repositórios</Text>
          </View>
          <View style={{ justifyContent: 'flex-end', marginLeft: 30 }}>
            <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
          </View>
        </TouchableOpacity >


        <TouchableOpacity style={[styles.specifies, { borderBottomEndRadius: 20, borderBottomStartRadius: 20 }]} onPress={Followers}>
          <View style={styles.boxIcons}>
            <MaterialCommunityIcons name="face-man" size={30} color="black" />
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15 }} >Seguidores</Text>
            <Text style={{ fontSize: 15, color: '#bfbfbf', marginLeft: 15 }} >Lista de seguidores</Text>
          </View>
          <View style={{ justifyContent: 'flex-end', marginLeft: 137 }}>
            <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.reset} onPress={() => navigation.popToTop()}>
        <Ionicons name="exit-outline" size={20} color="black" />
        <Text>   </Text>
        <Text style={{ fontSize: 20, color: 'black' }}>Resetar</Text>
      </TouchableOpacity>



    </SafeAreaView>
  );
}



const Followers = () => {
  const [followers, setFollowers] = useState([]);


  const route = useRoute();
  const search = route.params.id;


  useEffect(() => {
    fetch(`https://api.github.com/users/${search}/followers`)
      .then((response) => response.json())
      .then((data) => setFollowers(data));
  }, []);




  return (
    <View style={styles.repo}>
      <FlatList
        data={followers}
        keyExtractor={(element) => element.login}
        renderItem={({ item }) => {
          return (
            <Text style={styles.itemRepo}>{item.login}</Text>
          );
        }}
      />

    </View>
  );
}



const Repo = () => {
  const [repo, setRepo] = useState([]);

  const route = useRoute();
  const search = route.params.id;


  useEffect(() => {
    fetch(`https://api.github.com/users/${search}/repos`)
      .then((response) => response.json())
      .then((data) => setRepo(data));
  }, []);

  return (
    <View style={styles.repo}>
      <FlatList
        data={repo}
        keyExtractor={(element) => element.name}
        renderItem={({ item }) => {
          return (
            <Text style={styles.itemRepo}>{item.name}</Text>
          );
        }}
      />
    </View>
  );
}

function Bio() {

  const [bio, setBio] = useState(null);

  const route = useRoute();
  const search = route.params.id;


  useEffect(() => {
    fetch(`https://api.github.com/users/${search}`)
      .then((response) => response.json())
      .then((data) => setBio(data.bio));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', bottom: 20 }}>A Litte About This User</Text>
      <View style={styles.bio}>
        <Text style={styles.textbio}>{bio == null ? <Text> Esse usário não possui biografia</Text> : <Text>{bio}</Text>}</Text>
      </View>
    </View>
  );
}


export default function App() {

  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} 
          options={{headerShown: false}}/>
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='Bio' component={Bio} />
        <Stack.Screen name='Repo' component={Repo} />
        <Stack.Screen name='Followers' component={Followers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '##f8f7fc',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
  },
  containerSearch: {
    height:120,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'center',
    borderWidth:1,
    borderColor:'#D3D3D3',
    borderRadius: 20,
  },
  containerProfile: {
    flex: 1,
    backgroundColor: '#f8f7fc',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: "column",
    borderColor: "black"
  },

  lupa: {
    width: 60,
    height: 60,
    backgroundColor: '#000002',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,

  },
  textInput: {
    width: 200,
    height: 50,
    backgroundColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,

  },

  text: {
    color: '#b9b9b9',
    fontSize: 15,
    margin: 10,
    textAlign: 'center'

  },

  textAlert: {
    color: 'black',
    fontSize: 15,
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold'

  },
  square: {
    backgroundColor: '#fff',
    width: 200,
    height: 200,
    borderRadius: 60,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderWidth:1,
    borderColor:'#D3D3D3'
  },
  squareProfile: {
    backgroundColor: '#ececec',
    width: 200,
    height: 200,
    borderRadius: 60,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 50

  },
  info: {
    backgroundColor: '#ffffff',
    width: 380,
    height: 300,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#eeeeee'

  },
  OkButton: {
    width: 50,
    height: 50,
    backgroundColor: '#000002',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
    marginLeft: 10,
  
  },

  backButton: {
    width: 50,
    height: 50,
    backgroundColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
    marginRight: 20,
  },
  reset: {
    width: 380,
    height: 70,
    backgroundColor: '#ffffff',
    marginTop: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black'

  },
  specifies: {
    width: 380,
    height: 75,
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ececec',
  },

  boxIcons: {
    widht: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: 30,
    flexDirection: 'row'
  },

  bio: {
    width: 400,
    height: 300,
    backgroundColor: '#ececec',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black'
  },

  textbio: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center',
  },
  itemRepo: {
    widht: 100,
    height: 65,
    fontSize: 25,
    borderWidth: 0.5,
    borderColor: 'black',

  },
  repo: {
    flex: 1,
    backgroundColor: 'white',
  },

  div:{
    width:500,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    
   
  },
});