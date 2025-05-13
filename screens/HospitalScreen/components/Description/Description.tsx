import { FlatList, Pressable, View } from "react-native";
import Typography from "../../../../components/ui/Typography/Typography";
import TriangleIcon from "../../../../assets/icons/TriangleIcon.svg";
import { useState } from "react";
import { Hospital } from "../../../../types/hospital";
import { styles } from "./Description.styles";
import { Pagination } from "react-native-snap-carousel-v4";
import { theme } from "../../../../styles/theme";
import { formatDate } from "../../../../util";

interface DescriptionProps {
	hospital: Hospital;
	type: "popup" | "list";
}

export default function Description({ hospital, type }: DescriptionProps) {
	const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [containerWidth, setContainerWidth] = useState(0);

	const messages = hospital.messages ?? [];

	return (
		<View>
			{
				type === "list" ?
					<View>
						{messages.length > 0 && hospital.messages[0]?.symBlkMsg &&
							<Pressable
								onPress={() => {
									setIsDescriptionOpen(prev => !prev);
								}}
								style={styles.container}
							>
								<View style={styles.description}>
									<FlatList
										data={isDescriptionOpen ? hospital.messages : hospital.messages.slice(0, 1)}
										keyExtractor={(_, index) => index.toString()}
										ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
										renderItem={(itemData) => (
											<>
												<Typography
													color="neutral20"
													size="B2_medium"
													{...(!isDescriptionOpen ? { numberOfLines: 1, ellipsizeMode: "tail" } : {})}>
													<Typography color="neutral50" size="B2_medium">응급 </Typography>
													{itemData.item?.symBlkMsg}
												</Typography>
												{isDescriptionOpen &&
													<Typography color="neutral50"
																			size="B2_medium">{formatDate(itemData.item?.symBlkSttDtm)}</Typography>
												}
											</>
										)}
									/>
								</View>
								{isDescriptionOpen ? <TriangleIcon transform={[{ scaleY: -1 }]} /> : <TriangleIcon />}
							</Pressable>
						}
					</View>
					:
					<View>
						{
							messages.length > 0 && hospital.messages[0]?.symBlkMsg &&
							<View style={[styles.container, {
								flexDirection: "column",
								marginTop: 20
							}, hospital.messages.length === 1 ? { marginBottom: 14 } : {}]}
							>
								<View style={styles.description}
											onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}>
									<FlatList
										data={hospital.messages}
										keyExtractor={(_, index) => index.toString()}
										ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
										renderItem={(itemData) => (
											<View style={{ width: containerWidth }}>
												<Typography color="neutral20" size="B2_medium">
													<Typography color="neutral50" size="B2_medium">응급 </Typography>
													{itemData.item?.symBlkMsg}
												</Typography>
												<Typography color="neutral50"
																		size="B2_medium">{formatDate(itemData.item?.symBlkSttDtm)}</Typography>
											</View>
										)}
										horizontal
										pagingEnabled
										showsHorizontalScrollIndicator={false}
										onScroll={(event) => {
											const index = Math.round(event.nativeEvent.contentOffset.x / containerWidth);
											setActiveIndex(index);
										}}
										scrollEventThrottle={16}
									/>
								</View>
								<Pagination
									dotsLength={hospital.messages.length}
									activeDotIndex={activeIndex}
									containerStyle={{ paddingTop: 8, paddingBottom: 0 }}
									dotStyle={{ width: 6, height: 6, borderRadius: 5, backgroundColor: theme.primary50 }}
									inactiveDotStyle={{ width: 10, height: 10, borderRadius: 5, backgroundColor: theme.neutral80 }}
								/>
							</View>
						}
					</View>
			}
		</View>
	);
}
