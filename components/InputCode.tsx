import React from "react";
import { View, TextInput, Image } from "react-native";
import { icons } from "@/constants"; // Replace with your icon imports
import { KKSInputProps } from "@/types/type"; // Replace with your types

const KKSCodeInput = ({
  icon,
  placeholder,
  containerStyle,
  textInputBackgroundColor,
  onCodeEntered,
}: KKSInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
    >
      <View className="justify-center items-center w-6 h-6">
        <Image
          source={icon ? icon : icons.search} // Replace `icons.search` with your default icon
          className="w-6 h-6"
          resizeMode="contain"
        />
      </View>

      <TextInput
        style={{
          backgroundColor: textInputBackgroundColor
            ? textInputBackgroundColor
            : "white",
          fontSize: 16,
          fontWeight: "600",
          marginTop: 5,
          width: "100%",
          borderRadius: 200,
          paddingLeft: 10, // Adjust padding as needed
        }}
        placeholder={placeholder ?? "Enter KKS Code"}
        placeholderTextColor="gray"
        onChangeText={(text) => onCodeEntered(text)}
      />
    </View>
  );
};

export default KKSCodeInput;
