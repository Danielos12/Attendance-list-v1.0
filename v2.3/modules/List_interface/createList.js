import UI from '../List/UI.js';
import Person from '../List/Person.js';

export { createNewPersonForm, removeRow, selectButton, clearList };

const createNewPersonForm = e => {
  const name = document.forms.Form['input-name'].value;
  const surname = document.forms.Form['input-surname'].value;
  const time = document.querySelector('#clockTimer').textContent;

  e.preventDefault();
  const inputname = document.querySelector('#data-name');
  const inputsurname = document.querySelector('#data-surname');
  const conPer = document.querySelector('.container-person');

  const person = new Person(name, surname, time);

  if (inputname.value !== '' && inputsurname.value !== '') {
    if (conPer.className === 'container-person') {
      conPer.classList.toggle('fill');
    }
    if (document.querySelector('.container-person-field')) {
      document.querySelector('.container-person-field').remove();
    }
    UI.addRowData(person); // add the new div
    UI.clearInput(inputname, inputsurname);
    inputname.focus();
  }
};

//containerPerson
const removeRow = e => {
  if (e.target.closest('.remove-button') !== null) {
    e.target.closest('.row-data-container').remove();
  }
};

const selectButton = e => {
  // check button
  if (e.target.closest('.check-button') !== null) {
    e.target.closest('.check-button').classList.toggle('selected');
    e.target
      .closest('.check-button')
      .childNodes[0].classList.toggle('selected');
    const sibs = e.target
      .closest('.check-button')
      .parentNode.querySelector('.times-button');
    if (sibs !== null) {
      if (sibs.classList.contains('selected')) {
        sibs.classList.remove('selected');
        sibs.childNodes[0].classList.remove('selected');
      }
    }
  } else if (e.target.closest('.times-button') !== null) {
    e.target.closest('.times-button').classList.toggle('selected');
    e.target
      .closest('.times-button')
      .childNodes[0].classList.toggle('selected');
    const sibs = e.target
      .closest('.times-button')
      .parentNode.querySelector('.check-button');
    if (sibs !== null) {
      if (sibs.classList.contains('selected')) {
        sibs.classList.remove('selected');
        sibs.childNodes[0].classList.remove('selected');
      }
    }
  }
};

const clearList = () => {
  const containerPersonId = document.querySelector('#container-person');
  const containerPersonClass = document.querySelector('.container-person');
  while (containerPersonId.firstChild) {
    containerPersonId.removeChild(containerPersonId.firstChild);
  }
  const el =
    '<span class="container-person-field">This field is empty. Please, fill the content by rows.</span>';
  if (containerPersonId.children.length === 0) {
    containerPersonClass.classList.remove('fill');
    containerPersonId.insertAdjacentHTML('beforeend', el);
  }
};
