import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./CheckBox.styles";
import CheckIcon from "../../../assets/icons/CheckIcon.svg";
import Typography from "../Typography/Typography";

interface CheckBoxPropsType {
	item: { id: string; content: string };
	checked: boolean;
	onToggle: () => void;
}

export default function CheckBox({ item, checked, onToggle }: CheckBoxPropsType) {
	return (
		<TouchableOpacity onPress={onToggle} activeOpacity={1} style={styles.container}>
			<View style={[styles.checkbox, checked && styles.checked]}>
				{checked && <CheckIcon />}
			</View>
			<View style={{ flexShrink: 1 }}>
				<Typography
					color="neutral10"
					size="B1_medium"
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{item.content}
				</Typography>
			</View>
		</TouchableOpacity>
	);
}
