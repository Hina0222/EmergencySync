import { StatusBar } from "expo-status-bar";
import CheckBox from "./components/CheckBox/CheckBox";
import Button from "./components/Button/Button";
import Typography from "./components/Typography/Typography";
import Chip from "./components/Chip/Chip";
import SearchBar from "./components/SearchBar/SearchBar";
import { useState } from "react";
import DropdownBox from "./components/DropdownBox/DropdownBox";
import { ITEMS_MOCK } from "./mock";
import { View } from "react-native";
import { useFonts } from "expo-font";

export default function App() {
	const [test, setTest] = useState("");
	const [fontsLoaded] = useFonts({
		"Pretendard": require("./assets/fonts/PretendardGOVVariable.ttf")
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<View style={{ padding: 10 }}>
			<StatusBar style="auto" />
			<Button onPress={() => {
			}} isActive={true}>조회하기</Button>
			<Typography color="green10" size="T2_bold">폰트확인</Typography>
			<Chip label="text" onDelete={() => {
			}} />
			<Chip label="text" />
			<SearchBar placeholder="병원명 검색" value={test} onChangeText={setTest} />
			<DropdownBox placeholder="중증응급질환" items={ITEMS_MOCK} />
		</View>
	);
}