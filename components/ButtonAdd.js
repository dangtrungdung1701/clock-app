import React from "react";
import { AddIcon } from "../assets/icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ButtonAdd = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        backgroundColor: "#3AB8FF",
        position: "absolute",
        justifyContent: "center",
        bottom: 40,
        right: 10,
      }}
      onPress={() => {
        navigation.navigate("create-event");
      }}
    >
      <AddIcon width={60} color="white" />
    </TouchableOpacity>
  );
};

export default ButtonAdd;
