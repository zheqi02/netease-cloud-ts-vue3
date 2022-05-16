module.exports = {
  printWidth: 100, // 单行输出（不折行）的（最大）长度
  tabWidth: 2, // 每个缩进级别的空格数
  tabs: false, // 使用制表符 (tab) 缩进行而不是空格 (space)。
  semi: false, // 是否在语句末尾打印分号
  arrowParens: 'always', // 箭头函数，只有一个参数的时候，也需要括号
  vueIndentScriptAndStyle: false, // 在VUE文件中不要缩进脚本和样式标记
  stylelintIntegration: true, // 是否启用stylelint
  useTabs: false, // 是否使用制表符
  singleQuote: true, // 是否使用单引号
  quoteProps: 'as-needed', // 仅在需要时在对象属性周围添加引号
  jsxSingleQuote: false, // jsx 不使用单引号，而使用双引号
  trailingComma: 'none', // 去除对象最末尾元素跟随的逗号
  bracketSpacing: true, // 是否在对象属性添加空格
  jsxBracketSameLine: false, // 将 > 多行 JSX 元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭元素）,默认false,这里选择>不另起一行
  rangeStart: 0, // 起始行号
  rangeEnd: Infinity, // 结束行号
  requirePragma: false, // 是否需要pragma
  insertPragma: false, // 是否插入pragma
  proseWrap: 'preserve', // 当超出print width（上面有这个参数）时就折行
  htmlWhitespaceSensitivity: 'css', // 指定 HTML 文件的全局空白区域敏感度, "ignore" - 空格被认为是不敏感的
  endOfLine: 'lf' // 换行符
}
