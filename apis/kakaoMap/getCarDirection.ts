import axios from "axios";

export async function getCarDirection(location: any, destinationPosition: any) {
	const REST_API_KEY = "REST_API_KEY";
	const url = "https://apis-navi.kakaomobility.com/v1/directions";

	const origin = `127.177764,36.831038`;
	// const destination = `126.571486,33.453185`;
	// const origin = `${location.coords.longitude},${location.coords.latitude}`;
	const destination = `${destinationPosition.longitude},${destinationPosition.latitude}`;

	// 요청 헤더를 추가합니다.
	const headers = {
		Authorization: `KakaoAK d939f4a6e1ce452c4352540ce3c4732e`,
		"Content-Type": "application/json"
	};

	try {
		const response = await axios.get(url, {
			headers: headers,
			params: {
				origin: origin,
				destination: destination,
				priority: "RECOMMEND"
			}
		});
		const data = response.data;
		return data;
	} catch (error) {
		console.error("에러 발생", error);
	}
}