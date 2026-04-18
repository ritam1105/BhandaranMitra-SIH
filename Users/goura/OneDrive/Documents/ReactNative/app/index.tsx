import { View as RNView, Text as RNText } from "react-native";
import { styled } from "nativewind";

const View = styled(RNView);
const Text = styled(RNText);

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-5xl text-blue-900">WelcomkeHI</Text>
    </View>
  );
}