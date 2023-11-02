'use strict';

// KONSTANTEN / VARIABLEN
const elements = {};

const domMapping = () => {
  elements.inputText = document.querySelector('#name');
  elements.inputMail = document.querySelector('#email');
  elements.submit = document.querySelector('#submit');
  elements.form = document.querySelector('#formLogin');
}

let mailStructur = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let letters = /^[A-Za-z]+$/;


// überprüfen ob der Name nur Buchtaben enthält und nicht leer ist 
const checkName = evt => {

  let name = elements.inputText.value;

  elements.inputText.classList = ('');
  if (name == '') {
    console.log('empty');
    elements.inputText.classList.add('input');
  }
  else if (name.match(letters)) {
    elements.inputText.classList.add('valid');
    console.log('matches');
    elements.inputText.removeAttribute("title");
    return true;

  }
  else {

    elements.inputText.classList.add('invalid');
    elements.inputText.setAttribute("title", "der Name muss nur aus Buchstaben bestehen");

    return false;
  }


}

// überprüfen ob die E-Mail-Struktur korrekt ist und nicht leer ist 
const checkMail = evt => {
 

  let email = elements.inputMail.value;
  elements.inputMail.classList = ('');
  if (email == '') {
    console.log('empty');
    elements.inputMail.classList.add('input');

  }
  else if (email.match(mailStructur)) {
    elements.inputMail.classList.add('valid');
    elements.inputMail.removeAttribute("title");
    return true;
  }
  else {
    console.log("does not match");
    elements.inputMail.classList.add('invalid');
    elements.inputMail.setAttribute("title", "Bitte gib eine gültige E-Mail-Adresse ein");
    return false;

  }
}



const enableSubmit = () => {
  elements.submit.disabled = true;
  if (checkMail() & checkName()) {
    elements.submit.disabled = false;
  }

}


//die Daten müssen vor dem Senden getestet werden, sonst ein Tooltip Message auftaucht
const submitValidate = () => {

  let name = elements.inputText.value;
  let msg = "";
  let email = elements.inputMail.value;

  if (!email.match(mailStructur)) {
    msg = "überprüfen Sie bitte die E-Mail";
  }

  if (!name.match(letters)) {
    msg = "überprüfen Sie bitte den Namen!";

  }

  if (email == '') { elements.inputMail.classList.add('empty'); }
  if (name == '') { elements.inputText.classList.add('empty'); }

  elements.submit.setAttribute("title", msg);

}


//Die Daten werden zur Wiederverwendung auf der nächsten Seite gespeichert



const appendEventlisteners = () => {
  elements.inputText.addEventListener('input', enableSubmit);
  elements.inputMail.addEventListener('input', enableSubmit);

  elements.submit.addEventListener('mouseover', submitValidate);
  elements.submit.addEventListener('click', nextPage);
  elements.form.addEventListener('submit', nextPage);
}



const nextPage = evt => {
  evt.preventDefault();
  let loginData = new FormData(elements.form);
  loginData = Object.fromEntries(loginData);

  localStorage.setItem('loginData', JSON.stringify(loginData));

  //db connection
  const payload = new FormData(elements.form);

  // Daten an Server senden
  fetch('/save_content', {
      method: 'post',
      body: payload
  }).then(
      res => res.json()
  ).then(
      res => {
          if (res.status == 'ok') {
             loginData(res.data);
          } else {
              console.warn('err', res.err);
          }
      }
  ).catch(
      console.warn
  )

  window.location.href = 'shoppingpage.html';

}


const init = () => {
  domMapping();
  appendEventlisteners();
  elements.submit.disabled = true;
 
}

// INIT
document.addEventListener('DOMContentLoaded', init)