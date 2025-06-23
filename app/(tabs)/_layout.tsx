import { Tabs } from "expo-router";

import TabIcon from "@/components/tabs/tab-icon";
import HomeHeader from "../../components/tabs/home-header";
import BookmarkHeader from "@/components/tabs/bookmark-header";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        // headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#22c55e",
        tabBarInactiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "black",
          elevation: 0,
          borderTopWidth: 0,
          // position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "black",
          },
          header: () => <HomeHeader />,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "black",
          },
          header: () => <BookmarkHeader />,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="bookmark" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="add-circle" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="heart" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="person-circle" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
