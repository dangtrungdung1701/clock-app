import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";
import Container from "toastify-react-native";

import ClockScreen from "./screens/ClockScreen";
import ClosedEventsScreen from "./screens/ClosedEventsScreen";
import CreateEventScreen from "./screens/CreateEventScreen";
import BackgroundCreateEventScreen from "./screens/BackgroundCreateEventScreen";
import EventDetailScreen from "./screens/EventDetailScreen";
import ClockDetailScreen from "./screens/ClockDetailScreen";
import EditEventScreen from "./screens/EditEventScreen";
import CurrentTasksScreen from "./screens/CurrentTasksScreen";

import ButtonAdd from "./components/ButtonAdd";
import Header from "./components/Header";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
    border: "white",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme} independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="count-down"
          options={{
            title: "Đếm ngược công việc",
            contentStyle: {
              paddingHorizontal: 20,
            },
          }}
        >
          {({ route, navigation }) => (
            <SafeAreaView style={{ flex: 1 }}>
              <Header route={route} navigation={navigation} />
              <Tab.Navigator
                initialLayout={{ width: 100 }}
                screenOptions={{
                  tabBarLabelStyle: {
                    textTransform: "none",
                  },
                }}
              >
                <Tab.Screen
                  name="current-tasks"
                  component={CurrentTasksScreen}
                  options={{ title: "Đang diễn ra" }}
                />
                <Tab.Screen
                  name="clock"
                  component={ClockScreen}
                  options={{ title: "Đồng hồ" }}
                />
                <Tab.Screen
                  name="closed-events"
                  component={ClosedEventsScreen}
                  options={{ title: "Sự kiện đã kết thúc" }}
                />
              </Tab.Navigator>
              <ButtonAdd />
            </SafeAreaView>
          )}
        </Stack.Screen>
        <Stack.Group>
          <Stack.Screen
            name="event/detail"
            options={({ route }) => ({
              title: route.params.title,
            })}
            component={EventDetailScreen}
          />

          <Stack.Screen name="clock/detail" component={ClockDetailScreen} />
          <Stack.Screen name="create-event" component={CreateEventScreen} />
          <Stack.Screen name="edit-event" component={EditEventScreen} />

          <Stack.Screen
            name="background-create-event"
            component={BackgroundCreateEventScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
      <Container position="top" />
    </NavigationContainer>
  );
}
