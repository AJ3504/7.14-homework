import React, { useEffect, useState } from "react";

const { kakao } = window;

const KakaoMap = () => {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();

  useEffect(() => {
    // 카카오 지도 초기화 코드
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(
      37.365264512305174,
      127.10676860117488
    );
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
    setMap(map);
    setMarker(marker);

    // 사용자의 현재 위치를 가져오는 코드
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const currentPos = new kakao.maps.LatLng(
          pos.coords.latitude,
          pos.coords.longitude
        );
        map.setCenter(currentPos);
        marker.setPosition(currentPos);
      },
      () => alert("위치 정보를 가져오는데 실패했습니다."),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );

    // 장소 검색 함수
    function searchPlaces() {
      var keyword = document.getElementById("keyword").value;

      if (!keyword.replace(/^\s+|\s+$/g, "")) {
        alert("키워드를 입력해주세요!");
        return false;
      }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyword, placesSearchCB);
    }

    // 장소검색 결과 콜백 함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        displayPlaces(data);
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수
    function displayPlaces(places) {
      var listEl = document.getElementById("placesList"),
        menuEl = document.getElementById("menu_wrap"),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = "";

      removeAllChildNods(listEl);
      removeMarker();

      for (var i = 0; i < places.length; i++) {
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]);

        bounds.extend(placePosition);

        (function (marker, title) {
          kakao.maps.event.addListener(marker, "mouseover", function () {
            displayInfowindow(marker, title);
          });

          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });

          itemEl.onmouseover = function () {
            displayInfowindow(marker, title);
          };

          itemEl.onmouseout = function () {
            infowindow.close();
          };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }

      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;

      map.setBounds(bounds);
    }

    function getListItem(index, places) {
      var el = document.createElement("li"),
        itemStr =
          '<span class="markerbg marker_' +
          (index + 1) +
          '"></span>' +
          '<div class="info">' +
          "   <h5>" +
          places.place_name +
          "</h5>";

      if (places.road_address_name) {
        itemStr +=
          "    <span>" +
          places.road_address_name +
          "</span>" +
          '   <span class="jibun gray">' +
          places.address_name +
          "</span>";
      } else {
        itemStr += "    <span>" + places.address_name + "</span>";
      }

      itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

      el.innerHTML = itemStr;
      el.className = "item";

      return el;
    }

    function addMarker(position, idx, title) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png",
        imageSize = new kakao.maps.Size(36, 37),
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691),
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
          offset: new kakao.maps.Point(13, 37),
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position,
          image: markerImage,
        });

      marker.setMap(map);
      markers.push(marker);

      return marker;
    }

    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    function displayPagination(pagination) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    function displayInfowindow(marker, title) {
      var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }

    // 검색 결과 목록을 담을 배열
    var markers = [];

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();

    // 검색 버튼 클릭 시 장소 검색 함수 호출
    document.getElementById("searchBtn").onclick = searchPlaces;

    // 검색 결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    var infowindow = new kakao.maps.InfoWindow({
      zIndex: 1,
    });
  }, []);

  return (
    <>
      <input type="text" id="keyword" />
      <button id="searchBtn">검색</button>

      <div style={{ display: "flex" }}>
        <div
          id="menu_wrap"
          style={{ width: "20%", height: "700px", overflowY: "scroll" }}
        >
          <ul id="placesList"></ul>
          <div id="pagination" style={{ textAlign: "center" }}></div>
        </div>

        <div id="map" style={{ width: "80%", height: "700px" }}></div>
      </div>
    </>
  );
};

export default KakaoMap;

// import React, { useEffect, useState } from "react";

// const { kakao } = window;

// const KakaoMap = () => {
//   //UseStates
//   const [map, setMap] = useState();
//   const [marker, setMarker] = useState();

//   useEffect(() => {
//     //📌카카오지도 초기화 코드
//     const container = document.getElementById("map"); //지도를 표시할 div요소 선택
//     const options = {
//       center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488), //지도의 중심 좌표
//       level: 3, //지도의 확대 레벨
//     };

//     const map = new kakao.maps.Map(container, options); //지도 객체 생성
//     const markerPosition = new kakao.maps.LatLng(
//       37.365264512305174,
//       127.10676860117488
//     ); //초기 마커 위치 좌표
//     const marker = new kakao.maps.Marker({
//       position: markerPosition,
//     }); //초기 마커 객체 생성
//     marker.setMap(map); //📌초기 마커를 지도에 표시
//     setMap(map); //상태 변수에 지도 객체 저장
//     setMarker(marker); //상태 변수에 마커 객체 저장

