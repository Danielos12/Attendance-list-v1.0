import * as OpenClosePopUp from '../PopUp/openClosePopUp.js';
const { openPopUpForCreateListBtn, openPopUpForLoadBtn } = OpenClosePopUp;

export { storeDataInLocalStorage, loadDataFromLocalStorage, getNevListPopUp };

const storageBtn = document.querySelector('#storage-btn');

const storeDataInLocalStorage = () => {
  let rowDataContainer = document.querySelector('.row-data-container');
  const containerPerson = document.querySelector('#container-person');
  const loadBtn = document.querySelector('#load-btn');

  let temp = 1;
  const obj = [];
  let myJSON;
  const getName = storageBtn.dataset.save;

  if (containerPerson.children.length === 0) {
    alert('Cannot save the empty field! Please fill the content.');
  } else {
    if (loadBtn.dataset.index == 0) {
      temp = 0;
    }
    rowDataContainer = containerPerson.childNodes[temp];
    for (let i = 0; i < containerPerson.children.length; i++) {
      obj.push({
        name: rowDataContainer.childNodes[0].innerHTML, // load error
        surname: rowDataContainer.childNodes[1].innerHTML,
        time: rowDataContainer.childNodes[2].innerHTML
      });
      myJSON = JSON.stringify(obj);
      if (temp < containerPerson.children.length) {
        rowDataContainer = containerPerson.childNodes[++temp];
      }
    }
    localStorage.setItem(getName, myJSON);
    alert(`The list ${getName} has been saved`);
  }
};

const loadDataFromLocalStorage = e => {
  if (localStorage.length === 0) {
    alert('The storage is empty!');
  } else {
    openPopUpForLoadBtn();
  }
};

const getNevListPopUp = () => {
  openPopUpForCreateListBtn();
};
