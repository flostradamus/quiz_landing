'use strict'
let data_index_elements = document.querySelectorAll('[data_index]');
let page_wrapper = document.querySelector('.page_wrapper');
let pages = document.querySelectorAll('.page');
let page_number = pages.length;
let contacts = document.querySelector('.contacts');
let active_page = 1;
let scroll_status = 1;
let mobile_scroll_status = 0;

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

function scroll_change_class() {
    document.body.className = "active_page_" + active_page;
    document.querySelector('.point.active').classList.remove('active');
    document.querySelectorAll('.point')[active_page - 1].classList.add('active');
}

function scroll(call) {
    if (!scroll_status) {
        return;
    }
    call();
    if (active_page < 1 || active_page > page_number) {
        return;
    }

    if (mobile_scroll_status) {
        pages[active_page - 1].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        let translateY = -100 * (active_page - 1);
        page_wrapper.style.transition = 'transform 1000ms cubic-bezier(0.55, 0, 0.1, 1) 0s';
        page_wrapper.style.transform = `translate(0px, ${translateY}%)`;
    }
    scroll_status = 0;
    setTimeout(() => {
        scroll_status = 1;
    }, 1000);

    scroll_change_class();
}
for (let i = 0; i < data_index_elements.length; i++) {
    let data_index_element = data_index_elements[i];
    data_index_element.onclick = (e) => {
        scroll(() => {
            active_page = +data_index_element.getAttribute('data_index');
        });
    }
}

window.addEventListener('resize', () => {
    if (window.matchMedia('(max-width: 850px)').matches) {
        if (!mobile_scroll_status) {
            scroll(() => {
                active_page = 1;
            });
        }
        mobile_scroll_status = 1;

        document.onkeydown = null;
        window.onwheel = null;

        window.onscroll = (e) => {
            if (!scroll_status) {
                return;
            }
            if (pages[active_page] !== undefined) {
                let nextPageScrollTop = pages[active_page].getBoundingClientRect().y;
                if (nextPageScrollTop < 0) {
                    active_page++;
                }
            }
            let prevPageScrollTop = pages[active_page - 1].getBoundingClientRect().y;
            if (prevPageScrollTop > 0) {
                active_page--;
            }
            if (active_page < 1 || active_page > page_number) {
                return;
            }
            scroll_change_class();
        }

    } else {
        if (mobile_scroll_status) {
            scroll(() => {
                active_page = 1;
            });
        }
        mobile_scroll_status = 0;

        if (window.onwheel == null && document.onkeydown == null) {
            window.onwheel = function (e) {
                scroll(() => {
                    if (e.deltaY > 0) {
                        active_page++;
                    } else {
                        active_page--;
                    }
                });
            };
            document.onkeydown = function (event) {
                scroll(() => {
                    let code = event.code;

                    if (code == 'ArrowDown') {
                        active_page++;
                    } else if (code == 'ArrowUp') {
                        active_page--;
                    } else if (code == 'PageUp') {
                        active_page = 1;
                    } else if (code == 'PageDown') {
                        active_page = page_number;
                    }

                });
            };
        }
    }

});

window.dispatchEvent(new Event('resize'));