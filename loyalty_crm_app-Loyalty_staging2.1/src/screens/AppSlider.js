// React Native App Intro Slider using AppIntroSlider
// https://aboutreact.com/react-native-app-intro-slider/
// Simple Intro Slider

// import React in our code
import React, { useState, useRef, useContext } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableHighLight,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider';
// import { TouchableOpacity } from 'react-native-gesture-handler'

import { hideBS, showBS } from '../context/actions/common';
import { GlobalContext } from '../context/Provider';


const data = [
  {
    id: "15",
    title: "eyebrow",
    display_single_time: "0",
    skip: "1",
    skip_label: "Skip",
    skip_position: "top-right",
    skip_bg_color: "#fff000",
    skip_font_color: "#b54498",
    done: "1",
    done_label: "done",
    done_position: "bottom-right",
    done_bg_color: "#b54498",
    done_font_color: "black",
    pagination: "0",
    bg_color: "#f6e9f1",
    banner: [
      {
        unique_id: "15_19",
        name: "ntro Slide 1",
        component_data: [
          {
            type: "blank",
            data: null,
            file: null,
            size: "",
            align: "center",
            color: "",
            height: 10
          },
          {
            key: 's1',
            type: "image",
            data: null,
            file: require('../assets/images/slider_image/1_1.png'),
            color: null,
            size: null,
            align: 'center',
            height: 200,

          },
          {
            key: 's3',
            type: "text",
            data: 'EXPLORE',
            color: '#b64499',
            file: null,
            size: 32,
            align: 'center',
            height:"",
          },
          {
            type: "text",
            data: "at your convenience",
            file: null,
            size: 18,
            align: "center",
            color: "#b54498",
            height: "",
          },
          {
            key: 's3',
            type: "text",
            data: "Book or reschedule your next appointment\r\nwith just a few steps anytime, anywhere!",
            file: null,
            color: '#b64499',
            size: 20,
            align: 'center',
            height: "",
            // width: '100%'
          },
          {
            key: 's1',
            type: "image",
            data: null,
            file: require('../assets/images/slider_image/1_2.png'),
            color: "#fff000",
            size: null,
            align: 'center',
            height: 200,

          },
          
        ]
      }, {
        unique_id: "15_19",
        name: "Intro Slide 2",
        component_data: [
          {
            type: "blank",
            data: null,
            file: null,
            size: "",
            align: "center",
            color: "",
            height: 10
          },
          {
            key: 's1',
            type: "image",
            data: null,
            file: require('../assets/images/slider_image/1_3.png'),
            color: null,
            size: null,
            align: 'center',
            height: 200,

          },
          {
            key: 's3',
            type: "text",
            data: 'ENJOY',
            color: '#b64499',
            file: null,
            size: 32,
            align: 'center',
            font: 'bold',
            height: "",
            // height:50,
          },
          {
            type: "text",
            data: "a personalized experience",
            file: null,
            size: 18,
            align: "center",
            color: "#b54498",
            height: "",
          },
          {
            key: 's3',
            type: "text",
            data: "Be notified about upcoming appointments and\r\nview all completed bookings in one place!",
            file: null,
            color: '#b64499',
            size: 20,
            align: 'center',
            height: "",
            // width: '100%'
          },
          {
            key: 's1',
            type: "image",
            data: null,
            file: require('../assets/images/slider_image/1_4.png'),
            color: "#fff000",
            size: null,
            align: 'center',
            height: 200,
          },
        ]
      },
      {
        unique_id: "15_19",
        name: "Intro Slide 2",
        component_data: [
          {
            type: "blank",
            data: null,
            file: null,
            size: "",
            align: "center",
            color: "",
            height: 10
          },
          {
            key: 's1',
            type: "image",
            data: null,
            file: require('../assets/images/slider_image/1_5.png'),
            color: null,
            size: null,
            align: 'center',
            height: 200,

          },
          {
            key: 's3',
            type: "text",
            data: 'MEMBER REWARDS',
            color: '#b64499',
            file: null,
            size: 32,
            align: 'center',
            height:"",
          },
          {
            type: "text",
            data: "up for grabs",
            file: null,
            size: 18,
            align: "center",
            color: "#b54498",
            height: "",

          },
          {
            key: 's3',
            type: "text",
            data: "Convert your bookings and purchases\r\ninto rewards you love！",
            file: null,
            color: '#b64499',
            size: 20,
            align: 'center',
            height: "",
            // width: '100%'
          },
          {
            key: 's1',
            type: "image",
            data: null,
            file: require('../assets/images/slider_image/1_6.png'),
            color: "#fff000",
            size: null,
            align: 'center',
            height: 200,
          },
        ]
      }, {
        unique_id: "15_19",
        name: "Intro Slide 2",
        component_data: [
          {
            type: "blank",
            data: null,
            file: null,
            size: "",
            align: "center",
            color: "",
            height: 10
          },
          {
            key: 's1',
            type: "image",
            data: null,
            file: require('../assets/images/slider_image/1_8.png'),
            color: null,
            size: null,
            align: 'center',
            height: 200,

          },
          {
            key: 's3',
            type: "text",
            data: 'SHARING',
            color: '#b64499',
            file: null,
            size: 32,
            align: 'center',
            height:"",
          },
          {
            type: "text",
            data: "is caring",
            file: null,
            size: 18,
            align: "center",
            color: "#b54498",
            height: "",

          },
          {
            key: 's3',
            type: "text",
            data: "Be the first to know about our latest promotions\r\nand refer your friends and family for perks! ",
            file: null,
            color: '#b64499',
            size: 20,
            align: 'center',
            height: "",
          },
          {
            key: 's1',
            type: "image",
            data: null,
            file: require('../assets/images/slider_image/1_7.png'),
            color: "#fff000",
            size: null,
            align: 'center',
            height: 200,
          },
        ]
      }
    ]
  }
];

