import{
    View,
    Image,
    Text,
    SafeAreaView,
    TextInput,
    Platform,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    ImageBackground
} from 'react-native'
import React, { useCallback } from 'react'
import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { theme } from '../theme/index'


import { CalendarDaysIcon, MagnifyingGlassIcon, MapPinIcon } from 'react-native-heroicons/outline'
import { fetchLocations } from '../api/weather'
import { reject } from 'lodash'


const platform = Platform.OS;

const SliceApp = ()=>{
  
  const [showSerch, toggleSearch] = useState(false);
  const [data,setData]= useState('')
  console.log(data)

    const handleSearch = (value) =>{
      console.log(value.nativeEvent.text)
      const target = value.nativeEvent.text;

      if(target.length > 2){
       const promis = new Promise((res,rej)=>{
        fetchLocations({cityName:target}).then(
          val => {
            const data_json = val;
            if(!val) rej('loading...')
            res(data_json)
          }
        )
       })
         promis.then(
          (val) => setData(val),
          (err) => console.log(err)
         ) 
    
      }
    } 

    return(
      <View
        className='flex-1 relative'>
        <StatusBar style='light'/>
        <ImageBackground
          className='h-full w-full min-h-screen'
          resizeMode='cover'
          blurRadius={70}
          source={require('../assets/images/bg.png')}
        >
        
        <View 
         style={platform == 'android'?{marginTop:50}:undefined}
         className='flex flex-1'>
          {/* search section */}
          <View 
            style={{height:'7%'}}
            className='mx-4 relative z-10'
          >
            <View
              className='flex-row justify-end items-center rounded-full'
              style={{backgroundColor: showSerch? theme.bgwhite(0.2) : 'transparent'}}
              >
              {showSerch? (
                <TextInput
                  onChange={handleSearch}
                  placeholder='Search city'
                  placeholderTextColor={"lightgray"}
                  className='flex-1 pl-6 pb-1 h-10 text-base text-white'
                />
                ):null
              }
              <TouchableOpacity
                onPress={()=>toggleSearch(!showSerch)}
                style={{backgroundColor:theme.bgwhite(0.3)}}
                className='rounded-full p-3 m-1'
              >
                <MagnifyingGlassIcon color={"white"} size={25}/>  
              </TouchableOpacity>
            </View>
          </View>
          {/* forecast section */}
          {data !== 'loading...'  && data !== '' ? 
            <View className='mx-4 flex justify-around flex-1 mb-2'>
              <Text 
                className='text-white text-center text-2xl font-blod'
              >{data.resolvedAddress.split(',')[0]}
                <Text className='text-lg font-semibold text-gray-300'>
                ,{data.resolvedAddress.split(',')[1]}
                </Text>
              </Text>
              {/* weather Image */}
              <View className="flex-row justify-center">
                <Image 
                  source={require('../assets/images/partlycloudy.png')}
                  className='w-52 h-52'
                />
              </View>
              {/* degree celcuis */}
              <View  className='space-y-2'>
                <Text className='text-center font-bold text-white text-6xl ml-5'>
                {Math.round((data.currentConditions.temp-35)*5/9)}
                </Text>
                <Text className='text-center tracking-widest text-white text-xl ml-5'>
                {data.currentConditions.conditions}
                </Text>
              </View>
              {/* other status */}
              <View className='flex-row justify-between mx-4'>
                <View className='flex-row space-x-2 items-center'>
                  <Image
                    source={require('../assets/icons/wind.png')}
                    className='h-6 w-6'
                  />
                  <Text className='text-white font-semibold text-base'>
                  {Math.round(data.days[0].windspeed)+'km'}
                  </Text>
                </View>
                <View className='flex-row space-x-2 items-center'>
                  <Image
                    source={require('../assets/icons/drop.png')}
                    className='h-6 w-6'
                  />
                  <Text className='text-white font-semibold text-base'>
                  {Math.round(data.days[0].humidity)+'%'}
                  </Text>
                </View>
                <View className='flex-row space-x-2 items-center'>
                  <Image
                    source={require('../assets/icons/sun.png')}
                    className='h-6 w-6'
                  />
                  <Text className='text-white font-semibold text-base'>
                  {data.days[0].sunrise +"AM"}
                  </Text>
                </View>
              </View>
            </View>
          :null}
          {/* forecast for next days */}
          {data !== 'loading...'  && data !== '' ? 
            <View className='mb-2 space-y-3'>
              <View className='flex-row items-center mx-5 space-x-2'>
                <CalendarDaysIcon size={22} color={'white'}/>
                <Text className='text-white text-base'>Today forecast</Text>
              </View>
              <ScrollView
                horizontal
                keyboardDismissMode='on-drag'
                contentContainerStyle={{paddingHorizontal:15}}
                showsHorizontalScrollIndicator={false}
              >
                {data.days[0].hours.map(item=>{
                  return(
                    <View

                      className='flex items-center justify-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                      style={{backgroundColor: theme.bgwhite(0.15)}}
                    >
                      <Image 
                        source={require('../assets/images/heavyrain.png')}
                        className='h-11 w-11'
                      />
                      <Text className='text-white'>{item.datetime} AM</Text>
                      <Text className='text-white text-xl font-semibold'>
                      {Math.round((item.temp-35)*5/9)}
                      </Text>
                    </View>
                  )
                })}
                
                {/* ----------- */}
              </ScrollView>
            </View>
          :null}
        </View>
        </ImageBackground>
      </View>
    )
}

export default SliceApp