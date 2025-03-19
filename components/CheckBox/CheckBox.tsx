import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./CheckBox.styles";
import CheckIcon from "../../assets/icons/CheckIcon.svg";

interface CheckBoxPropsType {
	item: { id: number; content: string };
	checked: boolean;
	onToggle: () => void;
}

export default function CheckBox({ item, checked, onToggle }: CheckBoxPropsType) {
	return (
		<TouchableOpacity onPress={onToggle} activeOpacity={1} style={styles.container}>
			<View style={[styles.checkbox, checked && styles.checked]}>
				{checked && <CheckIcon />}
			</View>
			<Text style={styles.text}>{item.content}</Text>
		</TouchableOpacity>
	);
}
