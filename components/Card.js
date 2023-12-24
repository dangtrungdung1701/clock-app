import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { getDateTimeRemaining } from "../utils";
import useInterval from "../hooks/useInterval";

const Card = ({ data = {}, navigation, route }) => {
  const { title, description, divider, targetTime, img, closed, id } = data;
  const { data: timeRemaining } = useInterval(
    () => getDateTimeRemaining(targetTime),
    1000,
    true
  );
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(
          `${route.name === "clock" ? "clock" : "event"}/detail`,
          { id, title }
        );
      }}
    >
      <ImageBackground
        source={img}
        style={{
          rowGap: "10px",
          padding: 20,
          borderRadius: 30,
          overflow: "hidden",
          height: "auto",
          color: "white",
          minHeight: 200,
          justifyContent: "center",
        }}
      >
        {title && (
          <Text
            style={{ color: "white", fontSize: 24, fontWeight: 800 }}
            numberOfLines={1}
          >
            {title}
          </Text>
        )}
        {description && (
          <Text style={{ color: "white" }} numberOfLines={2}>
            {description}
          </Text>
        )}
        {divider && (
          <View
            style={{
              // flex: 1,
              height: 2,
              backgroundColor: "white",
            }}
          />
        )}
        {!closed && targetTime && (
          <Text style={{ color: "white" }}>
            <Text style={{ fontSize: 24, fontWeight: 800 }}>
              {timeRemaining?.days}
            </Text>{" "}
            ngày{" "}
            <Text style={{ fontSize: 24, fontWeight: 800 }}>
              {timeRemaining?.hours}
            </Text>{" "}
            giờ{" "}
            <Text style={{ fontSize: 24, fontWeight: 800 }}>
              {timeRemaining?.minutes}
            </Text>{" "}
            phút{" "}
            <Text style={{ fontSize: 24, fontWeight: 800 }}>
              {timeRemaining?.seconds}
            </Text>{" "}
            giây
          </Text>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Card;
