// 공통적으로 사용할 수 있는 함수 선언
// faq에서 long-dropdown

document.getElementsByClassName("single-faq")[0].addEventListener("click", (e) => {

    if(!e.target.children[1].style.display){
        e.target.children[1].style.display = "none";
    }

    if (e.target.children[1].style.display == "none") {
        e.target.children[1].style.display = "block";
    } else {
        e.target.children[1].style.display = "none";
    }
})

document.getElementsByClassName("single-faq")[1].addEventListener("click", (e) => {
    if(!e.target.children[1].style.display){
        e.target.children[1].style.display = "none";
    }

    if (e.target.children[1].style.display == "none") {
        e.target.children[1].style.display = "block";
    } else {
        e.target.children[1].style.display = "none";
    }
})