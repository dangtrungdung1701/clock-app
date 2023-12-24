import React from "react";
import { Text, TextInput, View } from "react-native";

const Input = ({ label, value, handleChange, mandatory }) => {
  return (
    <View style={{ rowGap: 5 }}>
      <Text style={{ fontWeight: "500", color: "white" }}>
        {label}
        {mandatory && "(*)"}
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "white",
          padding: 10,
          borderStyle: "solid",
          borderRadius: 8,
          color: "white",
        }}
        value={value}
        onChangeText={(value) => {
          handleChange(value);
        }}
      />
    </View>
  );
};

export default Input;
