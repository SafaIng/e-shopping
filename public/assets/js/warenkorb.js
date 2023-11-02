'use strict';

// KONSTANTEN / VARIABLEN
const elements = {};
// FUNKTIONEN
const domMapping = () => {
    elements.divShoppingCart = document.querySelector('#shoppingCart');

}


const appendEventlisteners = () => {


}

let sumProduct = 1;

const showData = () => {

    let loadedWarenKorb = sessionStorage.getItem('warenKorb');
    let waren = JSON.parse(loadedWarenKorb);

    let attributeImgSRC;
    let initialFinalPeis = 0;

    for (let ware of waren) {
        let containerDiv = dom.create(false, 'div', elements.divShoppingCart, false, 'item');

        let buttonsDiv = dom.create(false, 'div', containerDiv, false, 'buttons');

        let imageDiv = dom.create(false, 'div', containerDiv, false, 'image');

        attributeImgSRC = [{
            key: 'src',
            value: ware.image
        }];
        let picture = dom.create(false, 'img', imageDiv, attributeImgSRC, 'image');
        let descriptionDiv = dom.create(false, 'div', containerDiv, false, 'description');
        dom.create(ware.name, 'span', descriptionDiv, false);
        dom.create(ware.version, 'span', descriptionDiv, false);

        let quantityDiv = dom.create(false, 'div', containerDiv, false, 'quantity');

        let buttonPlusAttr = [{
            key: 'id',
            value: '../assets/images/buttonPlus'
        }]
        let buttonPlus = dom.create(false, 'button', quantityDiv, buttonPlusAttr, 'plus-btn');

        attributeImgSRC = [{
            key: 'src',
            value: '../assets/images/plus.png'
        }];
        let imgPlus = dom.create(false, 'img', buttonPlus, attributeImgSRC, 'plus-btn');
// der InputText soll ein Type,eine Value und ein Id haben. 
        let attributeType = [{
            key: 'type',
            value: 'text'
        }, {
            key: 'id',
            value: 'quantity'
        }, {
            key: 'value',
            value: ware.quantity
        }];
        let quantityInput = dom.create(false, 'input', quantityDiv, attributeType);

// image und button - 

        let buttonMinusAttr = [{
            key: 'id',
            value: '../assets/images/buttonMinus'
        }]

        let buttonMinus = dom.create(false, 'button', quantityDiv, buttonMinusAttr, 'minus-btn');
        attributeImgSRC = [{
            key: 'src',
            value: '../assets/images/minus.png'
        }];
        let imgMinus = dom.create(false, 'img', buttonMinus, attributeImgSRC, 'minus-btn');


        //die Summe der Preise pro Artikel in InitialLoad
        let priceDiv = dom.create((parseFloat(ware.preis)*parseFloat(ware.quantity)).toFixed(2)+'€', 'div', containerDiv, false, 'price');
//Berechnung der TotalSumme  in Initial Load
        initialFinalPeis =(parseFloat(initialFinalPeis)+ (parseFloat(ware.preis)*parseFloat(ware.quantity))).toFixed(2);


        buttonPlus.addEventListener('click', () => {
            ware.quantity = parseInt(ware.quantity) + 1;
            // der InputText zwischen Button + und - nimmt sein Wert aus Ware.quantity
            quantityInput.value = ware.quantity;
            let finalPreis = parseFloat(elements.finalPreis.innerText);
            //summieren der Final Preis jedes mal ein neie Artikel gekauft ist. 
            elements.finalPreis.innerText= (finalPreis+parseFloat(ware.preis)).toFixed(2) +'€';

            let productsPrice = (ware.preis*ware.quantity);      
            let nombreFormate = parseFloat(productsPrice.toFixed(2));
            priceDiv.innerText =nombreFormate +'€';
            sessionStorage.setItem('warenKorb', JSON.stringify(waren));

        });


        buttonMinus.addEventListener('click', () => {
            if (ware.quantity > 0){
                ware.quantity = parseInt(ware.quantity) - 1;
                quantityInput.value = ware.quantity;
                let finalPreis = parseFloat(elements.finalPreis.innerText);
                elements.finalPreis.innerText= (finalPreis-parseFloat(ware.preis)).toFixed(2) +'€';
            }

            let productsPrice = (ware.preis*ware.quantity);        
            let nombreFormate = parseFloat(productsPrice.toFixed(2));
            priceDiv.innerText =nombreFormate +'€';
            sessionStorage.setItem('warenKorb', JSON.stringify(waren));
            
     
        });
    }

    let preisAttr = [{
        key: 'id',
        value: 'finalPreis'
    }]
    let priceDiv = dom.create(initialFinalPeis +'€', 'div', elements.divShoppingCart, preisAttr, 'total-price');
    elements.finalPreis = document.querySelector('#finalPreis');

}




const init = () => {
    domMapping();
    showData();
    appendEventlisteners();

}

init();