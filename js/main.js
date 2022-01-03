const backToTop = document.getElementById('backtotop');


const checkScroll = () => {

    let pageYOffset = window.pageYOffset;

    if (pageYOffset !==0){
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }

}

const moveBackToTop = () => {
    if (window.pageYOffset  > 0){
        window.scrollTo({top:0, behavior:"smooth"});
    }
}


window.addEventListener('scroll', checkScroll);
//윈도우에서 스크롤 할때 마다 체크 스크롤 함수를 호출하라
backToTop.addEventListener('click', moveBackToTop);
//클릭하면 제일 위로 올라가라


////////////////////////////////////////////////////////
function transformNext(event) {
    const slideNext = event.target;
    const slidePrev = slideNext.previousElementSibling;//이전속성형제

    const classList = slideNext.parentElement.parentElement.nextElementSibling; //ul 테그
    let activeLi = classList.getAttribute('data-position'); //데이터 포지션 //ul테그의 데이터 포지션
    const liList = classList.getElementsByTagName('li');



    //하나의 카드라도 왼쪽으로 이동했다면, 오른쪽으로 갈수 있음
     if (Number(activeLi) < 0) {
        activeLi = Number(activeLi) + 260;

        slidePrev.style.color = '#2f3059';
        slidePrev.classList.add('slide-prev-hover');
        slidePrev.addEventListener('click', transformPrev);

        if (Number(activeLi) === 0) {
            slideNext.style.color = '#cfd8dc';
            slideNext.classList.remove('slide-next-hover');
            slideNext.removeEventListener('click', transformNext);
        }
    }

    classList.style.transition = 'transform 1s';
    classList.style.transform =  'translateX('+ String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi);
}



function transformPrev(event) {

    const slidePrev = event.target;// 이전 버튼
    const slideNext = slidePrev.nextElementSibling; //좌측화살표 다음 형제를 가져온다. 넥스트 버튼

    const classList = slidePrev.parentElement.parentElement.nextElementSibling; //UL테그 선택
    let activeLi = classList.getAttribute('data-position'); // ul테그의 속성값을 가져옴. 데이터 포지션값을 가져오는 변수
    const liList = classList.getElementsByTagName('li');


    if (classList.clientWidth < (liList.length * 260 + Number(activeLi))) { //넘버는 숫자로 변환하는 식
        //로드맵컨테이너의 전체길이 <   li 카드 사진 전체의 길이
    
        activeLi = Number(activeLi) - 260;
        // 현재 위치를 왼쪽으로 260 이동 마이너스


     if (classList.clientWidth > (liList.length * 260 + Number(activeLi))) {  
        slidePrev.style.color='#cfd8dc'; // 컬러변경
        slidePrev.classList.remove('slide-prev-hover');
        slidePrev.removeEventListener('click',transformPrev);
     }
        slideNext.style.color='#2f3059'; // 컬러변경
        slideNext.classList.add('slide-next-hover'); //활성화 나타냄
        slideNext.addEventListener('click',transformNext);
    }

    classList.style.transition = 'transform 1s'; // 1초동안 변화
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
    //프랜스폼이라는 css를 엑스축으로 엑티브엘아이를 문자열로 바꾼후에 px를 붙여서 이동시킨다.
    classList.setAttribute('data-position',activeLi);
    //현재 위치값(어트리뷰트)을 data-position에 넣는다. 
}

const slidePrevList = document.getElementsByClassName('slide-prev');

for(let i = 0; 1 <slidePrevList.length; i++) {
    // ul테그 선택
    let classList = slidePrevList[i].parentElement.parentElement.nextElementSibling;
    let liList = classList.getElementsByTagName('li');

    //카드가 유엘 테그너비 보다 크면 왼쪽 버튼 활성, 오른쪽은 현재 맻 첫 카드 위치이므로 비활성화

    if (classList.clientWidth < (liList.length * 260)) {
        slidePrevList[i].classList.add('slide-prev-hover');
        slidePrevList[i].addEventListener('click', transformPrev);
    } else {
        const arrowContainer = slidePrevList[i].parentElement;
        arrowContainer.removeChild(slidePrevList[i].nextElementSibling); //오른쪽버튼을 부모요소에서 삭제한다.
        arrowContainer.removeChild(slidePrevList[i]); //오른쪽 버튼 삭제후 왼쪽 버튼삭제
    }
}