//     //📌사용자의 현재 위치를 가져와서 -> 지도/마커를 해당 위치로 이동시키는 코드
//     navigator.geolocation.getCurrentPosition(
//       //위치정보를 성공적으로 가져왔을 경우, 실행되는 콜백 함수. 여기서 pos 매개변수는 : 위치 정보 객체를 나타냄
//       (pos) => {
//         const currentPos = new kakao.maps.LatLng(
//           pos.coords.latitude,
//           pos.coords.longitude
//         );
//         map.setCenter(currentPos); //지도의 중심을 -> 사용자의 현재 위치로 이동
//         marker.setPosition(currentPos); //마커도 -> 사용자의 현재 위치로 이동
//       },
//       //위치 정보를 가져오지 못한 경우
//       () => alert("위치 정보를 가져오는데 실패했습니다."),
//       //위치 정보를 요청할 때 사용되는 옵션 객체
//       {
//         enableHighAccuracy: true, //높은 정확도의 위치 정보를 요청할지 여부
//         maximumAge: 30000, //캐시된 위치 정보의 유효 기간 (30초) => 캐시된 위치 정보가 이 시간 이내라면 다시 가져오지 않습니다.
//         timeout: 27000, //위치 정보를 가져오기 최대 대기 시간 (27초)
//       }
//     );

//     // 🎃장소 검색 함수
//     function searchPlaces() {
//       var keyword = document.getElementById("keyword").value;

//       if (!keyword.replace(/^\s+|\s+$/g, "")) {
//         alert("키워드를 입력해주세요!");
//         return false;
//       }

//       ps.keywordSearch(keyword, placesSearchCB); //검색어로 장소 검색. //keywordSearch: Places 객체의 메서드 중 하나로, 특정 키워드를 사용하여 장소를 검색하는 함수입니다. 첫 번째 인자로 검색어(searchKeyword)를, 두 번째 인자로는 검색 결과를 처리할 콜백 함수(placesSearchCB)를 전달합니다.  //placesSearchCB: 검색 결과를 처리할 콜백 함수입니다. 이 함수는 keywordSearch 메서드를 호출하여 장소 검색 요청을 보낸 뒤, 검색 결과를 받아와서 이를 처리하는 역할을 합니다. 즉, 장소 검색이 완료되면 이 콜백 함수가 실행되어 검색 결과를 처리하고, 결과로 받은 장소들을 지도에 표시하게 됩니다.
//     }

//     // 🎃장소검색 결과 콜백 함수
//     function placesSearchCB(data, status, pagination) {
//       if (status === kakao.maps.services.Status.OK) {
//         //검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해, LatLngBounds 객체에 좌표를 추가  //=>LatLngBounds 객체는 카카오맵 API에서 사용되는 클래스로, 지리적 좌표 범위를 나타내는 데 사용됩니다. 이 객체는 지도상에 여러 위치를 표시하거나, 특정 위치들의 최소/최대 경계를 계산하는 데에 유용하게 활용됩니다. //=>LatLngBounds 객체는 특정 위치들의 경계를 포함하는 가상의 사각형을 정의합니다. 이 사각형은 해당 위치들의 경계를 둘러싸는 가장 작은 사각형으로, 이러한 사각형의 가장 남서쪽(좌하단) 점과 북동쪽(우상단) 점을 통해 지리적 좌표 범위를 나타냅니다. LatLngBounds 객체를 사용하면, 여러 위치들이 화면에 전부 표시되도록 지도의 중심과 확대 레벨을 조정하는 데 도움이 됩니다. 또한, 장소 검색 결과 등으로 얻은 다수의 위치를 기준으로 지도의 경계를 재설정하는 데에도 활용할 수 있습니다. //=>LatLngBounds 객체를 생성하고 관리하는 메서드와 속성들을 사용하여 지도의 경계를 계산하거나 조작할 수 있으며, 이를 통해 사용자에게 더 편리하고 유용한 지도 기능을 제공할 수 있습니다.
//         displayPlaces(data);
//         displayPagination(pagination);
//       } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
//         alert("검색결과가 존재하지 않습니다.");
//       } else if (status === kakao.maps.services.Status.ERROR) {
//         alert("검색 결과 중 오류가 발생했습니다.");
//       }
//     }

