export type Description = {
	/** 전달메시지 */
	symBlkMsg: string;
	/** 메시지구분 */
	symBlkMsgTyp: string;
	/** 중증질환구분 */
	symTypCod: string;
	/** 중증질환명 */
	symTypCodMag: string;
	/** 중증질환 표출구분 */
	symOutDspYon: string;
	/** 표출 차단구분 */
	symOutDspMth: string;
	/** 차단시작일시 (YYYYMMDDHHMMSS 형식) */
	symBlkSttDtm: string;
	/** 차단종료일시 (YYYYMMDDHHMMSS 형식) */
	symBlkEndDtm: string;
};


export interface Hospital {
	hpid: string;
	dutyName: string;
	dutyTel3: string;
	messages: Description[];
	wgs84Lon?: string;
	wgs84Lat?: string;
	distance?: string;
	estimate?: number;
}

export interface HospitalDropdownItem {
	id: string;
	content: string;
}