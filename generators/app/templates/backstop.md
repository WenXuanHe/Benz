{
  **测试用例id，用于BackstopJS管理和为文件命名**
  "id": “backstop_prod_test",
  **测试视口，就是配置各种分辨率**
  "viewports": [
    {
      "name": "phone",
      "width": 320,
      "height": 480
    }],
  **在执行所有脚本前、页面加载后执行的脚本。通过他我们可以执行用express做一个静态服务器**
  "onBeforeScript": "onBefore.js",
  "onReadyScript": “onReady.js",
  # 测试用例
  "scenarios": [
    {
      **测试用例名称**
      "label": “homepage",
      **测试的地址**
      "url": “https://garris.github.io/BackstopJS/",
      **定义referenceUrl 在执行backstop test之前会使用referenceUrl的地址执行backstop reference**
      "referenceUrl": "",
      **测试的区域，支持css选择器，然后BackstopJS会将选择器指定的地方截屏**
      "selectors": [
        ".class",
        “#id"
      ],
      "selectorExpansion": true,
      "hideSelectors": [],
      "removeSelectors": [],
      **在控制台输出readyEvent设置的字符串时会截屏**
      "readyEvent": "",
      **屏幕出现readySelector设置的选择器时会截屏**
      "readySelector": "",
      "delay": 0,
      "misMatchThreshold" : 0.1,
      **在各种的测试用例执行时、页面加载后前行,我们可以把我们对页面操作的模拟脚本放进onReady.js中**
      "onBeforeScript": "onBefore.js",
      "onReadyScript": "onReady.js"
    }
  ],
  # 测试图片的输出路径
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "casper_scripts": "backstop_data/casper_scripts",
    "html_report": "backstop_data/html_report",
    "ci_report": "backstop_data/ci_report"
  },
  **测试用的浏览器或模拟器，这里用的是PhantomJS**
  "engine": “phantomjs",
  **报告的形式，支持命令行和浏览器两种**
  "report": [“browser"],
  **是否打印测试日志**
  "debug": false
}