//     // 🎃검색 결과 목록과 마커를 표출하는 함수
//     function displayPlaces(places) {
//       var listEl = document.getElementById("placesList"), //검색 결과 목록을 담을 ul
//         menuEl = document.getElementById("menu_wrap"), //스크롤이 가능한 영역을 만들기 위해
//         fragment = document.createDocumentFragment(),
//         bounds = new kakao.maps.LatLngBounds(), //카카오 맵의 경계를 설정하는 LatLngBounds 객체를 생성하여 bounds 변수에 할당합니다. 이 객체는 검색된 장소들의 위치를 포함하는 최적의 경계를 계산하기 위해 사용됩니다.
//         listStr = "";

//       removeAllChildNods(listEl); //이전 검색 결과를 지우고 새로운 검색 결과를 표출하기 위해
//       removeMarker(); //이전에 지도에 추가된 모든 마커를 삭제

//       for (var i = 0; i < places.length; i++) {
//         //반복문을 통해 검색된 장소 정보(places 배열)를 하나씩 순회
//         var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x), //검색된 장소의 위도(places[i].y)와 경도(places[i].x) 정보를 기반으로 LatLng 객체를 생성하여 placePosition 변수에 할당합니다. 이 객체는 마커를 추가할 위치를 나타냅니다.
//           marker = addMarker(placePosition, i), //addMarker 함수를 호출하여 placePosition에 위치한 마커를 추가하고, 이를 marker 변수에 할당
//           itemEl = getListItem(i, places[i]); //getListItem 함수를 호출하여 검색 결과 목록(placesList)에 표시할 HTML 리스트 아이템을 생성하고, 이를 itemEl 변수에 할당

//         bounds.extend(placePosition)(
//           //placePosition에 위치한 장소를 경계에 포함시키기 위해 bounds 객체에 해당 위치를 추가

//           function (marker, title) {
//             kakao.maps.event.addListener(marker, "mouseover", function () {
//               displayInfowindow(marker, title);
//             });

//             kakao.maps.event.addListener(marker, "mouseout", function () {
//               infowindow.close();
//             });

//             itemEl.onmouseover = function () {
//               //검색결과 목록
//               displayInfowindow(marker, title);
//             };

//             itemEl.onmouseout = function () {
//               infowindow.close();
//             };
//           }
//         )(marker, places[i].place_name); //각 장소의 이름을 나타내는 문자열

//         fragment.appendChild(itemEl); //이전에 생성한 검색 결과 목록의 리스트 아이템(itemEl)을 fragment에 추가
//       }

//       listEl.appendChild(fragment); //fragment에 추가된 모든 검색 결과 목록의 리스트 아이템들을 실제 HTML 문서의 검색 결과 목록(listEl)에 추가
//       menuEl.scrollTop = 0; //검색 결과 목록의 스크롤 위치를 맨 위로 설정하여 처음 검색 결과가 표시될 수 있도록 합니다.

//       map.setBounds(bounds); //검색된 모든 장소들이 포함되도록 지도의 경계를 설정합니다. 이로써 지도에 모든 검색 결과가 보이도록 확대/축소됩니다.
//     }

//     //🎃
//     function getListItem(index, places) {
//       //index는 장소의 인덱스를, places는 해당 장소의 정보를 나타내는 객체를 의미
//       var el = document.createElement("li"), //"li": 검색 결과 목록에서 각 장소 정보를 담는 리스트 아이템
//         itemStr = //"itemStr" : 리스트 아이템의 내용을 담을 문자열을 초기화
//           '<span class="markerbg marker_' +
//           (index + 1) +
//           '"></span>' + //리스트 아이템에는 장소를 구분하기 위한 마커 이미지를 표시합니다. index + 1은 1부터 시작하는 인덱스를 1씩 증가시키는 값이며, 해당 값에 따라 다른 마커 이미지가 표시됩니다.
//           '<div class="info">' + //장소의 이름을 <h5> 태그로 표시
//           "   <h5>" +
//           places.place_name +
//           "</h5>";

//       if (places.road_address_name) {
//         //장소에 도로명 주소가 있으면 도로명 주소와 지번 주소를 함께 표시합니다. 그렇지 않으면 지번 주소만 표시
//         itemStr +=
//           "    <span>" +
//           places.road_address_name +
//           "</span>" +
//           '   <span class="jibun gray">' +
//           places.address_name +
//           "</span>";
//       } else {
//         itemStr += "    <span>" + places.address_name + "</span>";
//       }

