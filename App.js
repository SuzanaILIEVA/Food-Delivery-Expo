import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Navigation";
import { Provider } from "react-redux";
import { store } from "./store";
import { LogBox } from "react-native";

// Tüm uyarıları gizle
LogBox.ignoreAllLogs(); // Kullanıcıya sadece hata mesajlarını gösterir

// Sadece belirli uyarıları gizle
// LogBox.ignoreLogs([
// "Warning: Selector unknown returned a different",//Uyarı mesajının bir kısmını yaz
// ]);

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
