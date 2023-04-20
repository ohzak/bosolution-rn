import * as React from "react";
import {
  StyleSheet,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
  Animated,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import {
  View,
  Box,
  Button,
  Center,
  Text,
  Pressable,
  useColorModeValue,
} from "native-base";

const FirstRoute = () => (
  <Center flex={1} my="4">
    <Text>This is Tab 1</Text>
  </Center>
);

const SecondRoute = () => (
  <Center flex={1} my="4">
    This is Tab 2
  </Center>
);

const ThirdRoute = () => (
  <Center flex={1} my="4">
    This is Tab 3
  </Center>
);

const FourthRoute = () => (
  <Center flex={1} my="4">
    This is Tab 4{" "}
  </Center>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

export default function Documents({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "Tutti i documenti",
    },
    {
      key: "second",
      title: "Tab 2",
    },
    {
      key: "third",
      title: "Tab 3",
    },
    {
      key: "fourth",
      title: "Tab 4",
    },
  ]);

  const initialLayout = {
    width: useWindowDimensions().width,
  };

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const color =
            index === i
              ? useColorModeValue("#000", "#e5e5e5")
              : useColorModeValue("#1f2937", "#a1a1aa");
          const borderColor =
            index === i
              ? "cyan.500"
              : useColorModeValue("coolGray.200", "gray.400");
          return (
            <Pressable
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              cursor="pointer"
              onPress={() => {
                console.log(i);
                setIndex(i);
              }}
            >
              <Box>
                <Animated.Text
                  style={{
                    color,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Box>
            </Pressable>
          );
        })}
      </Box>
    );
  };

  return (
    <Center flex={1} backgroundColor={"white"}>
      <Box w="80%" p="4">
        <TabView
          navigationState={{
            index,
            routes,
          }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          style={{
            marginTop: StatusBar.currentHeight,
          }}
        />
      </Box>
    </Center>
  );
}
