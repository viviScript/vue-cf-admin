const cache = {};
const themeAction = {
  chalk() {
    if (!cache.chalk) {
      cache.chalk = import('./styles/theme-chalk/index.useable.scss');
    }
    return cache.chalk;
  },
  light() {
    if (!cache.light) {
      cache.light = import('./styles/theme-light/index.useable.scss');
    }
    return cache.light;
  }
};

let current = null;

async function setTheme(theme) {
  if (themeAction[theme]) {
    const style = await themeAction[theme]();
    if (current) {
      current.unref();
    }
    style.ref();
    current = style;
  }
}
window.setTheme = setTheme;
export default setTheme;
