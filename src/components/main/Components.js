// 自动化工程
const Components = []
const files = require.context("../../views", true, /\.js$/)
files.keys().map(key => {
    if (key.includes("./home") || key.includes("./account")) {
        return false
    }
    const splitFileName = key.split(".")
    const path = `/home${splitFileName[1].toLowerCase()}`
    const component = files(key).default
    const jsonObj = {}
    jsonObj.path = path
    jsonObj.component = component
    Components.push(jsonObj)
})

export default Components