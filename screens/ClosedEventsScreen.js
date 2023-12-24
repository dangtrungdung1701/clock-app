import React, { useMemo } from "react";
import { FlatList, View } from "react-native";
import { useShallow } from "zustand/react/shallow";

import Card from "../components/Card";
import useAppStore from "../store/appStore";

const ClosedEventsScreen = ({ navigation, route }) => {
  const { events } = useAppStore(
    useShallow((state) => ({ events: state.events }))
  );

  const closedEvents = useMemo(() => {
    return events.filter((event) => event.closed);
  }, [JSON.stringify(events)]);

  return (
    <View
      style={{
        padding: 10,
        flex: 1,
      }}
    >
      <FlatList
        contentContainerStyle={{ gap: 10 }}
        data={closedEvents}
        renderItem={({ item }) => {
          if (!item) return;
          return (
            <Card
              key={item.id}
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

export default ClosedEventsScreen;
