import Vue from 'vue'

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function validateFileName (str) {
  return /^\S+\.vue$/.test(str) &&
    str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => capitalizeFirstLetter($1))
}

const requireComponent = require.context(
  '.', true, /\.vue$/
  // 找到components文件夹下以.vue命名的文件
)

requireComponent.keys().forEach(filePath => {
  const componentConfig = requireComponent(filePath)
  const fileName = validateFileName(filePath)
  const componentName = fileName.toLowerCase() === 'index'
    ? capitalizeFirstLetter(componentConfig.default.name)
    : fileName
  Vue.component(componentName, componentConfig.default || componentConfig)
})
