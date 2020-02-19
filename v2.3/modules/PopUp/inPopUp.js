import List from '../PopUp/List.js';
import PopUpUI from '../PopUp/PopUpUI.js';
import UI from '../List/UI.js';
import Person from '../List/Person.js';
import { clearList } from '../List_interface/createList.js';

export { eventForListButtons, createNewListForm };

// event for buttons in popup
const eventForListButtons = e => {
  const removeButton = e.target.closest('.remove-div');
  const getName = e.target.closest('.popup-row-data');

  // remove row
  if (removeButton !== null) {
    const titleOfListHeader = document.querySelector('.title-of-list-header');
    const localStorageObjectName =
      removeButton.parentNode.childNodes[1].textContent;
    localStorage.removeItem(localStorageObjectName);
    e.target.closest('.popup-row-data-container').remove();

    if (
      removeButton.parentNode.querySelector('.popup-row-data').textContent ==
      titleOfListHeader.textContent
    ) {
      clearList();
      titleOfListHeader.textContent = 'List of members';
    }
  }

  // get name and load data
  if (getName !== null) {
    const loadBtn = document.querySelector('#load-btn');
    const storageBtn = document.querySelector('#storage-btn');
    const getTextName = e.target.closest('.popup-row-data').textContent;
    const containerPersonId = document.querySelector('.container-person');
    const containerPersonField = document.querySelector(
      '.container-person-field'
    );
    const modal = document.getElementById('loadModal');
    const prsdataJSONString = localStorage.getItem(getTextName);
    const prsdataObjJs = JSON.parse(prsdataJSONString);
    let name;
    let surname;
    let time;

    const getNameAndClosePopup = () => {
      const titleOfListHeader = document.querySelector('.title-of-list-header');
      titleOfListHeader.textContent = getTextName;
      modal.style.display = 'none';
    };
    const loadRowData = loadPerson => {
      return UI.addRowData(loadPerson);
    };
    const clearListForLoading = container => {
      containerPersonField === true ? containerPersonField.remove() : false;
      container.classList.add('fill');
      while (container.firstChild) {
        container.firstChild.remove();
      }
    };

    storageBtn.dataset.save = getTextName;
    loadBtn.dataset.index = 0;

    clearListForLoading(containerPersonId);

    if (prsdataObjJs == null) {
      containerPersonId.classList.remove('fill');
      containerPersonId.innerHTML =
        '<span class="container-person-field">This field is empty. Please, fill the content by rows.</span>';
      getNameAndClosePopup();
    } else {
      for (let i = 0; i < prsdataObjJs.length; i++) {
        name = prsdataObjJs[i].name;
        surname = prsdataObjJs[i].surname;
        time = prsdataObjJs[i].time;

        const loadPerson = new Person(name, surname, time);
        loadRowData(loadPerson);
      }
      getNameAndClosePopup();
    }
  }
};

// create a new list
const createNewListForm = e => {
  const popUpNewList = null;

  const name = document.forms.FormLoadPopUp.inputCreateNew.value;
  const inputname = document.querySelector('#inputCreateNew');
  e.preventDefault();
  if (name === '') {
    alert('Cannot create the list without a name');
  } else {
    const list = new List(name);
    PopUpUI.addListData(list);

    PopUpUI.clearInput(inputname);
    localStorage.setItem(name, popUpNewList);
  }
};
