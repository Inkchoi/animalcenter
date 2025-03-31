
const xhr = new XMLHttpRequest();

//const url = "https://daejeon.go.kr/ani/AniContentsHtmlView.do?menuSeq=111";
const serviceKey = 'L1PuA8lp4JRg3jEO1%2FeOgkPWdYGottpwLv%2BCXY%2BYsVCnYuBp6fqSs4bgpKc38HN6Pj96vzVPaRkIb%2BtblnYISg%3D%3D';
const numberOfRows = 100;
let url = `https://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList?serviceKey=${serviceKey}&numOfRows=${10000}`;

//url += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
//url += `${url}&${encodeURIComponent('pageNo')}=${encodeURIComponent('1')}`;

xhr.open('GET', url);

let dogs = 0;
let cats = 0;
let etc = 0;

let animalarray = [];

xhr.onload = function () {
    //console.log(xhr.response);

    const x2js = new X2JS();
    console.log(x2js);

    const json = x2js.xml_str2json(xhr.response);
    console.log(json);

    const items = json.ServiceResult.MsgBody.items;

    //console.log(items);

    for (let i = 0; i < items.length; i++) {
        // items[i]['classification']
        switch (items[i]['classification']) {
            case '1': // 개
                dogs++;
                break;
            case '2': // 고양이
                cats++;
                break;
            default: // 기타
                etc++;
                //etc += etc + 1
                break;
        }
    }

    console.log(dogs, cats, etc);

    animalarray.push(dogs);
    animalarray.push(cats);
    animalarray.push(etc);

    //배열에 랜덤색상 16개 담기
    let colors = [];
    let borderColors = [];

    for (let i = 0; i < animalarray.length; i++) {
        let red = Math.floor(Math.random() * 256)
        let green = Math.floor(Math.random() * 256)
        let blue = Math.floor(Math.random() * 256)

        let str = `rgba(${red}, ${green}, ${blue}, 0.4)`;   // a=투명도   0.4=60%의 투명도
        colors.push(str);

        let rgb = `rgba(${red}, ${green}, ${blue})`;
        borderColors.push(rgb);
    }


    const bar = document.getElementById('barChart');

    new Chart(bar, {
        type: 'bar',
        data: {
            labels: ['개', '고양이', '기타'],
            datasets: [{
                label: '몇 마리',
                data: animalarray,
                borderWidth: 1,
                backgroundColor: colors,
                borderColor: borderColors
            }]
        },
    });

    const pie = document.getElementById('pieChart')

    new Chart(pie, {
        type: 'pie',
        data: {
            labels: ['개', '고양이', '기타'],
            datasets: [{
                label: '몇 마리',
                data: animalarray,
                borderWidth: 1,
                backgroundColor: colors,
                borderColor: borderColors
            }]
        },
    });

    const line = document.getElementById('lineChart')

    new Chart(line, {
        type: 'line',
        data: {
            labels: ['개', '고양이', '기타'],
            datasets: [{
                label: '몇 마리',
                data: animalarray,
                borderWidth: 1,
                backgroundColor: colors,
                borderColor: borderColors
            }]
        },
    });






};

xhr.send();

