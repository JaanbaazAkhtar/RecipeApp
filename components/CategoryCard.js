import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const CategoryCard =({containerStyle, categoryItem, onPress}) => {
    return(
        <View>
            <TouchableOpacity 
                style={{flexDirection:'row', alignItems:'center', padding:10, marginTop:10, borderRadius:SIZES.radius, backgroundColor:COLORS.gray2, ...containerStyle}}
                onPress={onPress}
            >
                {/* Image*/}
                <Image source={categoryItem.image} resizeMode="cover" style={{ width:100, height:100, borderRadius:SIZES.radius}}/>
                
                {/* Details */}
                <View style={{width:'65%', paddingHorizontal: 20}}>

                    {/* Details */}
                    <Text style={{ flex:1, ...FONTS.h3 }}> {categoryItem.name} </Text>
                    <Text style={{color:COLORS.gray, ...FONTS.body4}}> {categoryItem.duration} | {categoryItem.serving} </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default CategoryCard;