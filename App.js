import {View, Text, Image, StatusBar,FlatList,TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayer ,{ Capability,
  State,
  usePlaybackState,
  useProgress,}from 'react-native-track-player';
// import { useTrackPlayerEvents, Event, State } from 'react-native-track-player';
import {songsList} from './src/Songs';


const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const playbackState = usePlaybackState()

  useEffect(()=>{
setupPlayer()
  },[])
  const setupPlayer =async()=>{
    try{
      await TrackPlayer.setupPlayer()
      await TrackPlayer.updateOptions({
        // Media controls capabilities
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],

        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [Capability.Play, Capability.Pause],

        // Icons for the notification on Android (if you don't like the default ones)
      });
      await TrackPlayer.add(songsList)
    }catch(e){

    }
  }
  return (
    // to insatll linear gradient the command is npm install --save react-native-linear-gradient
    <LinearGradient
      colors={['#AEA1AA', '#222623', '#8E928F']}
      style={{flex: 1}}>
      {/* to hide the statusbar  */}
      <StatusBar translucent backgroundColor={'transparent'} />
      <Image
        source={require('./src/images/left.png')}
        style={{
          width: 20,
          height: 20,
          tintColor: 'white',
          marginTop: 50,
          marginLeft: 20,
        }}
      />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 20,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '80%',
            height: 37,
            backgroundColor: 'white',
            borderRadius: 3,
            flexDirection: 'row',
            paddingLeft: 15,
            alignItems: 'center',
          }}>
          <Image
            source={require('./src/images/search2.png')}
            style={{width: 24, height: 24}}
          />
          <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
            {' '}
            Find in Playlist
          </Text>
        </View>
        <View
          style={{
            width: '18%',
            height: 37,
            backgroundColor: 'white',
            borderRadius: 3,
            justifyContent: 'center',
            marginLeft: 10,
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold'}}> Sort </Text>
        </View>
      </View>
      <Image
        source={{uri: songsList[currentIndex].artwork}}
        style={{
          width: '70%',
          height: '34%',
          alignSelf: 'center',
          marginTop: 20,
          borderRadius: 5,
          objectFit: 'contain',
        }}
      />
      <View style={{flexDirection: 'row', paddingLeft: 20, marginTop: 15}}>
        <Image
          source={require('./src/images/spotify.png')}
          style={{width: 20, height: 20}}
        />
        <Text style={{color: 'white', fontSize: 14, marginLeft: 10}}>
          {' '}
          English songs
        </Text>
      </View>
      <View style={{flexDirection: 'row', paddingLeft: 20, marginTop: 15}}>
        <Text style={{color: '#EBDAE3', fontSize: 12, marginLeft: 10}}>
          {' '}
          20,568 saves
        </Text>
        <Text style={{color: '#EBDAE3', fontSize: 12, marginLeft: 10}}>
          {' '}
          3h 34m
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          marginTop: 12,
          justifyContent: 'space-between',
          alignSelf: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./src/images/plus.png')}
            style={{width: 18, height: 18, tintColor: '#EBDAE3'}}
          />
          <Image
            source={require('./src/images/arrow-down.png')}
            style={{
              width: 18,
              height: 18,
              tintColor: '#EBDAE3',
              marginLeft: 15,
            }}
          />
          <Image
            source={require('./src/images/option.png')}
            style={{
              width: 18,
              height: 18,
              tintColor: '#EBDAE3',
              marginLeft: 15,
            }}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./src/images/suffle.png')}
            style={{width: 30, height: 30, tintColor: '#EBDAE3'}}
          />
          <TouchableOpacity onPress={async()=>{
            if(State.Playing==playbackState){
              await TrackPlayer.pause() // if condition match means song is playing , so call pause() method 
            }else{
              await TrackPlayer.skip(currentIndex)
            await TrackPlayer.play() // if condition match means song is pause , so call play() method  
            }
          }}> 
           {/* commit  */}
           {State.Playing == playbackState ? (
              <Image
                source={require('./src/images/pause.png')}
                style={{
                  width: 38,
                  height: 38,
                  marginLeft: 18,
                  marginRight: 15,
                  tintColor: '#3ad934',
                }}
              />
            ) :  (
              <Image
                source={require('./src/images/play-button.png')}
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 20,
                  marginRight: 10,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={{marginBottom:15}}
        data={songsList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                with: '100%',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
                paddingRight:20,
                marginTop:10
              }}>
               <View style={{flexDirection:'row'}}>
               <Image source={{uri:item.artwork}} style={{width:50,height:50,borderRadius:5,objectFit:'fill'}}/>
                <View style={{marginLeft:10}}>
                  <Text style={{color:'white'}}>{item.title}</Text>
                  <Text style={{color:'white',fontSize:10}}>{item.artist}</Text>
                </View>
               </View>
               <Image source={require('./src/images/option.png')} style={{width:18,height:18,tintColor:'#EBDAE3'}}/>
              </TouchableOpacity>
          );
        }}
      />
    </LinearGradient>
  );
};

export default App;
