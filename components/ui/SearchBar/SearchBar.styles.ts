import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
	viewContainer: {
		paddingHorizontal: 24,
		position: "relative",
		zIndex: 1
	},
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 16,
		paddingHorizontal: 20,
		backgroundColor: theme.neutral90,
		borderColor: theme.neutral90,
		borderWidth: 1,
		borderRadius: 8,
		height: 50
	},
	textInput: {
		flex: 1,
		color: theme.neutral10,
		fontWeight: "600",
		fontSize: 18,
		lineHeight: 24
	},
	focus: {
		borderColor: theme.primary50
	},
	list: {
		position: "absolute",
		left: 0,
		right: 0,
		backgroundColor: theme.white,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
		borderColor: theme.neutral90,
		zIndex: 10
	},
	listItem: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		backgroundColor:theme.white
	}
});