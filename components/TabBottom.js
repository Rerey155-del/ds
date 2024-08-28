import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Screen4 from "./Account";
import HomeScreen from "./Recommendation";
import NewProduct from "./Newproduct";
import Video from "./Video";


const Tab = createBottomTabNavigator();


const Beranda = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Beranda"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-variant-outline" size={size} color={"#EE4D2D"} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Product Baru"
        component={NewProduct}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cart-outline" size={size} color={"#EE4D2D"} />
          ),
          tabBarBadge: "6",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Cart")}
              style={{ marginRight: 15 }}
            >
              <Icon name="cart-outline" size={30} color={"#EE4D2D"} />
            </TouchableOpacity>
          ),
          headerTitle: "PRODUK BARU",
        }}
      />
      
     
      
      <Tab.Screen
        name="Saya"
        component={Screen4}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-outline" size={size} color={"#EE4D2D"} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default Beranda;