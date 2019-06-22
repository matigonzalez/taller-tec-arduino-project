import '/@/jquery';

class App {
    
    constructor(){
        this.ui();
        this.events();
    }

    ui(){
        this.ui = {
            link: $('.link'),
            response: $('.response')
        }
    }

    events(){
        this.ui.link.on('click', (event) => {
            event.preventDefault();
            const url = $(event.target).attr('href');
            $.get(url)
                .then(response => this.result({
                    url: window.location + url,
                    response: response,
                }))
                .catch(error => console.error(error));
        });
    }

    result(content = {}){
        console.log(`%c ${content.url} `, 'background: #111111; color: #1288fd', content.response);
        this.ui.response.html(content);
    }
    
}

new App();