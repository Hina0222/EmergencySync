import { ScrollView, View } from "react-native";
import { styles } from "./SearchScreen.styles";
import Typography from "../../components/ui/Typography/Typography";
import CheckBox from "../../components/ui/CheckBox/CheckBox";
import DropdownBox from "../../components/ui/DropdownBox/DropdownBox";
import { ITEMS_MOCK } from "../../mock";
import Button from "../../components/ui/Button/Button";

export default function SearchScreen() {
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View>
					<View style={styles.row}>
						<Typography color="neutral30" size="T4_medium">일반 질환</Typography>
						<CheckBox item={{ id: 1, content: "전체 선택" }} checked={false} onToggle={() => {
						}} />
					</View>
					<DropdownBox placeholder="일반질환" items={ITEMS_MOCK} />
				</View>
				<View>
					<View style={styles.row}>
						<Typography color="neutral30" size="T4_medium">중증응급질환</Typography>
						<CheckBox item={{ id: 1, content: "전체 선택" }} checked={false} onToggle={() => {
						}} />
					</View>
					<DropdownBox placeholder="중증응급질환" items={ITEMS_MOCK} />
				</View>
				<View>
					<View style={styles.row}>
						<Typography color="neutral30" size="T4_medium">장비 정보 (선택)</Typography>
						<CheckBox item={{ id: 1, content: "전체 선택" }} checked={false} onToggle={() => {
						}} />
					</View>
					<DropdownBox placeholder="장비정보" items={ITEMS_MOCK} />
				</View>
			</ScrollView>
			<Button onPress={() => {
			}} isActive={false}>조회하기</Button>
		</View>
	);
}