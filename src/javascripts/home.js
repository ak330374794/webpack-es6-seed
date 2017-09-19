import '../styles/home.scss';

import { Mutils } from './mUtils';

class Home {

    constructor(route) {
        this.route = route;
        Mutils.loadHTML(this.route, this.init.bind(this))
    }

    init() {
        console.log(`${this.route}页面加载完毕`)
    }
}


export function home() {
    const home = new Home('home');
}