import { StyleSheet } from "react-native";
import { theme } from "../../../../../styles/theme";

export const styles = StyleSheet.create({
	container: {
		justifyContent: "center"
	},
	button: {
		alignSelf: "flex-start",
		paddingHorizontal: 6,
		paddingVertical: 22,
		borderBottomLeftRadius: 8,
		borderTopLeftRadius: 8,
		backgroundColor: theme.white
	}
});