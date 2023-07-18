import { useEffect, useState } from "react";

const { kakao } = window;

const KakaoMap = () => {
  //UseStates
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");

  //objects
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); //zIndex: 1은 인포윈도우의 레이어 순서를 지정하는 값입니다. 인포윈도우의 레이어 순서를 조정하여 지도 위에서 다른 오버레이(예: 마커, 도형 등)와의 겹침 현상을 관리하거나 컨트롤할 수 있습니다. 예를 들어, 인포윈도우의 zIndex를 높게 설정하면, 해당 인포윈도우가 다른 마커보다 위에 표시되게 할 수 있습니다. 이렇게 하면 사용자가 특정 마커를 클릭했을 때, 인포윈도우가 다른 마커들과 겹치지 않고 더 잘 보이게 할 수 있습니다.
  const ps = new kakao.maps.services.Places(); //장소검색서비스 객체. kakao.maps.services.Places()는 카카오맵 API에서 제공하는 장소 검색 서비스를 생성하는 클래스

  //others

  useEffect(() => {
    const container = document.getElementById("map"); //지도를 표시할 div요소 선택
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488), //지도의 중심 좌표
      level: 3, //지도의 확대 레벨
    };

    const map = new kakao.maps.Map(container, options); //지도 객체 생성
    const markerPosition = new kakao.maps.LatLng(
      37.365264512305174,
      127.10676860117488
    ); //초기 마커 위치 좌표
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    }); //초기 마커 객체 생성
    marker.setMap(map); //📌초기 마커를 지도에 표시
    setMap(map); //상태 변수에 지도 객체 저장
    setMarker(marker); //상태 변수에 마커 객체 저장

    //📌사용자의 현재 위치를 가져와서 -> 지도/마커를 해당 위치로 이동시키는 코드
    navigator.geolocation.getCurrentPosition(
      //위치정보를 성공적으로 가져왔을 경우, 실행되는 콜백 함수. 여기서 pos 매개변수는 : 위치 정보 객체를 나타냄
      (pos) => {
        const currentPos = new kakao.maps.LatLng(
          pos.coords.latitude,
          pos.coords.longitude
        );
        map.setCenter(currentPos); //지도의 중심을 -> 사용자의 현재 위치로 이동
        marker.setPosition(currentPos); //마커도 -> 사용자의 현재 위치로 이동
      },
      //위치 정보를 가져오지 못한 경우
      () => alert("위치 정보를 가져오는데 실패했습니다."),
      //위치 정보를 요청할 때 사용되는 옵션 객체
      {
        enableHighAccuracy: true, //높은 정확도의 위치 정보를 요청할지 여부
        maximumAge: 30000, //캐시된 위치 정보의 유효 기간 (30초) => 캐시된 위치 정보가 이 시간 이내라면 다시 가져오지 않습니다.
        timeout: 27000, //위치 정보를 가져오기 최대 대기 시간 (27초)
      }
    );
  }, []);

  //❷장소 검색 콜백 함수
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      //검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해, LatLngBounds 객체에 좌표를 추가
      //=>LatLngBounds 객체는 카카오맵 API에서 사용되는 클래스로, 지리적 좌표 범위를 나타내는 데 사용됩니다. 이 객체는 지도상에 여러 위치를 표시하거나, 특정 위치들의 최소/최대 경계를 계산하는 데에 유용하게 활용됩니다.
      //=>LatLngBounds 객체는 특정 위치들의 경계를 포함하는 가상의 사각형을 정의합니다. 이 사각형은 해당 위치들의 경계를 둘러싸는 가장 작은 사각형으로, 이러한 사각형의 가장 남서쪽(좌하단) 점과 북동쪽(우상단) 점을 통해 지리적 좌표 범위를 나타냅니다. LatLngBounds 객체를 사용하면, 여러 위치들이 화면에 전부 표시되도록 지도의 중심과 확대 레벨을 조정하는 데 도움이 됩니다. 또한, 장소 검색 결과 등으로 얻은 다수의 위치를 기준으로 지도의 경계를 재설정하는 데에도 활용할 수 있습니다.
      //=>LatLngBounds 객체를 생성하고 관리하는 메서드와 속성들을 사용하여 지도의 경계를 계산하거나 조작할 수 있으며, 이를 통해 사용자에게 더 편리하고 유용한 지도 기능을 제공할 수 있습니다.
      var bounds = new kakao.maps.LatLngBounds();

      for (var i = 0; i < data.length; i++) {
        displayMarker(data[i]); //📌검색된 장소들을 지도에 마커로 표시
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x)); //📌지도의 경계를 검색된 장소들을 기준으로 재설정
      }

      //검색된 장소 위치를 기준으로, 📌지도 범위를 재설정 (지도의 중심과 확대 레벨을 적절히 조정하여 검색된 장소들이 모두 표시되도록 할 수 있습니다. 검색된 장소들을 모두 표시하는 가장 최적의 화면을 보여주는 데에 이용됩니다.)
      map.setBounds(bounds);
    }
  }

  //❸
  function displayMarker(place) {
    //📌마커 생성하고, 지도에 표시
    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    //📌마커에 클릭이벤트를 등록
    kakao.maps.event.addListener(marker, "click", function () {
      //마커를 클릭시, 장소명이 인포윈도우에 표출됨
      infowindow.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          "</div>"
      );
      infowindow.open(map, marker);
    });
  }

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = () => {
    if (searchKeyword.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }

    ps.keywordSearch(searchKeyword, placesSearchCB); //검색어로 장소 검색. //keywordSearch: Places 객체의 메서드 중 하나로, 특정 키워드를 사용하여 장소를 검색하는 함수입니다. 첫 번째 인자로 검색어(searchKeyword)를, 두 번째 인자로는 검색 결과를 처리할 콜백 함수(placesSearchCB)를 전달합니다.  //placesSearchCB: 검색 결과를 처리할 콜백 함수입니다. 이 함수는 keywordSearch 메서드를 호출하여 장소 검색 요청을 보낸 뒤, 검색 결과를 받아와서 이를 처리하는 역할을 합니다. 즉, 장소 검색이 완료되면 이 콜백 함수가 실행되어 검색 결과를 처리하고, 결과로 받은 장소들을 지도에 표시하게 됩니다.
  };

  return (
    <>
      <div style={{ marginBottom: "30px" }}>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="지역을 입력해주세요"
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div id="map" style={{ width: "1000px", height: "700px" }}></div>
    </>
  );
};

export default KakaoMap;
