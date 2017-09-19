import '../styles/pageB.scss';

import { Mutils } from './mUtils';

class PageB {

    constructor(route) {
        this.route = route;
        Mutils.loadHTML(this.route, this.init.bind(this))
    }

    init() {
        console.log(`${this.route}页面加载完毕`)
    }
}


export function pageB() {
    const pageB = new PageB('pageB');
}