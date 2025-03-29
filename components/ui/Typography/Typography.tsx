import { ReactNode } from "react";
import { Text, TextProps } from "react-native";
import { Color } from "../../../types/color";
import { theme } from "../../../styles/theme";
import { styles } from "./Typography.styles";

type TypographyType =
	| "H1"
	| "H2"
	| "H3"
	| "T1"
	| "T2_bold"
	| "T2_semibold"
	| "T3_bold"
	| "T3_semibold"
	| "T3_medium"
	| "T4_bold"
	| "T4_semibold"
	| "T4_medium"
	| "B1_bold"
	| "B1_semibold"
	| "B1_medium"
	| "B2_semibold"
	| "B2_medium"
	| "B3_semibold"
	| "B3_medium";

interface TypographyPropsType extends TextProps {
	color: Color;
	size: TypographyType;
	children: ReactNode;
}

export default function Typography({ color, size, children, ...props }: TypographyPropsType) {
	const Typo = styles[size];
	const Color = theme[color as Color];

	return (
		<Text style={[Typo, { color: Color }]} {...props}>
			{children}
		</Text>
	);
}