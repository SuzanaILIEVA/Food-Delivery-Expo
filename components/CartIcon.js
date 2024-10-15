import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

const CartIcon = () => {
  const navigation = useNavigation();
  return (
    <View className="absolute bottom-5 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
        style={{ backgroundColor: themeColors.bgColor(1) }}
        className="flex-row justify-between rounded-full items-center mx-5 p-4 py-3 shadow-lg"
      >
        <View
          className="p-2 px-4 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        >
          <Text className="text-white font-extrabold text-lg">3</Text>
        </View>

        <Text className="flex-1 text-center font-extrabold text-white text-xl">
          View Cart
        </Text>

        <Text className="font-extrabold text-white text-xl">$ {23}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartIcon;
