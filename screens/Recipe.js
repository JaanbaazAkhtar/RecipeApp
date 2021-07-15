import React, {useRef} from 'react';
import {
    View,
    Text, Image, TouchableOpacity, Animated, Platform
} from 'react-native';

import { BlurView } from "@react-native-community/blur";

import { SIZES, FONTS, COLORS, icons } from "../constants";

const Header_HEIGHT = 350;

const RecipeCreatorCardDetail = ({selectedRecipe}) => {
    return(
        <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
            
            {/* Profile Photo */}
            <View style={{width:20, height:20, marginLeft:20}}>
                <Image source={selectedRecipe?.author?.profilePic} style={{width: 40, height: 40, borderRadius: 20}} />
            </View>

            {/* Labels */}
            <View style={{flex:1, marginHorizontal: 20}}>
                <Text style={{ color: COLORS.lightGray2, ...FONTS.body4}}> Recipe by:</Text>
                <Text style={{color:COLORS.white, ...FONTS.h3}}> {selectedRecipe?.author?.name} </Text>
            </View>

            {/* Button */}
            <TouchableOpacity style={{width:30, height:30, alignItems:'center', justifyContent:'center', marginRight: 20, borderRadius: 5, borderWidth: 1, borderColor: COLORS.lightGreen1}}
                onPress={()=> console.log("View Profile")}
            >
                <Image source={icons.rightArrow} style={{width:15, height:15, tintColor: COLORS.lightGreen1}} />
            </TouchableOpacity>
        </View>
    )
}

const RecipeCreatorCardInfo = ({selectedRecipe}) => {
    if(Platform.OS === 'ios'){
        return(
            <BlurView style={{flex:1, borderRadius:SIZES.radius}} blurType="dark">
                <RecipeCreatorCardDetail selectedRecipe={selectedRecipe}/>
            </BlurView>
        )
        
    }else{
        return(
            <View style={{ flex:1, borderRadius:SIZES.radius, backgroundColor: COLORS.transparentGray}}>
                <RecipeCreatorCardDetail selectedRecipe={selectedRecipe}/>
            </View>
        )
        
    }
}

const Recipe = ({ navigation, route}) => {

    const [selectedRecipe, setSelectedRecipe] = React.useState(null)

    const scrollY = useRef(new Animated.Value(0)).current;

    React.useEffect(()=> {
        let {recipe} = route.params
        setSelectedRecipe(recipe)
    }, [])

    function renderRecipeCardHeader(){
        return(
            <View style={{
                marginTop:-1000,
                paddingTop: 1000,
                alignItems:'center',
                overflow: 'hidden'
            }}>
                {/* Background Image */}
                <Animated.Image source={selectedRecipe?.image} resizeMode="contain" style={{ height: Header_HEIGHT, width:"200%", 
                    transform:[
                        {
                            translateY: scrollY.interpolate({
                                inputRange: [-Header_HEIGHT, 0, Header_HEIGHT],
                                outputRange: [-Header_HEIGHT/2, 0, Header_HEIGHT*0.75]
                            })
                        },
                        {
                            scale: scrollY.interpolate({
                                inputRange: [-Header_HEIGHT, 0, Header_HEIGHT],
                                outputRange: [2,1,0.75]
                            })
                        }
                        ]
                    }} 
                />

                {/* Recipe Creator Card */}
                <Animated.View style={{position:'absolute', bottom:10, left:30, right:30, height:80}}>
                    <RecipeCreatorCardInfo selectedRecipe={selectedRecipe} />
                </Animated.View>
            </View>
        )
    }


    return (
        <View
            style={{
                flex: 1,
                backgroundColor:COLORS.white
            }}
        >
            <Animated.FlatList data={selectedRecipe?.ingredients} keyExtractor={item=> `${item.id}`} showsVerticalScrollIndicator={false} 
                ListHeaderComponent={
                    <View>
                        {/* Header */}
                        {renderRecipeCardHeader()}
                    </View>
                }
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    {nativeEvent: {contentOffset: { y:scrollY}}}
                ], { useNativeDriver: true})}
                renderItem={({item}) => (
                    <View style={{flexDirection:'row', paddingHorizontal: 30, marginVertical: 5}}>
                        {/* Icon */}
                        <View style={{alignItems:'center', justifyContent:'center', height:50, width: 50, borderRadius: 5, backgroundColor: COLORS.lightGray}}>
                            <Image source={item.icon} style={{height:40, width:40}} />
                        </View>

                        {/* Description */}
                        <View style={{ flex:1, paddingHorizontal: 20, justifyContent: 'center'}}>
                            <Text style={{...FONTS.body3}}> {item.description} </Text>
                        </View>
                        
                        {/* Quantity */}
                        <View style={{ alignItems:'flex-end', justifyContent:'center' }}>
                            <Text style={{...FONTS.body3}}> {item.quantity} </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default Recipe;