//       itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>"; //장소의 전화번호를 <span> 태그로 표시하고, </div>로 정보를 닫습니다.

//       el.innerHTML = itemStr; //itemStr 문자열을 <li> 요소의 HTML 내용으로 설정
//       el.className = "item"; //리스트 아이템의 클래스를 'item'으로 설정

//       return el; //완성된 리스트 아이템(<li>) 요소를 반환
//     }

//     //🎃 addMarker함수는, 주어진 위치에 새로운 마커를 생성하고 + 해당 마커를 지도 상에 표시하는 역할을 수행합니다. 또한, markers 배열에 해당 마커를 저장하여 추후에 관리 및 조작할 수 있도록 합니다.
//     //1.position: 마커가 위치할 좌표를 나타내는 kakao.maps.LatLng 객체  2.idx: 마커의 인덱스 (마커모양 결정짓는데 사용)  3.title: 마커에 표시할 장소의 이름
//     function addMarker(position, idx, title) {
//       var imageSrc =
//           "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png",
//         imageSize = new kakao.maps.Size(36, 37),
//         imgOptions = {
//           spriteSize: new kakao.maps.Size(36, 691),
//           spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
//           offset: new kakao.maps.Point(13, 37),
//         },
//         markerImage = new kakao.maps.MarkerImage(
//           imageSrc,
//           imageSize,
//           imgOptions
//         ), //imageSrc, imageSize, imgOptions 정보로 새로운 마커 이미지 객체를 생성 -> 이 객체는 해당 위치에 해당하는 마커 이미지를 의미
//         marker = new kakao.maps.Marker({
//           //kakao.maps.Marker를 사용하여 새로운 마커 객체를 생성 -> 1.position 매개변수로 전달된 위치에 마커를 생성  2.image 속성으로 위에서 생성한 markerImage를 설정하여 마커의 모양을 결정
//           position: position,
//           image: markerImage,
//         });

//       marker.setMap(map); //생성한 마커 객체를 map에 추가하여 지도 상에 마커를 표시. map은 kakao.maps.Map 객체로서, 위에서 생성된 지도 객체를 나타냄.
//       markers.push(marker); //생성한 마커 객체를 markers 배열에 추가합니다. 이 배열은 현재 지도 위에 추가된 모든 마커를 저장하는데 사용됩니다.

//       return marker; //마커 객체를 반환
//     }

//     //🎃 주로 새로운 장소 검색 결과를 표시하기 전에, 이전에 표시되었던 마커들을 제거하여 중복 표시를 방지하는 역할
//     function removeMarker() {
//       //markers 배열에 저장된 모든 마커 객체들을 순회하면서 setMap(null)을 호출합니다. 이로 인해 해당 마커 객체들이 지도 상에서 제거됩니다. 마커 객체를 지도 상에서 제거하는 방법은 setMap(null) 메서드를 사용하는 것입니다. setMap(null)을 호출하면 해당 마커가 지도 상에서 표시되지 않게 됩니다. 모든 마커가 지도 상에서 제거된 후에는 markers 배열을 빈 배열로 초기화합니다.
//       for (var i = 0; i < markers.length; i++) {
//         markers[i].setMap(null);
//       }
//       markers = [];
//     }

//     //🎃
//     function displayPagination(pagination) {
//       //pagination 객체를 매개변수로 받습니다. 이 객체에는 페이지네이션에 필요한 정보(현재 페이지와 총 페이지 수)가 들어있습니다.
//       var paginationEl = document.getElementById("pagination"),
//         fragment = document.createDocumentFragment(),
//         i; //JavaScript에서 var 키워드를 사용하여 변수를 선언하면 해당 변수는 함수 스코프를 가지게 됩니다. 그러나 var 키워드 없이 변수를 선언하면 변수가 자동으로 전역 스코프를 갖게 됩니다. 이는 코드의 다른 부분에서도 i를 참조할 수 있다는 의미입니다.

//       while (paginationEl.hasChildNodes()) {
//         paginationEl.removeChild(paginationEl.lastChild);
//       } //paginationEl이라는 DOM 요소를 가져와서, 이전에 표시되었던 페이지 번호 목록을 모두 제거합니다.

