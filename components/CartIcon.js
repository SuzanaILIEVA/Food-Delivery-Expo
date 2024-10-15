import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../slices/cartSlice";

const CartIcon = () => {
  const navigation = useNavigation();

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  if (!cartItems.length) return;

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
          <Text className="text-white font-extrabold text-lg">
            {cartItems.length}
          </Text>
        </View>

        <Text className="flex-1 text-center font-extrabold text-white text-xl">
          View Cart
        </Text>

        <Text className="font-extrabold text-white text-xl">$ {cartTotal}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartIcon;
