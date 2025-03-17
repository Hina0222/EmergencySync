import { StatusBar } from "expo-status-bar";
import CheckBox from "./components/CheckBox/CheckBox";
import Button from "./components/Button/Button";

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<Button onPress={()=>{}} isActive={true}>조회하기</Button>
			<CheckBox>전체확인</CheckBox>
		</>
	);
}