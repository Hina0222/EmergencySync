import { Hospital } from "../types/hospital";
import { getCarDirection } from "../apis/kakaoMap/getCarDirection";
import { MutableRefObject } from "react";
import * as Location from "expo-location";

export function formatDate(dateStr: string): string {
	if (dateStr.length !== 14) return "";

	const year = dateStr.slice(0, 4);
	const month = dateStr.slice(4, 6);
	const day = dateStr.slice(6, 8);
	const hour = dateStr.slice(8, 10);
	const minute = dateStr.slice(10, 12);

	return `${year}-${month}-${day} ${hour}:${minute}`;
}

const hospitalKeys: (keyof Hospital)[] = [
	"hpid", "dutyName", "dutyTel3", "messages", "wgs84Lon", "wgs84Lat"
];

export function pickHospitalFields(data: any): Hospital {
	const result: Partial<Hospital> = {};
	for (const key of hospitalKeys) {
		if (key in data) result[key] = data[key];
	}
	return result as Hospital;
}

export const handleHospitalSelect = async (
	hospital: Hospital,
	location: Location.LocationObject | null,
	setSelectedHospital: (hospital: Hospital) => void,
	webViewRef: MutableRefObject<any> | null,
) => {
	setSelectedHospital(hospital);

	if (!location) {
		console.log("알림", "현재 위치를 가져오지 못했습니다. 위치 권한을 확인해 주세요.");
		return;
	}

	if (!hospital.wgs84Lon || !hospital.wgs84Lat) {
		console.log("알림", "선택된 병원의 위치 정보가 없습니다.");
		return;
	}

	try {
		const destinationPosition = {
			longitude: hospital.wgs84Lon,
			latitude: hospital.wgs84Lat
		};

		const result = await getCarDirection(location, destinationPosition);

		webViewRef?.current?.postMessage(
			JSON.stringify({
				type: "DRAW_LINE_PATH",
				routes: result.routes
			})
		);
	} catch (error) {
		console.error("경로 계산 오류:", error);
	}
};