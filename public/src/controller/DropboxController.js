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
            this.uploadTask(event.target.files);
        });

    }

    uploadTask(files) {

        let promises = [];

        [...files].forEach(file => {
            promises.push(new Promise((resolve, reject) => {

                let ajax = new XMLHttpRequest();

                ajax.open('POST', '/upload');

                ajax.onload = event => {
                    try {
                        resolve(JSON.parse(ajax.responseText))
                    } catch (e) {
                        reject(e)
                    }
                };

                ajax.onerror = event => {
                    reject(e);
                };

                let formData = new FormData();
                formData.append('input-file', file);

                ajax.send(formData);

            }));
        })

        return Promise.all(promises);
    }
}