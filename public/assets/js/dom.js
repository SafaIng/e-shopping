'use strict';


const dom = {    
    create(content, type, parent, attributes, classes) {
        const newEl = document.createElement(type);
//wir brauchen mehr Attribute in Image Element, ID...
        if (attributes) {
            for(let attribute of attributes) {
                newEl.setAttribute(attribute.key, attribute.value);
            }
        }
        if (content) newEl.innerHTML = content;
        if (classes) newEl.className = classes;
        if (parent) parent.append(newEl);
        return newEl;
    },

    $(selector) {
        return document.querySelector(selector);
    },

    $$(selector) {
        Array.from(document.querySelectorAll(selector));
    },

}
