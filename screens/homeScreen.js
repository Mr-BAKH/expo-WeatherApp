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


import { CalendarDaysIcon, MagnifyingGlassIcon  } from 'react-native-heroicons/outline'
import { fetchLocations } from '../api/weather'
import { searchImage } from '../api/image'


const platform = Platform.OS;

const SliceApp = ()=>{
  
  const [showSerch, toggleSearch] = useState(false);
  const [data, setData]= useState('');
  const [image, setImage] = useState('')

  const handleSearch = (value) =>{
  
    const target = value.nativeEvent.text;

    if(target.length > 2){
      const promis = new Promise((res,rej)=>{
      fetchLocations({cityName:target}).then(
        val => {
          const data_json = val;
          if(!val) rej('loading Weather...')
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

  //  set image ----------------
        const setImagePromis = async(val)=>{
          try{
            const response = await searchImage({title: val})
            setImage(response)
          }catch(err){
            console.log("Error from loading image",err)
            return null
          }
        }
          
if(data !== 'loading...'  && data !== ''){
  setTimeout(() => {
      const getIconPromise = new Promise((res,rej)=>{
        const icon = setImagePromis(data.currentConditions.icon +'sky-hd')
        if(icon.ok) res(icon)
        rej('loading...')
      })
      getIconPromise.then(
        val => console.log(val),
        err => console.log(err)
      ) 
  }, 2000);
  
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
                  blurRadius={0.3}
                  resizeMode='cover'
                  source={image !== '' ?{uri: image.images_results[0].thumbnail}:require('../assets/images/partlycloudy.png')}
                  className='w-60 h-60 rounded-full'
                />
              </View>
              {/* degree celcuis */}
              <View  className='space-y-2 flex items-center justify-center'>
                <Text className='font-bold text-white text-6xl'>
                {Math.round((data.currentConditions.temp-35)*5/9)} C
                </Text>
                <Text className='py-2 tracking-widest w-full bg-white/5 text-center text-white text-xl'>
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
          :
          // aboute me
           <View
             style={{backgroundColor:theme.bgwhite(0.1)}}
             className= 'w-[80%] py-10 px-5 bg-gray-700  rounded-lg m-auto flex  items-center just'
           >
            <Image
             source={require('../assets/icons/logo192.png')}
             resizeMode='contain'
             className="w-48 h-48 "
             />
             <Text className='text-white font-semibold text-[20px]'>Designed by Mr.bakh</Text>
             <View
               style={{backgroundColor: theme.bgwhite(0.1)}}
               className="mt-5 flex p-2 flex-row items-center w-full rounded-md justify-center"
             >
              <Image source={require('../assets/icons/vecteezy_whatsapp-logo-transparent-png_22101124_293.png')}
               className="w-10 h-10"
              />
              <Text
                className='text-white font-bold text-[19px]'
              >+98 915 496 8488</Text>
            </View>
            <View
             className='p-5 mt-5 rounded-md bg-black/5'
            >
              <Text
              className= 'p-2 text-center text-white text-[18px] font-bold'
              >How to Start</Text>
              <Text
                className="text-white text-center"
              >
                Tap on the magnify and type your City Name, enjoy!
              </Text>
            </View>
           </View> 
          }
          {/* forecast for next days */}
          {data !== 'loading...'  && data !== '' ? 
            <View className='space-y-2 mb-5'>
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
                {data.days[0].hours.map((item,index)=>{
                  return(
                    <View
                      key={item.datetimeEpoch}
                      className='flex items-center justify-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                      style={{backgroundColor: theme.bgwhite(0.15)}}
                    >
                      <Image 
                        source={image !== '' ?{uri: image.images_results[index].thumbnail}:require('../assets/icons/icons8-temperature-48.png')}
                        className='h-11 w-11 rounded-full'
                      />
                      <Text className='text-white'>{item.datetime} AM</Text>
                      <Text className='text-white text-xl font-semibold'>
                      {Math.round((item.temp-35)*5/9)} C
                      </Text>
                    </View>
                  )
                })}
              </ScrollView>
            </View>
          :null}
        </View>
        </ImageBackground>
      </View>
    )
}

export default SliceApp