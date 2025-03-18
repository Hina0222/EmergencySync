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

export default function App() {
	const [test, setTest] = useState("");

	return (
		<View style={{padding:10}}>
			<StatusBar style="auto" />
			<Button onPress={() => {
			}} isActive={true}>조회하기</Button>
			<CheckBox label="전체 확인" />
			<Typography color="green10" size="T2_bold">폰트확인</Typography>
			<Chip label="text" onClose={() => {
			}} />
			<Chip label="text" />
			<SearchBar placeholder="병원명 검색" value={test} onChangeText={setTest} />
			<DropdownBox placeholder="text" items={ITEMS_MOCK} />
		</View>
	);
}