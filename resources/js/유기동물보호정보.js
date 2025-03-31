

document.getElementById("button").addEventListener("click", () => {

    const xhr = new XMLHttpRequest();


    let serviceKey = 'L1PuA8lp4JRg3jEO1%2FeOgkPWdYGottpwLv%2BCXY%2BYsVCnYuBp6fqSs4bgpKc38HN6Pj96vzVPaRkIb%2BtblnYISg%3D%3D';
    let sort = document.getElementById("sort").value;
    let status = document.getElementById("status").value;
    let gu = document.getElementById("gu").value;
    let gender = document.getElementById("gender").value;
    let searchKeyword = document.getElementById("searchKeyword").value;
    let url = `http://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList?serviceKey=${serviceKey}&pageNo=1&numOfRows=9&searchCondition3=${status}&searchCondition=${sort}&searchCondition2=${gu}&gubun=${gender}&searchKeyword=${searchKeyword}`;


    xhr.open('GET', url);

    xhr.onload = function () {
        let x2js = new X2JS();
        let json = x2js.xml_str2json(xhr.response);

        let items = json["ServiceResult"]["MsgBody"]["items"];

        for (let i = 0; i < items.length; i++) {
            let str = `<div class="card" data-reg-id="${items[i]["regId"]}">
                        <div class="card-top">
                            <div class="card-state" ${stateCd2Color(items[i]["adoptionStatusCd"])}>${stateCd2Str(items[i]["adoptionStatusCd"])}</div>
                            <img class="card-img" src="https://www.daejeon.go.kr/${items[i]["filePath"]}">
                            
                        </div>
                        <div class="card-bottom">
                            <div>
                                <span class="종">${items[i]["species"]}</span>
                                <span class="성별">${(items[i]["gender"] == 1) ? "암컷" : "수컷"}</span>
                            </div>

                            <div>
                            <span class="regId">관리번호 : ${items[i]["regId"]}</span>
                        </div>
                    </div>`;
            document.querySelector(".card-box").innerHTML += str;
        }

        // card-state 모두 찾아서 입양상태에 따른 배경색 지정


    };
    xhr.send();
})



//입양상태 코드에 따른 문자열값 리턴
function stateCd2Str(cd) {
    if (cd == 1) {
        return "공고중";
    }
    else if (cd == 2) {
        return "입양가능";
    }
    else if (cd == 3) {
        return "입양예정";
    }
    else if (cd == 4) {
        return "입양불가";
    }
    else if (cd == 5) {
        return "임시보호";
    }
    else if (cd == 6) {
        return "주민참여";
    }
    else {
        return "입원중";
    }
}


//입양상태에 따른 색깔 바꾸기
function stateCd2Color(cd) {
    if (cd == 1) {
        return 'style="background-color: darkorange;"';
    }
    else if (cd == 2) {
        return 'style="background-color:  rgb(55, 184, 236)"';
    }
    else if (cd == 3) {
        return 'style="background-color: green;"';
    }
    else if (cd == 4) {
        return 'style="background-color: red;"';
    }
    else if (cd == 5) {
        return 'style="background-color: pink;"';
    }
    else if (cd == 6) {
        return 'style="background-color: purple;"';
    }
    else {
        return 'style="background-color: rgb(121, 83, 18);"';
    }
}



//현재 페이지 번호
let currentPage = 1;

//한 페이지에 표출할 아이템의 수
let itemCountPerPage = 9;

// 전체 아이템 개수
let totalCount;

//맨 마지막 페이지 번호
let finalPage;


function sendAjax() {

    // 검색어 가져오기
    let keyword = document.getElementById("searchKeyword").value;

    // 3. 요청 시 보낼 데이터 (query string) 만들기

    const xhr = new XMLHttpRequest();

    let serviceKey = 'L1PuA8lp4JRg3jEO1%2FeOgkPWdYGottpwLv%2BCXY%2BYsVCnYuBp6fqSs4bgpKc38HN6Pj96vzVPaRkIb%2BtblnYISg%3D%3D';

    let query = `?ServiceKey=${serviceKey}&numOfRows=${itemCountPerPage}&pageNo=${currentPage}&type=json`;

    let url = `http://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList?serviceKey=${serviceKey}&pageNo=1&numOfRows=9&searchCondition3=${status}&searchCondition=${sort}&searchCondition2=${gu}&gubun=${gender}&searchKeyword=${searchKeyword}`;


    //검색어가 입력되어있다면 요청 파라미터에 담음
    if (keyword) {
        query += keyword;
    }

    // 4. AJAX 요청 주소 설정
    xhr.open("GET", url + query) // (방식, 주소)

    // 5. 응답이 올 경우 실행될 함수 설정
    xhr.onload = () => {
        console.log(xhr.response);

        //JSON 객체로 변환

        let x2js = new X2JS();
        let json = x2js.xml_str2json(xhr.response);
        
        console.log(json);  // 배열이 됨

        // 전체 아이템의 개수
        //items = json["ServiceResult"]["MsgBody"]["items"]; (위에서 이미 지정함)
        let items = json["ServiceResult"]["MsgBody"]["items"];
        totalCount = items.length;

        // 마지막 페이지 번호
        finalPage = Math.ceil(totalCount / itemCountPerPage);
        console.log("마지막 페이지 : " + finalPage);

        //유기동물을 그리기 전에 기존 유기동물 그린 것 제거
        document.querySelector(".card-box").innerHTML = "";

        // useArray 내부 JSON 객체들을 이용해서 각각 div card 를 만들고, div card-box에 추가하기
        for (let i = 0; i < items.length; i++) {
            let imgSrc = items[i]["filePath"];

            if (!items[i]["filePath"]) {
                imgSrc = "https://www.gachinet.co.kr/assets/images/common/thumb_no_img.png";
            }

            let str = `<div class="card" data-animal-seq="${items[i]["animalSeq"]}" onclick="goDetail()">
                        <div class="card-top">
                            <div class="card-state" ${stateCd2Color(items[i]["adoptionStatusCd"])}>${stateCd2Str(items[i]["adoptionStatusCd"])}</div>
                             <img class="card-img" src="${imgSrc}">
                        </div>
                        <div class="card-bottom">
                            <div>
                                <span class="종">${items[i]["species"]}</span>
                                <span class="성별">${(items[i]["gender"] == 1) ? "암컷" : "수컷"}</span>
                            </div>

                            <div>
                            <span class="regId">관리번호 : ${items[i]["regId"]}</span>
                        </div>
                    </div>`;
            document.querySelector(".card-box").innerHTML += str;

        }








    }

    // 6. AJAX 요청 보내기
    xhr.send();
}

