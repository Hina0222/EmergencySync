import { Pressable, View } from "react-native";
import { styles } from "./SidebarButton.styles";
import LeftArrowIcon from "../../../../../assets/icons/LeftArrowIcon.svg";
import RightArrowIcon from "../../../../../assets/icons/RightArrowIcon.svg";
import { theme } from "../../../../../styles/theme";

interface SidebarButtonPropsType {
	isOpen: boolean;
	onPress: () => void;
}

export default function SidebarButton({ isOpen, onPress }: SidebarButtonPropsType) {

	return (
		<View style={styles.container}>
			<Pressable
				onPress={onPress}
				style={styles.button}
			>
				{isOpen ? <RightArrowIcon color={theme.neutral50} /> : <LeftArrowIcon color={theme.neutral50} />}
			</Pressable>
		</View>
	);
}