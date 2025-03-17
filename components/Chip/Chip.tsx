import { Pressable, Text } from "react-native";
import CloseIcon from "../../assets/icons/CloseIcon.svg";
import { styles } from "./Chip.styles";

interface ChipPropsType {
	label: string;
	onClose?: () => void;
}

export default function Chip({ label, onClose }: ChipPropsType) {
	return (
		<Pressable
			onPress={onClose}
			style={styles.container}
		>
			<Text style={styles.text}>{label}</Text>
			{onClose && (
				<Pressable onPress={onClose}>
					<CloseIcon />
				</Pressable>
			)}
		</Pressable>
	);
}