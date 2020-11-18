const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
  {logo: 'I', url: 'https://www.iconfont.cn/'},
  {logo: 'B', url: 'https://www.bilibili.com'}
]
const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '') // 删除 / 开头的内容
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
      const $li = $(`<li>
        <div class="LabelBox">
          <div class="SiteImage">${node.logo}</div>
          <div class="SiteURL">${simplifyUrl(node.url)}</div>
          <div class="close">
          <svg class="icon"> 
            <use xlink:href="#icon-guanbi"></use>
          </svg>
          </div>
        </div>
        </div>
      </li>`).insertBefore($lastLi)
      $li.on('click', () => {
        window.open(node.url)
      })
      $li.on('click', '.close', (e) => {
        e.stopPropagation() // 阻止冒泡
        hashMap.splice(index, 1)
        render()
      })
    })
  }
  
  render()

$(`.AddBox`).on('click',()=>{
    let url = window.prompt('输入要增加的网址');
    if(url.indexOf(`http://`) !== 0){
        url = `http://` + url;
    }
    console.log(url);
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
      })
      render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
  }

  $(document).on('keypress', (e) => {
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
      if (hashMap[i].logo.toLowerCase() === key) {
        window.open(hashMap[i].url)
      }
    }
    // 键盘监听
  })
  