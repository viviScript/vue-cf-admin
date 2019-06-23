import defaultSettings from '@/config/settings';

const title = defaultSettings.title || '指挥一体化系统';
/**
 * @description 获取页面标题
 * @param {string} pageTitle
 * */
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
