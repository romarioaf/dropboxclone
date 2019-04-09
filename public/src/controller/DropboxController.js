class DropboxController {

    constructor () {

        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFileE1 = document.querySelector('#files');
        this.snackModalE1 = document.querySelector('#react-snackbar-root');

        this.initEvents();

    }
    
    initEvents() {

        this.btnSendFileEl.addEventListener('click', event => {
            this.inputFileE1.click();
        });

        this.inputFileE1.addEventListener('change', event => {
            this.snackModalE1.style.display = 'block';
        });

    }
}