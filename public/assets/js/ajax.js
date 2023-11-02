'use strict';

const ajax = {
   
    loadJSON(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.addEventListener('load', () => {
            // this bezieht sich auf das Objekt, in dem sich die Methode befindet
            // ajax.handleJSON() hätte genauso gut funktioniert
            if (xhr.status == 200){
                let data = JSON.parse(xhr.response);
                callback(data);
            } 
            else console.warn(xhr.responseURL, xhr.statusText);
        })
        xhr.send();
    }
}