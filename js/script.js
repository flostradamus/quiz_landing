'use strict'
let data_index_elements = document.querySelectorAll('[data_index]');
let page_wrapper = document.querySelector('.page_wrapper');
let pages = document.querySelectorAll('.page');
let page_number = pages.length;
let contacts = document.querySelector('.contacts');
let active_page = 1;
let scroll_status = 1;
function contacts_transition() {
    contacts.querySelector('div').style.transition = 'opacity, 1000ms';
    page_wrapper.style.transition = 'blur, 1000ms';
}
document.querySelector('.contacts_button').onclick = () => {
    contacts_transition();
    contacts.style.visibility = 'visible';
    page_wrapper.style.filter = 'blur(8px)';
    contacts.querySelector('div').style.opacity = '1';
}
contacts.querySelector('.button_close').onclick = () => {
    contacts_transition();
    contacts.style.visibility = 'hidden';
    page_wrapper.style.filter = 'blur(0px)';
    contacts.querySelector('div').style.opacity = '0';
}

function scroll(data_index) {
    if (data_index < 1 || data_index > page_number || data_index == active_page || getComputedStyle(document.body).overflow == 'visible') {
        return;
    }
    active_page = data_index;
    let translateY = -100 * (data_index - 1);
    page_wrapper.style.transition = 'transform 1000ms cubic-bezier(0.55, 0, 0.1, 1) 0s';
    page_wrapper.style.transform = `translate(0px, ${translateY}%)`;

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