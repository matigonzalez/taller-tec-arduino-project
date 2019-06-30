import '/@/jquery';

class App {
    
    constructor(){
        this.ui();
        this.events();
        this.websocket();
    }

    ui(){
        this.ui = {
            link: $('.link'),
            response: $('.response')
        }
    }

    websocket(){
        const socket = new WebSocket("ws://localhost:8000");
        socket.onmessage = (event) => {
            try {
                const result = event.data.split(':');
                this.handleStatus(result);
            } catch (error) {
                console.error(event.data, error);
            }
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
        this.ui.response.html(content.response);
    }

    handleStatus(statusArray){
            const sensor = statusArray[0];
            const status = statusArray[1];
            const method = !!Number(status) ? 'add' : 'remove';
            $(`[data-status="${sensor}"`)[`${method}Class`]('active-sensor')
    }
    
}

new App();