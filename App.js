import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import Skeleton from './src/Skeleton';
import SkeletonOrgs from './src/SkeletonOrgs';
import SkeletonFollowers from './src/SkeletonFollowers';
import SkeletonBio from './src/SkeletonBio';

const Stack = createNativeStackNavigator();

function Home() {

  const [modal, setModal] = useState(false);
  const [id, setId] = useState([]);

  const navigation = useNavigation();

  const SearchID = () => {
    navigation.navigate('Profile', {
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
          <View style={styles.div}>
            <Text style={styles.textAlert}>Digite o nome de usuário</Text>

            <View style={styles.rowInput}>
              <TouchableOpacity style={styles.backButton} onPress={() => setModal(!modal)}>
                <Ionicons name="arrow-back-sharp" size={25} color="black" />
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
            </View>
          </View>
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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const search = route.params.id;


  const Repository = () => {
    navigation.navigate('Repo', {
      id: search,
    })
  };

  const Biography = () => {
    navigation.navigate('Bio', {
      id: search,
    })
  };

  const Followers = () => {
    navigation.navigate('Followers', {
      id: search,
    })
  };

  const Orgs = () => {
    navigation.navigate('Orgs', {
      id: search,
    })
  };

  const Resetar = () => {
    navigation.push('Home', {
      id: null,
    })
  };

  useEffect(() => {
    let timer = setInterval(() => {
      setLoading(false);
    }, 3000)
  }, []);

  useEffect(() => {
    fetch(`https://api.github.com/users/${search}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (

    <ScrollView>
       
      <SafeAreaView style={styles.containerProfile}>
     

     
         <Skeleton visible={loading} style={styles.test}> 
        
         <Image style={styles.squareProfile} source={{uri:data.avatar_url}}></Image>




            <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 10 }}>{data.name == null ? <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 10 }}> Usuário não encontrado</Text> : <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 10 }}>{data.name}</Text>}</Text>
            <Text style={{ fontSize: 20, color: '#8f8e93' }}>{data.login == null ? <Text style={{ fontSize: 20, color: '#8f8e93' }}>Erro, tente novamente</Text> : <Text style={{ fontSize: 20, color: '#8f8e93' }}>@{data.login}</Text>}</Text>
         </Skeleton>
        
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

          <TouchableOpacity style={styles.specifies} onPress={Orgs}>
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

        <View style={styles.whiteBack}>
        <TouchableOpacity style={styles.reset} onPress={Resetar}>
          <Ionicons name="exit-outline" size={20} color="black" />
          <Text>   </Text>
          <Text style={{ fontSize: 20, color: 'black' }}>Resetar</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const Followers = () => {
  const [followers, setFollowers] = useState([]);
  const route = useRoute();
  const search = route.params.id;
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let timer = setInterval(() => {
      setLoading(false);
    }, 3000)
  }, []);

  useEffect(() => {
    fetch(`https://api.github.com/users/${search}/followers`)
      .then((response) => response.json())
      .then((data) => setFollowers(data));
  }, []);

  return (

    followers.message || setFollowers == null ?
    
      <View style={styles.erroMessageBackground}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} >Este usuário não apresenta seguidores</Text>
      </View>
      :
      <View style={styles.repo}>
        <FlatList
          data={followers}
          keyExtractor={(element) => element.login}
          renderItem={({ item }) => {
            return (
              <SkeletonFollowers visible={loading}>
              <View style={{ borderWidth: 0.5, borderColor: '#ececec', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 80 }}>
                <Image style={styles.followersProfile} source={{ uri: item.avatar_url }} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }} >{item.login}</Text>
              </View>
              </SkeletonFollowers>
            
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${search}/repos`)
      .then((response) => response.json())
      .then((data) => setRepo(data));
  }, []);

  useEffect(() => {
    let timer = setInterval(() => {
      setLoading(false);
    }, 3000)
  }, []);

  return (

    repo.message ?

      <View style={styles.erroMessageBackground}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} >Este usuário não apresenta repositórios públicos</Text>
      </View>
      :
      <View style={styles.repo}>
        <FlatList
          data={repo}
          renderItem={({ item }) => {
            return (
              <SkeletonOrgs visible={loading}>
              <View style={{ borderWidth: 0.5, borderColor: '#ececec' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginTop: 10 }} >{item.name}</Text>
                <Text style={{ fontSize: 15, color: '#bfbfbf', marginLeft: 15, marginBottom: 10 }} >{item.description == null ? <Text style={{ fontSize: 15, color: '#bfbfbf', marginLeft: 15, marginBottom: 10 }}>Sem descrição</Text> : <Text style={{ fontSize: 15, color: '#bfbfbf', marginLeft: 15, marginBottom: 10 }}>{item.description}</Text>} </Text>
              </View>
              </SkeletonOrgs>
            );
          }}
        />
      </View>
  );
}

function Bio() {

  const [bio, setBio] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const search = route.params.id;


  useEffect(() => {
    fetch(`https://api.github.com/users/${search}`)
      .then((response) => response.json())
      .then((data) => setBio(data));
  }, []);

  useEffect(() => {
    let timer = setInterval(() => {
      setLoading(false);
    }, 3000)
  }, []);

  return (
    <View style={styles.containerBio}>
      <SkeletonBio visible={loading}>
       <Text style={styles.textbio}>{bio.bio == null ?<Text> Esse usário não possui biografia</Text>: <Text>{bio.bio}</Text>}</Text>
      </SkeletonBio> 
      </View>
  );
}

function Orgs() {

  const [org, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const search = route.params.id;


  useEffect(() => {
    fetch(`https://api.github.com/users/${search}/orgs`)
      .then((response) => response.json())
      .then((data) => setOrgs(data));
  }, []);

  useEffect(() => {
    let timer = setInterval(() => {
      setLoading(false);
    }, 3000)
  }, []);

  return (

    org.message ?

      <View style={styles.erroMessageBackground}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} >Este usário é inválido ou não apresenta organizçãoes</Text>
      </View>
      :
      <View style={styles.repo}>
        <FlatList
          data={org}
          renderItem={({ item }) => {
            return (
              <SkeletonOrgs visible={loading}>
              <View style={{ borderWidth: 0.5, borderColor: '#ececec' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginTop: 10 }} >{item.login}</Text>
                <Text style={{ fontSize: 15, color: '#bfbfbf', marginLeft: 15, marginBottom: 10 }} >{item.description}</Text>
              </View>
              </SkeletonOrgs>
              
            );
          }}
        />
      </View>
  );
}

export default function App() {

  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home}
          options={{ headerShown: false }} />
        <Stack.Screen name='Profile' component={Profile}
          options={{ headerShown: false }} />
        <Stack.Screen name='Bio' component={Bio} />
        <Stack.Screen name='Orgs' component={Orgs} />
        <Stack.Screen name='Repo' component={Repo} />
        <Stack.Screen name='Followers' component={Followers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f7fc',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
  },
  containerBio: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
  },

  containerSearch: {
    flex:1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 20,
  },

  containerSearchProfile: {
    widht:50,
    height:50,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 20,
    flexDirection:'row'
  },

  containerProfile: {
    flex: 1,
    backgroundColor: '#f8f7fc',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
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
    color: 'white',
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
    borderWidth: 1,
    borderColor: '#D3D3D3'
  },
  squareProfile: {
    backgroundColor: '#ececec',
    width: 200,
    height: 200,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection:'row',
    marginTop:80

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
  backButtonProfile: {
    width: 30,
    height: 30,
    backgroundColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
  
  },
  reset: {
    width: 380,
    height: 70,
    backgroundColor: '#ffffff',
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

  textbio: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
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

  followersProfile: {
    width: 50,
    height: 50,
    borderRadius: 60,
  },
  div: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  rowInput: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  erroMessageBackground: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  whiteBack:{
    backgroundColor:'white',
    width:500,
    height:200,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:80,
    marginTop:10
  },
  viewLupa:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'flex-end',
   
  }
});