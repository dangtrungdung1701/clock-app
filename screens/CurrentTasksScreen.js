import React, { useEffect, useMemo } from "react";
import { FlatList, View } from "react-native";
import { useShallow } from "zustand/react/shallow";

import Card from "../components/Card";
import { LIST_EVENT } from "../constants/mockData";
import useAppStore from "../store/appStore";

const CurrentTasksScreen = ({ navigation, route }) => {
  const { events, actions } = useAppStore(
    useShallow((state) => ({ events: state.events, actions: state.actions }))
  );
  const { createNewEvent } = actions;

  const openedEvents = useMemo(() => {
    return events.filter((event) => !event.closed);
  }, [JSON.stringify(events)]);

  useEffect(() => {
    if (events.length === 0) {
      LIST_EVENT.forEach((event) => {
        createNewEvent(event);
      });
    }
  }, []);

  return (
    <View
      style={{
        padding: 10,
        flex: 1,
      }}
    >
      <FlatList
        contentContainerStyle={{ gap: 10 }}
        data={openedEvents}
        renderItem={({ item }) => {
          return <Card data={item} navigation={navigation} route={route} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CurrentTasksScreen;
