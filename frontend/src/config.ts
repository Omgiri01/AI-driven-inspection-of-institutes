export const hostApi =
  process.env.NODE_ENV === 'development' ? 'http://localhost' : '';
export const portApi = process.env.NODE_ENV === 'development' ? 8080 : '';
export const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;

export const localStorageDarkModeKey = 'darkMode';

export const localStorageStyleKey = 'style';

export const containerMaxW = 'xl:max-w-full xl:mx-auto 2xl:mx-20';

export const appTitle = 'created by Flatlogic generator!';

export const getPageTitle = (currentPageTitle: string) =>
  `${currentPageTitle} — ${appTitle}`;

export const tinyKey = 'cnslp6h943xbg36t2tf2xglmrxiw5b7tatycf3kir7n2j7eh';
