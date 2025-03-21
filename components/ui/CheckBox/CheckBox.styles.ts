import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-start",
		gap: 4
	},
	checkbox: {
		width: 16,
		height: 16,
		borderWidth: 2,
		borderColor: theme.neutral70,
		borderRadius: 4,
		margin: 4,
		justifyContent: "center",
		alignItems: "center"
	},
	checked: {
		backgroundColor: theme.primary50,
		borderColor: theme.primary50
	},
	text: {
		color: theme.neutral10,
		fontSize: 16,
		fontWeight: "500",
		lineHeight: 24
	}
});