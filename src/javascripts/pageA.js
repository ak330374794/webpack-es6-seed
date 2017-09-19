import '../styles/pageA.scss'

import { Mutils } from './mUtils'

class PageA {
  constructor (route) {
    this.route = route;
    Mutils.loadHTML(this.route, this.init.bind(this))
  }

  init () {
    console.log(`${this.route}页面加载完毕`)
  }
}

export function pageA () {
  const pageA = new PageA('pageA')
}
