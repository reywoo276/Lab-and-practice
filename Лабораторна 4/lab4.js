const menuData = {
    "items": [
        {
            "title": "Головна",
            "link": "/",
            "submenu": []
        },
        {
            "title": "Про нас",
            "link": "/about",
            "submenu": [
                {
                    "title": "Наша команда",
                    "link": "/about/team",
                    "submenu": [
                        {
                            "title": "Керівництво",
                            "link": "/about/team/leadership",
                            "submenu": []
                        }
                    ]
                },
                {
                    "title": "Історія",
                    "link": "/about/history",
                    "submenu": []
                }
            ]
        },
        {
            "title": "Послуги",
            "link": "/services",
            "submenu": [
                {
                    "title": "Консультації",
                    "link": "/services/consulting",
                    "submenu": []
                }
            ]
        },
        {
            "title": "Портфоліо",
            "link": "/portfolio",
            "submenu": []
        },
        {
            "title": "Контакти",
            "link": "/contacts",
            "submenu": []
        }
    ]
};

const menuContainer = document.getElementById('menuContainer');

function createMenu(items, level = 0) {
    const ul = document.createElement('ul');
    ul.classList.add(`level-${level}`);

    items.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.link;
        a.textContent = item.title;
        a.tabIndex = 0;

        a.addEventListener('click', () => {
            document.querySelectorAll('a.active').forEach(el => el.classList.remove('active'));
            a.classList.add('active');
            localStorage.setItem('activeMenu', item.link);
        });

        li.appendChild(a);

        if (item.submenu && item.submenu.length > 0) {
            li.classList.add('has-submenu');
            const submenu = createMenu(item.submenu, level + 1);
            li.appendChild(submenu);

            a.addEventListener('click', (e) => {
                e.preventDefault();
                li.classList.toggle('open');
            });
        }
        ul.appendChild(li);
    });

    return ul;
}

function restoreActiveLink() {
    const activeLink = localStorage.getItem('activeMenu');
    if (activeLink) {
        const activeElement = document.querySelector(`a[href='${activeLink}']`);
        if (activeElement) activeElement.classList.add('active');
    }
}

menuContainer.appendChild(createMenu(menuData.items));
restoreActiveLink();

const burger = document.querySelector('.burger-menu');
burger.addEventListener('click', () => {
    document.querySelector('.main-menu').classList.toggle('open');
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', !expanded);
});
