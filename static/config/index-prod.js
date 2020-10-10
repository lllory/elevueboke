/**
 * 生产环境
 */
;
(function () {
  window.SITE_CONFIG = {}
  window.SITE_CONFIG['baseUrl'] = 'http://123.57.200.101:3000'

  window.SITE_CONFIG['version'] = ''; //版本号
  window.SITE_CONFIG['domain'] = './'; //路径

  window.SITE_CONFIG.cdnUrl =window.SITE_CONFIG.domain + window.SITE_CONFIG.version 
})()
