'use strict';

// KONSTANTEN / VARIABLEN
const elements = {};
// FUNKTIONEN
const domMapping = () => {
    elements.welcomeText = document.querySelector('#welcomeText');
    elements.korbButton = document.querySelector('#korbText');
    elements.korbButtonimg = document.querySelector('#buttonkorb');
    elements.table = dom.$('#table');

}



const appendEventlisteners = () => {
    elements.korbButtonimg.addEventListener('click', () => {

        window.location.href = 'warenkorb.html';
    });
}


//stellt die Datem aus dem Ajax-call in ein view dar.

const showData = data => {



    getWarenKorbCount();

    const products = data.table.products;
    console.log(products);
    let counter = 0;
    let tableTR;
    let tableTD;
    let pictureDIV;
    let descriptionDIV;
    for (let product of products) {
        // 3 Artikel in jeder Zeile
        if (counter % 3 == 0) {
            tableTR = dom.create(false, 'tr', elements.table, false);
        }
        tableTD = dom.create(false, 'td', tableTR, false);
        pictureDIV = dom.create(false, 'div', tableTD, false);

        //Image muss ein SRC attribut und der Link .
        let attributeImgSRC = [{
            key: 'src',
            value: product.image
        }];
        let picture = dom.create(false, 'img', pictureDIV, attributeImgSRC, 'center');

        descriptionDIV = dom.create(false, 'div', tableTD, false);
        dom.create(product.name, 'h2', descriptionDIV, false);
        dom.create(product.version, 'h3', descriptionDIV, false);
        dom.create(product.preis + '€', 'h3', descriptionDIV, false, 'preis');


        let button = dom.create('in den Warenkorb', 'button', descriptionDIV);

        button.addEventListener('click', () => {

            addToWarenKorb(product);



        });

        counter++;
    }

}



//zält das Content des Warenkorbs und gibt den Wert in den Warenkorb Icon.
const getWarenKorbCount = () => {

    let loadedWarenKorb = sessionStorage.getItem('warenKorb');
    let waren = loadedWarenKorb ? JSON.parse(loadedWarenKorb) : [];
    let counter = 0;
    for (let w of waren) {
        counter = counter + parseInt(w.quantity);
    }
    elements.korbButton.innerText = counter;

}

let found = false;

//update das Content des Warenkorbs im SessionStorage
const addToWarenKorb = selectedProduct => {
   
    let loadedWarenKorb = sessionStorage.getItem('warenKorb');
    let waren = loadedWarenKorb ? JSON.parse(loadedWarenKorb) : [];

    found = false;
    let counter = 0;
    for (let w of waren) {
     // imkreminieren der Feld (in SessionStorage) "quantity" jedes mal ein neue Element von der gleiche Artikle hinzugefürt wird.
        if (selectedProduct.id == w.id) {
            w.quantity = parseInt(w.quantity) + 1;
            found = true;
        }
           // imkreminieren counter (wird in Icon WarenKorb benutzt) jedes mal ein neue Element hinzugefürt wird.
        counter = counter + parseInt(w.quantity);
    }
    if (!found) {
        counter++;
        waren.push(selectedProduct);
    }
    sessionStorage.setItem('warenKorb', JSON.stringify(waren));
    elements.korbButton.innerText = counter;
}


//nimmt der Namem dass in die Index Page geschrieben ist,  von LocalStorage
const getLoginData = () => {

    let loginData = localStorage.getItem('loginData');

    let loginDataObject = loginData ? JSON.parse(loginData) : [];
    console.log(loginDataObject);
    elements.welcomeText.innerHTML = "Welcome " + loginDataObject.name + "!";
}





const init = () => {
    domMapping();
    appendEventlisteners();
    getLoginData();
    ajax.loadJSON('../assets/js/data.json', showData);



}

// INIT
//document.addEventListener('DOMContentLoaded', init);

init();