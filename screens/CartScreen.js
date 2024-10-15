import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { featured } from "../constants";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import { selectCartItems, selectCartTotal } from "../slices/cartSlice";

const CartScreen = () => {
  const restaurant = useSelector(selectRestaurant);

  const navigation = useNavigation();

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const [groupedItems, setGroupedItems] = useState({});
  console.log(" GROUPITEMSSSSS==>> " + groupedItems);

  //sepetin içeriğini id'lerine göre gruplandırır.aynı ürünü tekrar tekrar göstermek yerine, sadece bir kere gösterip miktarını arttirir
  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      // console.log(" cart itemss" + JSON.stringify(cartItems));

      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }
      return group;
    });

    console.log(
      "groupedItems'ın yapısını inceleyin =>",
      JSON.stringify(groupedItems, null, 2)
    );

    setGroupedItems(items);
  }, [cartItems]);

  return (
    <View className="bg-white flex-1 mt-10">
      <StatusBar style="dark" />
      {/* back button */}
      <View className="relative py-4 shadow-sm ">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="absolute z-10 rounded-full p-1 shadow top-5 left-2"
        >
          <Icon.ArrowLeft strokeWidth={3} stroke={"white"} />
        </TouchableOpacity>

        <View>
          <Text className="text-center font-bold text-xl">Your Cart</Text>
          <Text className="text-center text-gray-500">{restaurant.name}</Text>
        </View>
      </View>

      {/* delivery time  */}
      <View
        style={{ backgroundColor: themeColors.bgColor(0.3) }}
        className="flex-row px-4 items-center"
      >
        <Image
          source={require("../assets/images/motorcycle-courier.png")}
          className="w-20 h-20 rounded-full"
        />
        <Text className="flex-1 pl-4 text-lg font-bold">
          Deliver in 20-30 minutes
        </Text>
        <TouchableOpacity>
          <Text
            className="font-bold text-lg "
            style={{ color: themeColors.text }}
          >
            Change
          </Text>
        </TouchableOpacity>
      </View>

      {/* dishes */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="bg-gray-100 pt-5"
      >
        {/*!!!!!!!!!!!!!!!!!!! */}

        {Object.entries(groupedItems).map(([key, items]) => {
          let dish = items[0];
          return (
            <View
              key={key}
              className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
            >
              <Text className="font-bold" style={{ color: themeColors.text }}>
                {" "}
                {items.length} x
              </Text>
              <Image
                className="h-14 w-14 rounded-full"
                source={
                  dish.image
                    ? dish.image
                    : require("../assets/images/dishes/pizza.jpeg")
                }
              />
              <Text className="flex-1 font-bold text-gray-700">
                {dish.name}
              </Text>
              <Text className="font-semibold text-base">$ {dish.price}</Text>
              <TouchableOpacity
                className="p-1 rounded-full"
                style={{ backgroundColor: themeColors.bgColor(1) }}
              >
                <Icon.Minus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke={"white"}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* totals */}
      <View
        style={{ backgroundColor: themeColors.bgColor(0.3) }}
        className="p-6 px-8 rounded-t-3xl space-y-4"
      >
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Subtotal</Text>
          <Text className="text-gray-700">$ 20</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Delivery Fee</Text>
          <Text className="text-gray-700">$ 2</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700 font-extrabold">Order Total</Text>
          <Text className="text-gray-700 font-extrabold">$ 22</Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("OrderPreparing")}
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="p-3 rounded-full"
          >
            <Text className="text-white text-lg font-bold text-center">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
