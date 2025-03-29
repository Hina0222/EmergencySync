import { FlatList, Pressable, View } from "react-native";
import { styles } from "./HospitalScreen.styles";
import { theme } from "../../styles/theme";
import { HOSPITALS_MOCK } from "../../mock";
import LeftArrowIcon from "../../assets/icons/LeftArrowIcon.svg";
import HospitalItem from "./components/HospitalItem";

export default function HospitalScreen() {
	return (
		<View style={styles.container}>
			<View>
				<Pressable onPress={() => {
				}}>
					<LeftArrowIcon color={theme.black} width={24} height={24} />
				</Pressable>
			</View>
			<FlatList
				data={HOSPITALS_MOCK}
				keyExtractor={(item) => item.id}
				renderItem={(itemData) => (
					<HospitalItem hospital={itemData.item} />
				)}
			/>
		</View>
	);
}