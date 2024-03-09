import { View, ActivityIndicator } from "react-native";
import React from "react";


export default function Loading(){
    return(
        <View className="flex-row justify-center py-8">
            <ActivityIndicator size="large" color={"#111"}/>
        </View>
    )
}