import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
	outerContainer: {
		position: "absolute",
		right: 0,
		top: 0,
		bottom: 0,
		flexDirection: "row",
		width: "35%"
	},
	innerContainer: {
		flex: 1,
		paddingHorizontal: 24,
		paddingBottom: 44,
		paddingTop: Constants.statusBarHeight + 12,
		backgroundColor: theme.white
	}
});