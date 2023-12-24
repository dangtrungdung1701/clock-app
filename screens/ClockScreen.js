import React from "react";
import { FlatList, View } from "react-native";

import Card from "../components/Card";

const ClockScreen = ({ navigation, route }) => {
  return (
    <View
      style={{
        padding: 10,
        flex: 1,
      }}
    >
      <FlatList
        contentContainerStyle={{ gap: 10 }}
        data={listClock}
        renderItem={({ item }) => {
          return (
            <Card
              key={item.title}
              data={item}
              navigation={navigation}
              route={route}
            />
          );
        }}
      />
    </View>
  );
};

export default ClockScreen;

const listClock = [
  {
    title: "Đồng hồ đếm giờ",
    divider: true,
    img: require("../assets/clock-screen/card4.png"),
  },
];
