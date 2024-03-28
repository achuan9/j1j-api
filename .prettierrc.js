module.exports = {
  // 单行代码最大长度，超过这个长度将被换行，默认为80
  printWidth: 80,

  // 缩进的宽度，例如，设置为2时，使用2个空格进行缩进，默认为2
  tabWidth: 2,

  // 使用制表符还是空格进行缩进，可选值："tab"、"space"，默认为"space"
  useTabs: false,

  // 在语句末尾添加分号，可选值："always"、"never"，默认为"true"
  semi: true,

  // 使用单引号还是双引号，可选值："single"、"double"，默认为"double"
  singleQuote: false,

  // 在什么情况将对象中的属性添加引号, 可选项:
  // "as-needed" - 仅在需要时在对象属性两边添加引号。默认值
  // "consistent" - 如果对象中至少有一个属性需要引号，则引用所有属性。
  // "preserve" - 尊重对象属性中引号的输入使用。
  quoteProps: "as-needed",

  // 在 JSX 中使用单引号而不是双引号。
  jsxSingleQuote: false,

  // 尾随逗号，可选值："none"、"es5"、"all"，默认为"es5"
  trailingComma: "es5",

  // 在对象文本的大括号之间打印空格。 默认为 true
  bracketSpacing: true,

  // 将多行 HTML（HTML、JSX、Vue、Angular）元素的 > 放在最后一行的末尾，而不是单独放在下一行（不适用于自闭合元素）。默认false
  bracketSameLine: true,

  // 是否使用括号将箭头函数参数括起来，可选值："avoid"、"always"，默认为"avoid"
  arrowParens: "avoid",

  // 是否在 Vue 文件中缩进 <script> 和 <style> 标签中的代码。默认为 false

  vueIndentScriptAndStyle: false,

  // 指定需要使用的换行符类型，可选值："auto"、"lf"、"crlf"、"cr"，默认为"auto"
  endOfLine: "auto",

  // 在 HTML、Vue 和 JSX 中每行强制使用单个属性。默认false
  singleAttributePerLine: false,

  // 覆盖允许您对某些文件扩展名、文件夹和特定文件进行不同的配置。
  // "overrides": [
  //   {
  //     "files": "*.test.js",
  //     "options": {
  //       "semi": true
  //     }
  //   },
  //   {
  //     "files": ["*.html", "legacy/**/*.js"],
  //     "options": {
  //       "tabWidth": 4
  //     }
  //   }
  // ]
};