//첫페이지 진입시 1페이지 요청 후 그림
sendAjax();

//페이지 번호 클릭 시 실행 
function goPage(no) {
    console.log(no);

    // 클릭한 페이지 번호를 currentPage 번호에 반영
    currentPage = no;

    //페이지 번호를 다시 그리기
    drawPage()

    //currentPage에 대해 데이터 요청
    sendAjax();

}


// paging-box 내부 페이지 요소들을 다시 그리기
function drawPage() {
    //currentPage가 1~10 이면 startPage = 1, lastPage = 10
    // currentPage가 11~20 이면 startPage = 11, lastPage = 20
    // currentPage가 21~30 이면 startPage = 21, lastPage = 30
    let startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
    let lastPage = startPage + 9;

    //lastPage가 finalPage를 넘어가면 finalPage로 제한 
    if (lastPage > finalPage) {
        lastPage = finalPage;
    }

    let pagingBox = document.querySelector(".paging-box");
    pagingBox.innerHTML = "";


    //처음페이지지
    pagingBox.innerHTML = `<a href="javascript:goFirst()">&lt;&lt;</a>`


    //이전 펭지ㅣ
    pagingBox.innerHTML = `<a href="javascript:previous()">&lt;</a>`


    // 1~10 페이지 그리기
    for (let i = startPage; i <= lastPage; i++) {
        let str = `<a href="javascript:goPage(${i})">${i}</a>`;

        if (i == currentPage) {
            str = `<a href="#" class="active">${i}</a>`
        }

        pagingBox.innerHTML += str;

    }
    //ㄷㅏ음 페이지
    pagingBox.innerHTML += `<a href="javascript:next()">&gt;</a>`

    //마지막 페이지
    pagingBox.innerHTML += `<a href="javascript:goLast()">&gt;&gt;</a>`
}

// 다음 페이지 버튼 클릭
function next() {
    // currentPage 가 1~10 인 상태에서 next가 실행되면 currentPage = 11
    // currentPage 가 11~20 인 상태에서 next가 실행되면 currentPage = 21
    currentPage = Math.floor((currentPage - 1) / 10) * 10 + 11;

    console.log(currentPage);

    //페이지 목록을 다시 그림
    drawPage();

    // 바뀐 currentPage에 대한 데이터 요청
    sendAjax();
}

// 이전 페이지 버튼 클릭
function previous() {
    // currentPage가 1~10 사이면 먹통
    if (currentPage <= 10) {
        return;
    }

    // currentPage가 11~20이면 previous 실행하면 currentPage = 10
    // currentPage가 21~30이면 previous 실행하면 currentPage = 20
    // currentPage가 31~40이면 previous 실행하면 currentPage = 30
    currentPage = Math.floor((currentPage - 1) / 10) * 10;

    //바뀐 currentPage에 대한 페이지 목록 그리기
    drawPage();

    // 바뀐 currentPage에 대한 데이터 요청
    sendAjax();
}

// 마지막 페이지 버튼 클릭
function goLast() {
    currentPage = finalPage;

    //바뀐 currentPage에 대한 페이지 목록 그리기
    drawPage();

    // 바뀐 currentPage에 대한 데이터 요청
    sendAjax();
}

// 처음 페이지 버튼 클릭
function goFirst() {
    //현재 페이지를 1페이지로 적용 
    currentPage = 1;

    //바뀐 currentPage에 대한 페이지 목록 그리기
    drawPage();

    // 바뀐 currentPage에 대한 데이터 요청
    sendAjax();
}

// 검색 버튼 클릭
document.getElementById("button").addEventListener("click", () => {
    sendAjax();
})

//의약품 클릭시 상세페이지로 이동 
function goDetail() {
    console.log(event.currentTarget);
    console.log(event.currentTarget.dataset);
    console.log(event.currentTarget.dataset["animalSeq"])

    let animalSeq = event.currentTarget.dataset["animalSeq"]

    //페이지 열기(새탭)
    open("./보호동물상세페이지.html" + animalSeq);
}
