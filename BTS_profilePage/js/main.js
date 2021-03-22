'use strict'
const container = document.querySelector('.memInfo');
// 1. fetch를 이용하여 data에 있는 JSON file을 가져오는 함수
// 2. ul안에 li을 생성하여 item을 스크린상에 보여주도록 하는 함수
// 3. button을 클릭했을 때 나오는 이벤트 함수. 여기서 dataset을 이용하여 만든다.

function getData() {
    return fetch('../data/data.json')
    .then(response => response.json())
    .then(json => json.bts);
}

function displayMember(member) {
    container.innerHTML = member.map(mem => createHtml(mem)).join('');
}

function createHtml(mem) {
    return `
        <li class="memImg">
            <img src="${mem.image}">
        </li>
        <li class="descript">
            <dl>
                <dt>${mem.name}</dt>
                <dd>${mem.birth}</dd>
                <dd>${mem.roll}</dd>
            </dl>
            <em class="close" onClick="onButtonClose()"></em>
        </li>
    `
}
function onButtonClose() {
    container.classList.remove('visible');
}

function onButtonClick(event, member) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const name = dataset.name;
    container.classList.add('visible');
    if(key == null || name == null) {
        container.classList.remove('visible');
    }
    const filterMem = member.filter(mem => mem[key] === name);
    displayMember(filterMem);
}


function setEventListener(member) {
    const btn = document.querySelector('.mem');
    
    btn.addEventListener('click', event => onButtonClick(event, member));
    
}

getData()
    .then(member => {
        console.log(member);
        displayMember(member);
        setEventListener(member);
    });