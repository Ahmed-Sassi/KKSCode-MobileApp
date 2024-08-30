import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal,
  Text,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { usePathname, router } from "expo-router";
import { icons } from "@/constants";
import cheerio from "cheerio";
import { fetchAPI } from "@/lib/fetch";
import AntDesign from "@expo/vector-icons/AntDesign"; // Assuming fetchAPI is already defined in your project

const SearchInput = ({ initialQuery = "" }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  const [link, setLink] = useState();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [machineCode, setMachineCode] = useState(null); // For storing extracted code

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanning(false);
    setQuery(data);
    Alert.alert("QR Code Scanned", `Scanned code: ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-gray-100 rounded-2xl border-2 border-gray-700 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-black flex-1 font-regular"
        value={query}
        placeholder="Enter KKS Code"
        placeholderTextColor="black"
        onChangeText={(text) => setQuery(text)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query.trim() === "") {
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across the database",
            );
          }

          if (pathname.startsWith("/(root)")) {
            router.setParams({ query });
          } else {
            router.push(`/(root)/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScanning(true)}>
        <AntDesign name="qrcode" size={24} color="black" />
      </TouchableOpacity>

      {scanning && (
        <Modal visible={scanning} animationType="slide">
          <BarCodeScanner
            onBarCodeScanned={scanning ? handleBarCodeScanned : undefined}
            style={{ flex: 1 }}
          />
          <TouchableOpacity
            onPress={() => setScanning(false)}
            style={{ position: "absolute", top: 50, right: 20 }}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Cancel</Text>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default SearchInput;
