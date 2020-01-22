import * as NavButtons from './modules/Navbar_Buttons/navButtons.js';
const {
  storeDataInLocalStorage,
  loadDataFromLocalStorage,
  getNevListPopUp
} = NavButtons;

import * as InPopUp from './modules/PopUp/inPopUp.js';
const { eventForListButtons, createNewListForm } = InPopUp;

import * as CreateList from './modules/List_interface/createList.js';
const { createNewPersonForm, removeRow, selectButton, clearList } = CreateList;

import { generatePDF } from './modules/List_interface/pdfButton.js';

import startTime from './modules/counter.js';
import loadLocalStorage from './modules/loadLocalStorage.js';

document.addEventListener('DOMContentLoaded', () => {
  //navButtons.js
  const storageBtn = document.querySelector('#storage-btn');
  const loadBtn = document.querySelector('#load-btn');
  const newList = document.querySelector('#newlist-btn');
  storageBtn.addEventListener('click', storeDataInLocalStorage);
  loadBtn.addEventListener('click', loadDataFromLocalStorage);
  newList.addEventListener('click', getNevListPopUp);

  //inPopUp.js
  const containerList = document.querySelector('#modalBody');
  const popUpFormContainer = document.querySelector('.pop-up-form-container');
  containerList.addEventListener('click', eventForListButtons);
  popUpFormContainer.addEventListener('submit', createNewListForm);

  //createList.js
  const eraserBtn = document.querySelector('.fas.fa-eraser');
  const formContainer = document.querySelector('.form-container');
  const containerPerson = document.querySelector('#container-person');
  formContainer.addEventListener('submit', createNewPersonForm);
  containerPerson.addEventListener('click', removeRow);
  containerPerson.addEventListener('click', selectButton);
  eraserBtn.addEventListener('click', clearList);

  //pdfButton
  const pdfButton = document.querySelector('#pdf-button');
  pdfButton.addEventListener('click', generatePDF);

  //load content and counter
  window.addEventListener('load', () => {
    startTime();
    loadLocalStorage();
  });
});
