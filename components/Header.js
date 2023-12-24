import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BackIcon } from "../assets/icons";
import {
  COUNT_DOWN_ROUTE,
  MAPPING_ROUTE_TITLE,
  ROUTE_WITHOUT_IMAGE_BACKGROUND,
} from "../constants/route";

const Header = ({ route, navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        columnGap: 10,
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
      }}
    >
      {route.name !== COUNT_DOWN_ROUTE && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <BackIcon
            width={35}
            height={35}
            color={
              ROUTE_WITHOUT_IMAGE_BACKGROUND.includes(route.name)
                ? "black"
                : "white"
            }
          />
        </TouchableOpacity>
      )}
      <Text
        style={{
          fontWeight: "700",
          color: ROUTE_WITHOUT_IMAGE_BACKGROUND.includes(route.name)
            ? "black"
            : "white",
        }}
      >
        {route.params?.title || MAPPING_ROUTE_TITLE[route.name]}
      </Text>
    </View>
  );
};

export default Header;
