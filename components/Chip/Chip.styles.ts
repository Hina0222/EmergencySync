import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "flex-start",
		paddingVertical: 5,
		paddingHorizontal: 10,
		gap: 6,
		backgroundColor: theme.neutral90,
		borderRadius: 8,
	},
	text: {
		color: theme.neutral20,
		fontSize: 16,
		fontWeight: 500,
		lineHeight: 24
	}
});