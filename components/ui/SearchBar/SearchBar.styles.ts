import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 16,
		marginBottom: 40,
		paddingHorizontal: 20,
		backgroundColor: theme.neutral90,
		borderRadius: 8,
		height: 50
	},
	textInput: {
		flex: 1,
		color: theme.neutral10,
		fontWeight: "600",
		fontSize: 18,
		lineHeight: 24
	}
});