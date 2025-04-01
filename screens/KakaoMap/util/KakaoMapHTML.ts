export const KAKAO_MAP_HTML = `
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=ec5ecebbfc5d51a7620ae20cba6a8310&libraries=services"></script> 
    </head>
    <body>
        <div id="map" style="width:100%;height:100%;"></div>
        <script type="text/javascript">
						let map;
						let currentMarker = null;
						let polyline = null; // 기존 Polyline을 저장할 변수
						
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
								map.setCenter(newPosition);
				
								// 기존 마커 제거
								if (currentMarker) {
										currentMarker.setMap(null);
								}
				
								// 새 마커 생성
								currentMarker = new kakao.maps.Marker({
										position: newPosition
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
				
								data.routes[0].sections[0].roads.forEach((router) => {
										router.vertexes.forEach((vertex, index) => {
												if (index % 2 === 0) {
														const point = new kakao.maps.LatLng(
																router.vertexes[index + 1],
																router.vertexes[index]
														);
														postLinePath.push(point);
														bounds.extend(point); // 지도 범위 확장
												}
										});
								});
				
								// 새 Polyline 생성
								polyline = new kakao.maps.Polyline({
										path: postLinePath,
										strokeWeight: 6,
										strokeColor: "#4C3EED",
										strokeOpacity: 1,
										strokeStyle: "solid",
								});
				
								// 지도에 Polyline 표시
								polyline.setMap(map);
								console.log('경로 표시 완료');
								
								// 범위 조정 
								map.setBounds(bounds);
				
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