const AppSlider = () => {
  console.log("data")
  const slider = useRef();
  const [showRealApp, setShowRealApp] = useState(false);
  const [index, setIndex] = useState(0);
  
  const { bsState: { body, canceledOnTouchOutside, visible }, bsDispatch } = useContext(GlobalContext);
  const { bannerState } = useContext(GlobalContext);
  const [araylengh, setArraylength] = useState(bannerState.data.length - 1)
  console.log("bannerState",bannerState.data)
  const onSkip = () => {
    if (index) {
      console.log("skip", index)
      setIndex(0)
      setArraylength()
    }

    if (araylengh > 0) {
      setArraylength(0)
      setIndex(0)
    } else {
      console.log("hide", index)
      hideBS(bsDispatch)
    }
  };

  const handleDonebutton = () => {
    if (araylengh > 0) {
      showBS(bsDispatch)
      setArraylength(araylengh - 1)
    } else {
      hideBS(bsDispatch)
    }
  }
  const onnext = () => {
    slider.current.goToSlide(index + 1, true)
  };

  const getSkipstyle = (val) => {
    console.log("val", val.skip_position)
    if (val.skip_position == 'top-left') {
      return {
        width: 100,
        height: 30,
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: '#b548a1',
        borderStyle: 'solid',
        position: 'absolute',
        // paddingTop: 5,
        left: 5,
        top: 5
      };
    } else if (val.skip_position == 'top-right') {
      return {
        width: 100,
        height: 30,
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: '#b548a1',
        borderStyle: 'solid',
        position: 'absolute',
        right: 5,
        top: 5
      };
    }
    else if (val.skip_position == 'top-center') {
      return {
        width: 100,
        height: 30,
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: '#b548a1',
        borderStyle: 'solid',
        position: 'absolute',
        left: '40%',
        top: 5
      };

    } else if (val.skip_position == "bottom-left") {
      return {
        width: 100,
        height: 30,
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: '#b548a1',
        borderStyle: 'solid',
        position: 'absolute',
        bottom: 5,
        left: 5,

      }
    } else if (val.skip_position == "bottom-right") {
      return {
        width: 100,
        height: 30,
        borderRadius: 20,
        borderStyle: 'solid',
        position: 'absolute',
        bottom: 5,
        right: 5
      }
    } else if (val.skip_position == "bottom-center") {
      return {
        width: 100,
        height: 30,
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: '#b548a1',
        borderStyle: 'solid',
        position: 'absolute',
        bottom: 10,
        left: '40%'
      }
    }
  }


  const getDonestyle = (val) => {
    if (val.done_position == "top-left") {
      return {
        width: 100,
        height: 30,
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: '#b548a1',
        borderStyle: 'solid',
        position: 'absolute',
        left: 5,
        top: 5,
        zIndex: 1,
      };
    } else if (val.done_position == "top-right") {
      return {
        width: 100,
        height: 30,
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: '#b548a1',
        borderStyle: 'solid',
        position: 'absolute',
        right: 5,
        top: 5
      };
    }
    else if (val.done_position == "top-center") {
      return {
        width: 100,
        height: 30,
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: '#b548a1',
        borderStyle: 'solid',
        position: 'absolute',
        top: 5,
        left: '40%'
      }
    } else if (val.done_position == "bottom-left") {
      return {
        width: 100,
        height: 30,
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: '#b548a1',
        borderStyle: 'solid',
        position: 'absolute',
        bottom: 5,
        left: 5
      }
    } else if (val.done_position == "bottom-right") {
      return {
        width: 100,
        height: 30,
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: '#b548a1',
        borderStyle: 'solid',
        position: 'absolute',
        bottom: 5,
        right: 5,


      }
    } else if (val.done_position == "bottom-center") {
      return {
        width: 100,
        height: 30,
        borderRadius: 20,
        borderStyle: 'solid',
        position: 'absolute',
        bottom: 5,
        left: '37%'
      }
    }
  }
  const renderSkipButton = (item) => {
    return (
      <View style={getSkipstyle(bannerState.data[araylengh])}>
        <TouchableOpacity style={{
          width: 100,
          height: 30,
          borderRadius: 30,
          backgroundColor:bannerState.data[araylengh].skip_bg_color,
          overflow:'hidden',
          // borderColor:bannerState.data[araylengh].skip_bg_color,
          alignItems:'center',
          justifyContent:'center'
        }} onPress={onSkip}>
          <Text style={{ fontSize: 16, color:bannerState.data[araylengh].skip_font_color, fontWeight: 'bold', textAlign: 'center' ,textTransform: 'uppercase'}}>{bannerState.data[araylengh].skip_label}</Text>
        </TouchableOpacity>
      </View>


    )
  }

  const renderDoneButton = () => {

    return (
      <View style={getDonestyle(bannerState.data[araylengh])}>
        <TouchableOpacity style={{
          width: 100,
          height: 30,
          borderRadius: 20,
          backgroundColor:bannerState.data[araylengh].done_bg_color,
          alignItems:'center',
          justifyContent:'center',
        }} onPress={handleDonebutton}>
          <Text style={{ fontSize: 16, color:bannerState.data[araylengh].done_font_color, fontWeight: 'bold', textAlign: 'center' ,textTransform:'uppercase'}}>{data[araylengh].done_label}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  const imageStyle = (item) => {
    console.log("item", item)
    if (item.align == "right") {
      return 'flex-end'
    } else if (item.align == "left") {
      return 'flex-start'
    } else if (item.align == "center") {
      return 'center'
    }
  }

  const textStyle = (item) => {
    console.log("item", item)
    if (item.align == "right") {
      return 'right'
    } else if (item.align == "left") {
      return 'left'
    } else if (item.align == "center") {
      return 'center'
    } else if (item.align == "justify") {
      return 'justify'
    }

  }
  const ImageView = (item) => {
    

    return (
      <View style={{ width: "100%", alignItems: imageStyle(item)}}>
        <Image style={{ width: windowWidth,height: windowHeight-150,}} source={{uri:item.file}} resizeMode="contain" />
      </View>

    )
  }
  const EmptyView = (item) => {
    return (
      <View style={{ width: "100%", height: parseInt(item.height)}}>
      </View>
    )
  }
  
  const TextView = (item) => {
    return (
      <View style={{ width: '100%', alignItems: imageStyle(item),padding:5}}>
          <Text style={{ fontSize:item.size==""?12: parseInt(item.size),  color: item.color, textAlign: textStyle(item) }}>{item.data}</Text>
      </View>
    )
  }




  const RenderItem = ({ item }) => {
    console.log("render",bannerState.data[araylengh].bg_color)
    return (
      <View style={{ flex: 1, }}>
        <View style={{ backgroundColor:bannerState.data[araylengh].bg_color,flex:1,paddingTop:35,}}>
          {index == bannerState.data[araylengh].banner.length - 1 ? renderDoneButton() : renderSkipButton()}
            <View>
              {item.map((index, i) => {
                if (index.type == "Image") {
                  return ImageView(index)
                } else if (index.type == "Text") {
                  return TextView(index)
                } else if (index.type == "Blank") {
                  return EmptyView(index)
                } else {
                  return <View></View>
                }
              })}
            </View>
            
         </View>
      </View>)


      

  };

  

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{flex:1}}>
      <AppIntroSlider
        data={bannerState.data[araylengh].banner.map((index, i) => {
          return index.component_data
        })}
        renderItem={RenderItem}
        onDone={handleDonebutton}
        onSlideChange={(lastIndex) => { setIndex(lastIndex) }}
        showDoneButton={false}
        showNextButton={false}
        ref={(ref) => (slider.current = ref)}
        onSkip={onSkip}
        skipLabel={"SKIP"}
        dotClickEnabled={bannerState.data[araylengh].pagination ==0 ?false:true}
        activeDotStyle={{backgroundColor:bannerState.data[araylengh].pagination ==0 ?bannerState.data[araylengh].bg_color:'rgba(255, 255, 255, .9)'}}
        dotStyle={{backgroundColor:bannerState.data[araylengh].pagination == 0 ?bannerState.data[araylengh].bg_color:'rgba(0, 0, 0, .2)'}}
      />

      </ScrollView>
    </SafeAreaView>

  );
};

export default AppSlider;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    // borderWidth:1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    // paddingVertical: 30,
  },
  introTextStyle1: {
    fontSize: 18,
    color: '#bb46a4',
    textAlign: 'center',
    // paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 30,
    color: '#b5459e',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  introTitleStyle1: {
    fontSize: 27,
    color: '#b5459e',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
});


