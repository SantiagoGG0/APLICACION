// Encargado de la interacción de javascript con html.
import {formElements, getFormData} from './form'
export function addEventListeners() {
    window.addEventListener('load', () =>{       
        listenFormSubmitEvent();
    })
}

function listenFormSubmitEvent() {
    formElements.form.addEventListener('submit', (event) => {    
        event.preventDefault();
        console.log(getFormData());
    });
}