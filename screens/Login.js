import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ImageStore, COLORS, SIZES, FONTS, images } from '../constants';
 
import { CustomButton } from "../components";


const Login = ({ navigation }) => {

    function renderHeader(){
        return(
            <View
                style={{height:SIZES.height>700 ? "65%": "60%"}}
            >
                <ImageBackground source={images.loginBackground} style={{ flex:1, justifyContent:'flex-end'}} resizeMode="cover">
                    <LinearGradient start={{x:0, y:0}} end={{x:0, y:1}} colors={[COLORS.transparent, COLORS.black]} 
                        style={{ height: 200, justifyContent:'flex-end', paddingHorizontal:SIZES.paddingHorizontal}}>
    
    
                            <Text style={{width: "80%", color:COLORS.white, ...FONTS.largeTitle, lineHeight: 45, paddingHorizontal:SIZES.padding}}>Delivering Your favourite Foods</Text>
    
    
                    </LinearGradient>
                </ImageBackground>
            </View>
        )
    }


    function renderDetail(){
        return(
            <View style={{flex:1, paddingHorizontal:SIZES.padding}}>
                <Text style={{marginTop:SIZES.radius, width:"70%", color:COLORS.gray, ...FONTS.body3}}>
                    Get your favourite food  from your favourite restaurant delivered to you. 
                </Text>
    
                <View style={{flex:1, justifyContent:'center'}}>
                    <CustomButton buttonText="Login" buttonCotainerStyle={{paddingVertical: 18, borderRadius:20}} 
                        colors = {[COLORS.darkGreen, COLORS.lime]} onPress={() => navigation.replace("Home")} />
    
    
                    <CustomButton buttonText="Sign Up" buttonCotainerStyle={{marginTop:SIZES.radius, paddingVertical: 18, borderRadius:20, borderColor: COLORS.darkLime, borderWidth:1}}
                        colors = {[]} onPress={() => navigation.replace("Home")} />
                </View>
            </View>
        )
    }


    return (
        <View style={{flex:1, backgroundColor:COLORS.black}}>
            <StatusBar barStyle="light-content"/>

            {renderHeader()}

            {renderDetail()}
        </View>
    )
}

export default Login;