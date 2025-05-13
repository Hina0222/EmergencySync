import axios from "axios";

export async function getHospitalsInfo() {
	try {
		const response = await axios.get("http://10.0.2.2:3000/hospital-info");
		return response.data;
	} catch (error) {
		console.error("에러 발생", error);
	}
}