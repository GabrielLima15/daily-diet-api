// @ts-expect-error TS(2307): Cannot find module './extensions/auth_logo.png' or... Remove this comment to see the full error message
import AuthLogo from './extensions/auth_logo.png';
// @ts-expect-error TS(2307): Cannot find module './extensions/menu_logo.png' or... Remove this comment to see the full error message
import MenuLogo from './extensions/menu_logo.png';
// @ts-expect-error TS(2307): Cannot find module './extensions/favicon.ico' or i... Remove this comment to see the full error message
import favicon from './extensions/favicon.ico';
import PT_BR from './extensions/Translate/pt';



PT_BR['app.components.LeftMenu.navbrand.title'] = 'Daily Diet';
PT_BR['app.components.LeftMenu.navbrand.workplace'] = 'Backoffice';
PT_BR['Auth.form.welcome.title'] = ' ';
PT_BR['Auth.form.welcome.subtitle'] = 'Backoffice';


const config = {
  locales: [
    'pt-BR',
  ],
  tutorials: false,
  notifications: {
    releases: false,
  },
  translations: {
    'pt-BR': PT_BR,
    en: PT_BR
  },
  auth: {
    logo: AuthLogo,
  },
  head: {
    favicon: favicon,
  },
  menu: {
    logo: MenuLogo,
  },
};

const bootstrap = (app: any) => {

};

export default {
  config,
  bootstrap,
};
