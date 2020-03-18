export default {
  // 设置cookie
  setCookie(cname: string, cvalue: string, exdays: number) {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    const expires = 'expires=' + d.toUTCString()
    document.cookie = `${cname}=${cvalue}; ${expires}`
  },

  // 获取cookie
  getCookie(cname: string) {
    const name = `${cname}=`
    const cookieArr = document.cookie.split(';')
    for (let i = 0; i < cookieArr.length; i++) {
      const t = cookieArr[i].trim()
      if (t.indexOf(name) === 0) {
        return t.substring(name.length, t.length)
      }
    }
    return ''
  },

  // 删除cookie
  removeCookie(cname: string) {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  }
}
