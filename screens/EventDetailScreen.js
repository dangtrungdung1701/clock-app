import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  AlarmIcon,
  DescriptionIcon,
  LeftIcon,
  RightIcon,
} from "../assets/icons";
import ButtonMenu from "../components/ButtonMenu";
import Header from "../components/Header";
import useEvent from "../hooks/useEvent";

const EventDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const { nextEvent, currentEvent, previousEvent } = useEvent(id);
  const { targetTime, description, img } = currentEvent;

  const minuteRemaining = Math.floor(
    (new Date(targetTime).getTime() - new Date().getTime()) / (1000 * 60)
  );
  const formatDate = `${("0" + new Date(targetTime).getDate()).slice(-2)}/${(
    "0" +
    (new Date(targetTime).getMonth() + 1)
  ).slice(-2)}/${new Date(targetTime).getFullYear()} ${(
    "0" + new Date(targetTime).getHours()
  ).slice(-2)}:${("0" + new Date(targetTime).getMinutes()).slice(-2)}`;

  return (
    <ImageBackground resizeMode="cover" source={img} style={{ flex: 1 }}>
      <SafeAreaView
        style={{ height: "100%", backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        <Header route={route} navigation={navigation} />
        <ScrollView
          contentContainerStyle={{ rowGap: 25 }}
          style={{ padding: 40 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                opacity: previousEvent ? 1 : 0,
              }}
              disabled={previousEvent ? false : true}
              onPress={() => {
                navigation.setParams({
                  id: previousEvent.id,
                  title: previousEvent.title,
                });
              }}
            >
              <LeftIcon width={35} height={45} color="white" />
            </TouchableOpacity>
            <View
              style={{
                alignItems: "center",
                rowGap: 5,
              }}
            >
              <Text style={{ fontSize: 40, fontWeight: "700", color: "white" }}>
                {minuteRemaining > 0 ? minuteRemaining : 0}
              </Text>
              <Text style={{ color: "white" }}>phút còn lại</Text>
            </View>
            <TouchableOpacity
              style={{
                opacity: nextEvent ? 1 : 0,
              }}
              disabled={nextEvent ? false : true}
              onPress={() => {
                navigation.setParams({
                  id: nextEvent.id,
                  title: nextEvent.title,
                });
              }}
            >
              <RightIcon width={35} height={45} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              columnGap: "10",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AlarmIcon width={35} height={35} color="white" />
            <Text style={{ color: "white" }}>{formatDate}</Text>
          </View>
          <View style={{ alignItems: "center", rowGap: 10 }}>
            <DescriptionIcon width={35} height={35} color="white" />
            <Text style={{ color: "white", textAlign: "center" }}>
              {description}
            </Text>
          </View>
        </ScrollView>
        <ButtonMenu event={currentEvent} />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default EventDetailScreen;