//       for (i = 1; i <= pagination.last; i++) {
//         var el = document.createElement("a"); //pagination.last 값을 기준으로 1부터 pagination.last까지의 페이지 번호를 생성하고, 각 번호를 a 태그로 감싸서 페이지 번호 목록을 생성
//         el.href = "#";
//         el.innerHTML = i;

//         if (i === pagination.current) {
//           //만약 현재 페이지 번호인 i와 생성 중인 페이지 번호가 같다면, 해당 a 태그에 on 클래스를 추가하여 현재 페이지를 표시
//           el.className = "on";
//         } else {
//           //그렇지 않으면 해당 페이지 번호의 a 태그에 클릭 이벤트 리스너를 추가합니다. 클로저를 사용하여 클릭 이벤트가 발생할 때 pagination.gotoPage(i)를 호출하도록 합니다.
//           el.onclick = (function (i) {
//             return function () {
//               pagination.gotoPage(i);
//             };
//           })(i);
//         }

//         fragment.appendChild(el); //생성된 페이지 번호 목록을 fragment에 추가
//       }
//       paginationEl.appendChild(fragment); //paginationEl에 fragment를 추가하여 페이지 번호 목록이 실제로 화면에 표시
//     }

//     //🎃인포윈도우의 내용을 동적으로 변경하여, 원하는 정보를 표시할 수 있도록 하는 함수
//     function displayInfowindow(marker, title) {
//       var content = '<div style="padding:5px;z-index:1;">' + title + "</div>"; //인포윈도우에 표시할 내용을 HTML 형식으로 문자열 content에 저장

//       infowindow.setContent(content); //infowindow 객체의 setContent 메서드를 사용하여 인포윈도우의 내용을 content로 설정
//       infowindow.open(map, marker); //infowindow 객체의 open 메서드를 사용하여 인포윈도우를 엽니다. 이때, 인포윈도우가 표시될 지도 객체는 map이며, 위치는 marker가 가리키는 마커 위치입니다. 이로써 인포윈도우가 특정 마커와 연결되어 해당 마커에 정보를 표시
//     }

//     //🎃
//     function removeAllChildNods(el) {
//       //함수 내부에서 el 파라미터는 DOM 요소를 가리키는 변수입니다. 함수가 호출되면, 해당 DOM 요소에 자식 노드가 있는 동안에는 반복적으로 el.lastChild를 사용하여 가장 마지막 자식 노드를 찾고, el.removeChild()를 사용하여 해당 자식 노드를 제거합니다. 이 과정을 자식 노드가 모두 제거될 때까지 반복하면, el 요소의 자식 노드들이 모두 삭제되게 됩니다. //이 코드에서 removeAllChildNods(listEl)와 removeAllChildNods(paginationEl)은 검색 결과 목록과 페이지네이션에 사용된 DOM 요소의 모든 자식 노드를 제거하여 새로운 검색 결과나 페이지네이션을 렌더링하기 전에 이전에 표시되었던 결과들을 모두 삭제하는 역할을 합니다. 이를 통해 새로운 검색 결과를 업데이트하거나 페이지네이션을 갱신할 수 있도록 합니다.
//       while (el.hasChildNodes()) {
//         el.removeChild(el.lastChild);
//       }
//     }

//     //🎃
//     // 검색 결과 목록을 담을 배열
//     var markers = [];

//     // 장소 검색 객체를 생성
//     var ps = new kakao.maps.services.Places();

//     // 검색 버튼 클릭 시 -> 장소 검색 함수 호출
//     document.getElementById("searchBtn").onClick = searchPlaces;

//     // 검색 결과 목록 또는 마커를 클릭했을 때, 호출되는 함수
//     // 인포윈도우에 장소명을 표시
//     var infowindow = new kakao.maps.InfoWindow({
//       zIndex: 1,
//     });
//   }, []);

//   //------------------------------------------------------------------------------------------------------------------------------------//

//   return (
//     <>
//       <input type="text" id="keyword" />
//       <button id="searchBtn">검색</button>

//       <div style={{ display: "flex" }}>
//         <div
//           id="menu_wrap"
//           style={{ width: "20%", height: "700px", overflowY: "scroll" }}
//         >
//           <ul id="placesList"></ul>
//           <div id="pagination" style={{ textAlign: "center" }}></div>
//         </div>

//         <div id="map" style={{ width: "80%", height: "700px" }}></div>
//       </div>
//     </>
//   );
// };

// export default KakaoMap;
