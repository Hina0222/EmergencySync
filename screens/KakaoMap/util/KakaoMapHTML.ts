export const KAKAO_MAP_HTML = `
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=ec5ecebbfc5d51a7620ae20cba6a8310&libraries=services"></script> 
    </head>
    <body style="margin:0;">
        <div id="map" style="width:100%;height:100%;"></div>
        <script type="text/javascript">
						let map;
						let currentMarker = null;
						let hospitalMarker = null;
						let polyline = null; 
						const myPositionIcon = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle opacity="0.3" cx="16" cy="16" r="16" fill="#416FEB"/><g filter="url(#filter0_d_1_15)"><circle cx="16" cy="16" r="6" fill="#416FEB"/><circle cx="16" cy="16" r="7.5" stroke="white" stroke-width="3"/></g><defs><filter id="filter0_d_1_15" x="5" y="6" width="26" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="2" dy="3"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0.0732452 0 0 0 0 0.0880518 0 0 0 0 0.184294 0 0 0 0.2 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_15"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_15" result="shape"/></filter></defs></svg>';
						const hospitalPositionIcon = '<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><circle opacity="0.3" cx="22.0469" cy="22.5418" r="22" fill="#59C757"/><g filter="url(#filter0_d_1_7)"><circle cx="22.0469" cy="22.5418" r="9" fill="#0DB431"/><circle cx="22.0469" cy="22.5418" r="10.5" stroke="white" stroke-width="3"/></g><rect x="20.5377" y="18.0418" width="2.925" height="9" rx="1" fill="white"/><rect x="26.5" y="21.0793" width="2.925" height="9" rx="1" transform="rotate(90 26.5 21.0793)" fill="white"/><defs><filter id="filter0_d_1_7" x="8.04688" y="9.54184" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="2" dy="3"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0.0732452 0 0 0 0 0.0880518 0 0 0 0 0.184294 0 0 0 0.2 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_7"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_7" result="shape"/></filter></defs></svg>';

						// 지도 초기화
						function initMap() {
								const container = document.getElementById('map');
								const options = { 
										center: new kakao.maps.LatLng(33.450701, 126.570667),
										level: 3 
								};
				
								map = new kakao.maps.Map(container, options);
				
								// 지도 타일 로드 완료 이벤트 리스너 등록
								kakao.maps.event.addListener(map, 'tilesloaded', function() {
										// 처음 한 번만 실행되도록 이벤트 리스너 제거
										kakao.maps.event.removeListener(map, 'tilesloaded', arguments.callee);
										
										console.log('지도 로드 완료');
				
										// 초기화 완료 알림
										window.ReactNativeWebView.postMessage(JSON.stringify({
												type: 'MAP_READY',
												success: true
										}));
								});
						}
				
						window.addEventListener('message', function(e) {
								handleMessage(e.data);
						});
				
						document.addEventListener('message', function(e) {
								handleMessage(e.data);
						});
				
						// 메시지 처리 함수
						function handleMessage(messageData) {
								try {
										console.log('메시지 수신됨:', messageData);
										const data = JSON.parse(messageData);
										console.log('파싱된 데이터:', data);
										
										if (data.type === 'UPDATE_LOCATION') {
												updateLocation(data);
										} else if (data.type === 'DRAW_LINE_PATH') {
												drawLinePath(data);
										}
								} catch (error) {
										console.error('데이터 처리 오류:', error);
										window.ReactNativeWebView.postMessage(JSON.stringify({
												type: 'ERROR',
												success: false,
												message: error.message
										}));
								}
						}
				
						// 받은 위치로 지도 중심 이동
						function updateLocation(data) {
								if (!map) {
										console.error('지도가 초기화되지 않음');
										return;
								}
				
								const newPosition = new kakao.maps.LatLng(data.latitude, data.longitude);
								map.panTo(newPosition);
				
								// 기존 마커 제거
								if (currentMarker) {
										currentMarker.setMap(null);
								}
								
								const markerImageSrc = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(myPositionIcon);
								const markerSize = new kakao.maps.Size(32, 32);
								const markerOption = { offset: new kakao.maps.Point(16, 16) };
								
								const markerImage = new kakao.maps.MarkerImage(markerImageSrc, markerSize, markerOption);
								
								// 새 마커 생성 (커스텀 이미지 적용)
								currentMarker = new kakao.maps.Marker({
										position: newPosition,
										image: markerImage
								});
				
								// 마커를 지도에 표시
								currentMarker.setMap(map);
				
								console.log('위치 업데이트 완료:', data.latitude, data.longitude);
				
								// 위치 이동 완료 알림
								window.ReactNativeWebView.postMessage(JSON.stringify({
										type: 'LOCATION_UPDATED',
										success: true
								}));
						}
				
						// 받은 경로 데이터를 기반으로 지도에 Polyline 그리기
						function drawLinePath(data) {
								if (!map || !data.routes) {
										console.error('지도가 초기화되지 않았거나 경로 데이터가 없음');
										return;
								}
				
								console.log('경로 데이터 수신:', data);
				
								// 기존 Polyline 제거
								if (polyline) {
										polyline.setMap(null);
								}
				
								const postLinePath = [];
								const bounds = new kakao.maps.LatLngBounds();
								let lastPoint = null;
								
								data.routes[0].sections[0].roads.forEach((router) => {
										router.vertexes.forEach((vertex, index) => {
												if (index % 2 === 0) {
														const point = new kakao.maps.LatLng(
																router.vertexes[index + 1],
																router.vertexes[index]
														);
														postLinePath.push(point);
														bounds.extend(point); // 지도 범위 확장
														lastPoint = point;
												}
										});
								});
				
								// 새 Polyline 생성
								polyline = new kakao.maps.Polyline({
										path: postLinePath,
										strokeWeight: 6,
										strokeColor: "#416FEB",
										strokeOpacity: 1,
										strokeStyle: "solid",
								});
				
								// 지도에 Polyline 표시
								polyline.setMap(map);
								console.log('경로 표시 완료');
								
								// 범위 조정 
								map.setBounds(bounds);
								
								// 병원 마커 추가
								if (lastPoint) {
									const hospitalMarkerImageSrc = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(hospitalPositionIcon);
									const hospitalMarkerSize = new kakao.maps.Size(44, 44);
									const hospitalMarkerOption = { offset: new kakao.maps.Point(22, 22) };
									const hospitalMarkerImage = new kakao.maps.MarkerImage(hospitalMarkerImageSrc, hospitalMarkerSize, hospitalMarkerOption);
									
									if (hospitalMarker) {
										hospitalMarker.setMap(null);
									}
	
									hospitalMarker = new kakao.maps.Marker({
										position: lastPoint,
										image: hospitalMarkerImage
									});
									hospitalMarker.setMap(map);
								}
				
								// 경로 그리기 완료 알림
								window.ReactNativeWebView.postMessage(JSON.stringify({
										type: 'DRAW_LINE_COMPLETED',
										success: true
								}));
						}
				
						// Kakao 지도 SDK가 로드된 후 지도 초기화
						kakao.maps.load(initMap);
				</script>
    </body>
</html>    
`;
