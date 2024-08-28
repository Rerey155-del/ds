import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import LoginScreen from "./components/Auth";
import Beranda from "./components/TabBottom";
import Akun from "./components/Account";
import Rekomendasi from "./components/Recommendation";
import ProductDetailScreen from "./components/ProductDetailScreen";
import NewProduct from "./components/Newproduct";
import CartScreen from "./components/Cart";
import Video from "./components/Video";


const Stack = createStackNavigator();

const App = () => {
  // Pindahkan useState ke dalam komponen
  const [itemsInCart, setItemsInCart] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Beranda"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS, // Menggunakan transisi dari kanan ke kiri
        }}
      >
        {/* Screen untuk halaman login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />

        {/* Screen untuk halaman beranda */}
        <Stack.Screen
          name="Beranda"
          component={Beranda}
          options={{ headerShown: false }}
        />

        {/* Screen untuk halaman akun */}
        <Stack.Screen
          name="Screen4"
          component={Akun}
          options={{ headerShown: false }}
        />

        {/* Screen untuk halaman rekomendasi */}
        <Stack.Screen
          name="Rekomendasi"
          component={Rekomendasi}
          options={{ headerShown: false }}
        />

        {/* Screen untuk detail produk */}
        <Stack.Screen name="ProductDetail" options={{ title: "Detail Produk" }}>
          {(props) => (
            <ProductDetailScreen
              {...props}
              itemsInCart={itemsInCart}
              setItemsInCart={setItemsInCart}
            />
          )}
        </Stack.Screen>

        {/* Screen untuk produk baru */}
        <Stack.Screen
          name="NewProduct"
          component={NewProduct}
          options={{ title: "Produk Baru" }}
        />

        {/* Screen untuk keranjang */}
        <Stack.Screen name="Cart" options={{ title: "Keranjang Saya" }}>
          {(props) => <CartScreen {...props} cartItems={itemsInCart} />}
        </Stack.Screen>

        <Stack.Screen
          name="Video"
          component={Video}
          options={{ title: "Produk Baru", headerShown: false  }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
