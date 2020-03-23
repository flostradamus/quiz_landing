'use strict'
let data_index_elements = document.querySelectorAll('[data_index]');
let page_wrapper = document.querySelector('#page_wrapper');
let page_number = document.querySelectorAll('.page').length;
let active_page = 1;
let scroll_status = 1;

function scroll(data_index) {
    if (data_index < 1 || data_index > page_number || data_index == active_page) {
        return;
    }
    active_page = data_index;
    let translateY = -100 * (data_index - 1);
    page_wrapper.style.cssText = `
            transition: transform 1000ms cubic-bezier(0.55, 0, 0.1, 1) 0s;
            transform: translate(0px, ${translateY}%);
        `;
    scroll_status = 0;
    setTimeout(() => {
        scroll_status = 1;
    }, 1000);
    document.body.className = "active_page_" + data_index;
    document.querySelector('.point.active').classList.remove('active');
    document.querySelectorAll('.point')[data_index - 1].classList.add('active');
}
for (let i = 0; i < data_index_elements.length; i++) {
    let data_index_element = data_index_elements[i];
    data_index_element.onclick = (e) => {
        let data_index = +data_index_element.getAttribute('data_index');
        scroll(data_index);
    }
}

window.addEventListener('wheel', function (e) {
    if (scroll_status) {
        if (e.deltaY > 0) {
            scroll(active_page + 1);
        } else {
            scroll(active_page - 1);
        }
    }
});
document.addEventListener('keydown', function (event) {
    let code = event.code;
    if (scroll_status) {
        if (code == 'ArrowDown') {
            scroll(active_page + 1);
        } else if (code == 'ArrowUp') {
            scroll(active_page - 1);
        } else if (code == 'PageUp') {
            scroll(1);
        } else if (code == 'PageDown') {
            scroll(page_number);
        }
    }
});