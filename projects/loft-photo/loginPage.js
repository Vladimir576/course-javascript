import model from './model';
import pages from './pages';
import mainPage from './mainPage';

export default {
  handleEvents() {
    document
      .querySelector('.page-login-button')
      .addEventListener('click', async () => {

        try {
          await model.login();
          await model.init();
          console.warn('Catch не сработал')
          pages.openPage('main');
          await mainPage.getNextPhoto();
        }
        catch (e) {
          pages.openPage('login');
          console.warn("Блок catch сработал");

        }
      });
  },
};
