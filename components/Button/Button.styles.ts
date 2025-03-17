import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
	button: {
		paddingVertical: 18,
		borderRadius: 8,
		backgroundColor: theme.primary40
	},
	inactiveButton: {
		backgroundColor: theme.neutral90
	},
	text: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "600",
		lineHeight: 28,
		color: theme.white
	},
	inactiveText: {
		color: theme.neutral60
	}
});
