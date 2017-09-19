export class Mutils {

    static async loadHTML(route,callback) {
        const htmlURL = `./views/${route}.html`;
        await $.get(htmlURL).then(html=>{
            $('#page').html(html)
        });
        callback();
    }
}