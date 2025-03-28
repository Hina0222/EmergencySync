import { StatusBar } from "expo-status-bar";
import Button from "./components/ui/Button/Button";
import Typography from "./components/ui/Typography/Typography";
import Chip from "./components/ui/Chip/Chip";
import SearchBar from "./components/ui/SearchBar/SearchBar";
import { useState } from "react";
import DropdownBox from "./components/ui/DropdownBox/DropdownBox";
import { ITEMS_MOCK } from "./mock";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import Sidebar from "./components/ui/Sidebar/Sidebar";
import KakaoMap from "./screens/KakaoMap/KakaoMap";

export default function App() {
	const [test, setTest] = useState("");
	const [fontsLoaded] = useFonts({
		"Pretendard": require("./assets/fonts/PretendardGOVVariable.ttf")
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto" />
			<KakaoMap />
			<Sidebar>
				<Button onPress={() => {
				}} isActive={true}>조회하기</Button>
				<Typography color="green10" size="T2_bold">폰트확인</Typography>
				<Chip label="text" onDelete={() => {
				}} />
				<Chip label="text" />
				<SearchBar placeholder="병원명 검색" value={test} onChangeText={setTest} />
				<DropdownBox placeholder="중증응급질환" items={ITEMS_MOCK} />
			</Sidebar>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});