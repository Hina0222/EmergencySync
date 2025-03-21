import { Pressable, View } from "react-native";
import { styles } from "./SidebarButton.styles";
import LeftArrowIcon from "../../../../../assets/icons/LeftArrowIcon.svg";
import RightArrowIcon from "../../../../../assets/icons/RightArrowIcon.svg";

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
				{isOpen ? <RightArrowIcon /> : <LeftArrowIcon />}
			</Pressable>
		</View>
	);
}