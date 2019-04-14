class DropboxController {

    constructor () {

        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFileE1 = document.querySelector('#files');
        this.snackModalE1 = document.querySelector('#react-snackbar-root');
        this.progressBarEl = this.snackModalE1.querySelector('.mc-progress-bar-fg');
        this.fileNameEl = this.snackModalE1.querySelector('.filename');
        this.timeleftEl = this.snackModalE1.querySelector('.timeleft');

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

                ajax.upload.onprogress = event => {
                    this.uploadProgress(event, file);
                    console.log(event)
                };

                let formData = new FormData();
                formData.append('input-file', file);

                this.startUploadTime = Date.now();

                ajax.send(formData);

            }));
        })

        return Promise.all(promises);
    }

    uploadProgress(event, file) {
        let loaded = event.loaded;
        let total = event.total;
        let percent = parseInt((loaded / total) * 100);

        let timeSpent = Date.now() - this.startUploadTime;
        let timeLeft = ((100 - percent) * timeSpent) / percent;

        this.progressBarEl.style.width = `${percent}%`;
        this.fileNameEl.innerHTML = file.name;
        this.timeleftEl.innerHTML = this.formatTimeToHuman(timeLeft);

        console.log(timeSpent, timeLeft, percent)

    }

    formatTimeToHuman(duration) {
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60) % 60));
        let hours = parseInt((duration / (1000 * 60) % 24));

        if(hours > 0) {
            return `${hours} hours, ${minutes} seconds and ${seconds} seconds`
        }

        if(minutes > 0) {
            return `${minutes} seconds and ${seconds} seconds`
        }

        if(seconds > 0) {
            return `${seconds} seconds`
        }

        return '';
    }

    modalShow(show = true) {

    }
}