import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    FlatList,
    Dimensions,
    Image,
    ScrollView,
    ImageBackground,
    Animated, ActivityIndicator,
    StatusBar
} from 'react-native';
import { StatusBarHeight } from '../../utils/functions-file';


import styles from './styles';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { GlobalContext } from '../../context/Provider';
import { hideBS, showBS } from '../../context/actions/common';

const OnboardingComponent = (item) => {
    console.log("item.bannerData.length",item.bannerData)
    const flatlistRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const [viewableItems, setViewableItems] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentindex, setCurrentIndex] = useState(item.bannerData.length - 1)

    const { bsState: { body, canceledOnTouchOutside, visible }, bsDispatch } = useContext(GlobalContext);
   
    const handleViewableItemsChanged = useRef(({ viewableItems }) => {
        setViewableItems(viewableItems)
    })
    console.log("item.bannerData",item.bannerData[currentindex].banner)
    useEffect(() => {
        if (!viewableItems[0] || currentPage === viewableItems[0].index)
            return;
        setCurrentPage(viewableItems[0].index)
    }, [viewableItems, currentindex])

    const handleSkipButton = () => {
        if (currentindex > 0) {
            setCurrentIndex(currentindex - 1)
            flatlistRef.current.scrollToOffset({ animated: true, offset: 0 });
        } else {
            hideBS(bsDispatch)
        }
    }

    const handleDonebutton = () => {
        if (currentindex > 0) {
            showBS(bsDispatch)
            setCurrentIndex(currentindex - 1)
            flatlistRef.current.scrollToOffset({ animated: false, offset: 0 });
        } else {
            hideBS(bsDispatch)
        }
    }
    console.log('statusBarHeight: ', StatusBar.currentHeight);

    const renderTopSection = () => {

        return (
            <SafeAreaView>
                <View style={styles.wrapper} >
                    {
                        currentPage == item.bannerData[currentindex].banner.length - 1 ? <TouchableOpacity onPress={handleDonebutton}>
                            <Text style={{
                                fontSize: 18,
                                borderWidth: 1,
                                borderColor: '#b548a1',
                                fontWeight: 'bold',
                                width: 100,
                                borderRadius: 12,
                                textAlign: 'center',
                                color: '#b548a1',
                            }}>DONE</Text>
                        </TouchableOpacity> : item.bannerData[currentindex].skip == 1 ? <TouchableOpacity onPress={handleSkipButton}>
                            <Text style={{
                                fontSize: 18,
                                borderWidth: 1,
                                borderColor: '#b548a1',
                                fontWeight: 'bold',
                                width: 100,
                                borderRadius: 12,
                                textAlign: 'center',
                                color: '#b548a1',
                            }}>SKIP</Text>
                        </TouchableOpacity> : <View></View>
                    }
                </View>
            </SafeAreaView>
        )
    }


    const renderBottomSection = () => {
        return (
            <SafeAreaView>
                <View style={styles.bottomSection}>
                    {
                        <View style={{ flexDirection: 'row' }}>
                            {
                                [...Array(item.bannerData[currentindex].banner.length)].map((_, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            width: 12,
                                            height: 12,
                                            borderRadius: 10,
                                            backgroundColor: index == currentPage ? '#b548a1' : '#b548a1' + '10',
                                            marginRight: 8
                                        }} />
                                ))
                            }
                        </View>
                    }
                </View>
            </SafeAreaView>
        )
    }
    const renderFlatlistItem = ({ item }) => {

        // const onLayout=(event)=> {
        //     const {x, y, height, width} = event.nativeEvent.layout;
        //     console.log("ddddjdjddjdndnjdndnd",event.nativeEvent.layout)
        //   }
        // if(item.height && item.width == "0"){
        //     var adjustedheight = 500;
        // }else{
        //     var aspectratio = parseInt(item.height) / parseInt(item.width)
        //     var adjustedheight = windowHeight * aspectratio;
        //     var adjustedwidth = windowWidth * aspectratio;

        // }



        return (

            <View style={{ width: windowWidth, alignItems: 'center', justifyContent: 'center', height: windowHeight }} >
                <View style={{ width: windowWidth, alignItems: 'center', }}>
                    <TouchableOpacity
                        activeOpacity={1}
                    >

                        <ImageBackground source={{ uri: item.path }} style={{ width:windowWidth, height: windowHeight,}} resizeMode="stretch">
                            <View style={{ position: 'absolute', top: 30, left: 0, right: 0, bottom: 0, }}>
                            {renderTopSection()}
                            </View>
                           
                        </ImageBackground>

                      
                    </TouchableOpacity>
                    <View style={{ position: 'absolute', top: 650, left: 0, right: 0,bottom:0 }}>
                            {renderBottomSection()}
                            </View>
                </View>
            </View>

        )
    }


    return (
        <View style={{}}>
            <View style={{ marginBottom: 10 }}>
              
            </View>
            <Animated.FlatList
                data={item.bannerData[currentindex].banner}
                pagingEnabled={true}
                horizontal

                legacyImplementation={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.unique_id}
                renderItem={renderFlatlistItem}
                ref={flatlistRef}
                onViewableItemsChanged={handleViewableItemsChanged.current}
                viewabilityConfig={{ itemVisiblePercentThreshold: 95 }}
                maxToRenderPerBatch={10}
                windowSize={10}
                removeClippedSubviews={true}
                extraData={item.bannerData[currentindex].banner}
            />
            {/* {renderBottomSection()} */}
        </View>
    );
};

export default OnboardingComponent;
