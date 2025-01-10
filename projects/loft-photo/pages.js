const pagesMap = {
    login: '.page-login',
    main: '.page-main',
    profile: '.page-profile',
};

const pageNames = ['login', 'main', 'profile'];

export default {
    openPage(name) {
        let main = document.querySelector('.page-main');
        let profile = document.querySelector('.page-profile');
        let login = document.querySelector('.page-login')
        let pagesArr = [main, profile, login];

        pagesArr.forEach(i => {

            if (i) {
                i.style.setProperty('display', 'none', 'important');
            }
        });

        let currentPage = document.querySelector(`.page-${name}`);

        if (currentPage) {
            currentPage.style.setProperty('display', 'block', 'important');
        }

    },
};