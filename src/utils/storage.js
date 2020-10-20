export function setInfo(name, value) {
    sessionStorage.setItem(name, value)
}

export function getInfo(value) {
   return sessionStorage.getItem(value)
}