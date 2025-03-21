import { Pressable, Text } from "react-native";
import CloseIcon from "../../../assets/icons/CloseIcon.svg";
import { styles } from "./Chip.styles";

interface ChipPropsType {
	label: string;
	onDelete?: () => void;
}

export default function Chip({ label, onDelete }: ChipPropsType) {
	return (
		<Pressable
			onPress={onDelete}
			style={styles.container}
		>
			<Text style={styles.text}>{label}</Text>
			{onDelete && (
				<Pressable onPress={onDelete}>
					<CloseIcon />
				</Pressable>
			)}
		</Pressable>
	);
}