# Attendance-list-v1.0

## Table of Contents
1. [What is Attendance-list?](#topic_1)
2. [How does it work?](#topic_2)
3. [Used technologies](#topic_3)
4. [Link to the project](#topic_4)
5. [File structure](#topic_5)

### Documentation description
1. [Introduction](#topic_6)
2. [init.js](#topic_7)
3. [counter.js](#topic_8)
4. [How is the list created?](#topic_9)
5. [Person.js and UI.js](#topic_10)
6. [How does the interface of the list work?](#topic_11)
7. [Popups](#topic_12)
8. [How are new lists created?](#topic_13)
9. [How are the persons saved?](#topic_14)
10. [How is the data loaded?](#topic_15)
11. [How the lists are loaded after entry to the website?](#topic_16)
12. [How the pdf is generated](#topic_17)

<a name="topic_1"></a>
## What is Attendance-list?

It is just a simple application for checking attendance of workers, students or whoever you want. The clock will help you check when workers are going to be late. When you check the list, then you can download this in pdf!

<a name="topic_2"></a>
## How does it work?

1. Create a single list.
2. Give its a single name.
3. Load the list by click on it.
4. Fill the list by entering data in inputs.
5. Then you can check attendance by buttons on the right side.
6. If you want you can download this in pdf.
7. After that you can save list by clickin on "save" button in navbar!

<a name="topic_3"></a>
## Used technologies

- Vanilla JS
- jsPDF
- ESLint
- LocalStorage

<a name="topic_4"></a>
## Link to the project

https://danielos12.github.io/Attendance-list-v1.0/v2.3/index.html

<a name="topic_5"></a>
##  File structure

```bash
|--jsPDF
|  `--...
|--v2.3
|   |--fontawesome-free-5.11.2-web
|      `--...
|   |-modules
|     |--List
|        |--Person.js
|        `--UI.js
|     |--List_interface
|        |--createList.js
|        `--pdfButton.js
|     |--Navbar_Buttons
|        `--navButtons.js
|     |--Popup
|        |--List.js
|        |--PopUpUI.js
|        |--inPopUp.js
|        `--openClosePopUp.js
|     |--counter.js
|     `--loadLocalStorage.js
|  |--popup
|  |--index.html
|  |--init.js
|  `--main.css
|--gitignore
`--README.md
```
<a name="topic_6"></a>
## Introduction
Entire principle working based on three types of language. We are talking about CSS, HTML and JS. In `index.html` I placed the static elements, that we see in the moment of visiting our application such as: navbar, icons, attendance list ect. In `main.css` and in `popup` folder I placed CSS files to style our elements. The most important thing that I want to discuss is part about Javascript, because the most significant functionality of this application is based on this language. So let's get started!

<a name="topic_7"></a>
## init.js
In this file, I placed handlers and event listeners to control every event from user input like click or sending the form. As you can see, there are also key words like `import` and `export`. Thanks for these features, which comes from ES6, we can in a simple way split our code to modules making that our code is more readable and clear.

```javascript
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

 // ...

```

When we enter our application, then the content must be loaded. We can do that by setting event lister to global object `window`.
Then the event `load` will be triggered every time when we enter our website. Then functions `startTime()` and `loadLocalStorage()`
will be initialize.

```javascript
 //load content and counter
  window.addEventListener('load', () => {
    startTime();
    loadLocalStorage();
  });
});
```
The working of the `load LocalStorage()` function I am going to explain soon in the next parts. Now, let's find out more about the `start Time()` function.

<a name="topic_8"></a>
## counter.js

```javascript
export default function startTime() {
  let today = new Date();
  let hr = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  min = checkTime(min);
  sec = checkTime(sec);
  document.getElementById('clockTimer').innerHTML = `${hr} : ${min} : ${sec}`;
  let time = setTimeout(function() {
    startTime();
  }, 500);
}
//Add a zero in front of numbers<10
function checkTime(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}
```

In this module, we export, previously mentioned function `startTime()`. Using `Date()` object we can concatenate variables by Template String (ES6) and place this one in our HTML document by `innerHTML` method. Thanks to `setTimeout()` function, `startTime()` can be recall by 0,5 second delay. That gives us quite nice a real-time simulation. By `checkTime()` function we can put a zero in front of numbers less than 10.

<a name="topic_9"></a>
## How is the list created?
In the first step, we have to look into `init.js`. Then we will see handlers associated with our list interface. The handler that interested us is `formContainer`. Thanks to this one we can submit our form from the inputs.

```javascript
//createList.js
  const eraserBtn = document.querySelector('.fas.fa-eraser');
  const formContainer = document.querySelector('.form-container'); //<<<---- mentioned handler
  const containerPerson = document.querySelector('#container-person');
  formContainer.addEventListener('submit', createNewPersonForm);
  containerPerson.addEventListener('click', removeRow);
  containerPerson.addEventListener('click', selectButton);
  eraserBtn.addEventListener('click', clearList);
```


Then we must go to `createList.js` and take a look at `createNewPersonForm` function. Inside of this, we have handlers necessary to operating on our DOM elements.

```javascript
const createNewPersonForm = e => {
  // take value from DOM elements
  const name = document.forms.Form['input-name'].value;
  const surname = document.forms.Form['input-surname'].value;
  const time = document.querySelector('#clockTimer').textContent;

  // use preventDefault() to prevent submitting a form
  e.preventDefault();
  const inputname = document.querySelector('#data-name');
  const inputsurname = document.querySelector('#data-surname');
  const conPer = document.querySelector('.container-person');
// ...
```
Now we have to operate on `UI` and `Person` classes. In order to do that, we are going to import them, on the very top of our current file. I am going to describe them in detail in the next step.

```javascript
import UI from '../List/UI.js';
import Person from '../List/Person.js';
// ...
```

Then we must create an instance of class `Person`, in order to insert our data from the inputs and clock. After a visual operation in the interface, our function goes to the `UI` object and perform `addRowData()` method to display our data.

```javascript
 // put variables into Person's constructor
  const person = new Person(name, surname, time);

  if (inputname.value !== '' && inputsurname.value !== '') {
    if (conPer.className === 'container-person') {
      // change style of this element
      conPer.classList.toggle('fill');
    }
    if (document.querySelector('.container-person-field')) {
      document.querySelector('.container-person-field').remove();
    }
    // add the new div
    UI.addRowData(person);
    UI.clearInput(inputname, inputsurname);
    inputname.focus();
  }
};
```

In the end don't forget to export our function, to put it in event listener in `init.js` file.

```javascript
import UI from '../List/UI.js';
import Person from '../List/Person.js';

export { createNewPersonForm, ...};
```

That way of code implementation works similarly in other modules.

<a name="topic_10"></a>
## Person.js and UI.js
Now we should take a look better on this ones. The first one is `Person.js`

```javascript
export default function Person(name, surname, time) {
  this.name = name;
  this.surname = surname;
  this.time = time;
}
```
`Person` function acts as simple constructor. Thanks to it we can create new row with data of given person in `UI.js` file.
In `addRowData()` function there are created buttons and other DOM elements for new person row. Then we can attach all elements in `documentFragment`.

```javascript
export default function UI() {}

UI.addRowData = function addRowData(person) {
  const documentFragment = document.createDocumentFragment();
  const containerPerson = document.querySelector('#container-person');
  const rowDataContainer = document.createElement('DIV'); // creating divs
  const rowName = document.createElement('DIV');
  const rowSurename = document.createElement('DIV');
  const rowTime = document.createElement('DIV');
  const removeButton = document.createElement('BUTTON');
  const checkButton = document.createElement('BUTTON');
  const timesButton = document.createElement('BUTTON');

  const imageReBtn = document.createElement('i');
  const imageCheBtn = document.createElement('i');
  const imageTimBtn = document.createElement('i');

  const clearBoth = document.createElement('DIV');

  clearBoth.setAttribute('style', 'clear:both;'); // remove float: left from rowDataContainer's childrens

  rowDataContainer.className = 'row-data-container'; // giving class to every new divs
  rowName.className = 'row-data';
  rowSurename.className = 'row-data';
  rowTime.className = 'row-data';

  removeButton.className = 'remove-button';
  checkButton.className = 'check-button';
  timesButton.className = 'times-button';

  imageReBtn.className = 'fa fa-trash';
  imageCheBtn.className = 'fas fa-check';
  imageTimBtn.className = 'fas fa-times';

  const textName = document.createTextNode(person.name); // collection data from the inputs
  const textSurename = document.createTextNode(person.surname);
  const textTime = document.createTextNode(person.time);

  rowName.appendChild(textName);
  rowSurename.appendChild(textSurename);
  removeButton.appendChild(imageReBtn);
  checkButton.appendChild(imageCheBtn);
  timesButton.appendChild(imageTimBtn);
  rowTime.appendChild(textTime);

  // -----------documentFragment---------------
  documentFragment.appendChild(rowDataContainer);
  // ...
```

After that, all DOM elements are put in an array and the `map` method is carried out on them to append all children to row person.
In the end, the `documentFragment` is appended to `containerPerson`, which is our container for rows.

```javascript
const tab = [
    rowName,
    rowSurename,
    rowTime,
    removeButton,
    checkButton,
    timesButton,
    clearBoth
  ];
  tab.map(item => {
    rowDataContainer.appendChild(item);
  });
  containerPerson.appendChild(documentFragment);
};

// clear the inputs
UI.clearInput = function(inputname, inputsurname) {
  inputname.value = '';
  inputsurname.value = '';
};
```
<a name="topic_11"></a>
##  How does the interface of the list work?
In the list's interface (**crateList.js**) there are enabled four functions, which can be recalled under the impact of the event. Those are `createNewPersonForm`, `removeRow`, `selectButton` and `clearList`. The first one was described, so let's focus on these last three.

### removeRow()
That is a pretty simple function. Our `e` argument represents the event. In this case, it is `click` event (look at the event listeners in init.js). The `target` method allows us to get an element that was triggered by the event, and the` closest` method can redirect us to nested element in its parental elements. The `remove()` method as the name suggests, removes the given element from the DOM tree.

```javascript
const removeRow = e => {
  if (e.target.closest('.remove-button') !== null) {
    e.target.closest('.row-data-container').remove();
  }
};
```

### selectButton()
Here this case looks more complicated. To toggle between `check-button` and `times-button` we need to refer to the DOM tree.
If `check-button` is clicked, it will change the class on `selected` by the `toggle` method. If we want to trigger sibling element by another element, we need to refer our event through parent object by the `parentNode` method.

```javascript
 // Change button's class on selected
  if (e.target.closest('.check-button') !== null) {
    e.target.closest('.check-button').classList.toggle('selected');
    e.target
      .closest('.check-button')
      .childNodes[0].classList.toggle('selected');
    const sibs = e.target
      .closest('.check-button')
      .parentNode.querySelector('.times-button');
    // remove 'selected' class from 'times-button' if it has one.
    if (sibs !== null) {
      if (sibs.classList.contains('selected')) {
        sibs.classList.remove('selected');
        sibs.childNodes[0].classList.remove('selected');
      }
    }
  } 
  // analogical
  else if (e.target.closest('.times-button') !== null) {
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
```

### clearList()
This function is responsible for clearing the list from displayed persons. By `while` loop, the container filled by persons is clearing until the last person won't be removed. Then `span` is inserted in `containerPersonId` by the `insertAdjacentHTML`, that insert given element in specified position.

```javascript
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

```
<a name="topic_12"></a>
## Popups
Thanks to popups, the UI can be extended by additional windows allowing append new options.

### openClosePopUp.js
In this file, there are functions responsible for displaying popups for the given button.

```javascript
import loadLocalStorage from '../loadLocalStorage.js';

export { openPopUpForCreateListBtn, openPopUpForLoadBtn };

const openPopUpForCreateListBtn = () => {
  const modal = document.getElementById('createNewModal');

  const span = document.getElementById('closeTwo');

  modal.style.display = 'block';

  span.onclick = () => {
    modal.style.display = 'none';
  };

  window.onclick = event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
};

const openPopUpForLoadBtn = () => {
  const modalBody = document.querySelector('#modalBody');
  // Get the modal
  const modal = document.getElementById('loadModal');

  const span = document.getElementById('closeOne');

  modal.style.display = 'block';
  removePersons(modalBody);
  loadLocalStorage();

  span.onclick = () => {
    modal.style.display = 'none';
    removePersons(modalBody);
  };

  window.onclick = event => {
    if (event.target === modal) {
      modal.style.display = 'none';
      removePersons(modalBody);
    }
  };
};

function removePersons(object) {
  while (object.firstChild) {
    object.removeChild(object.firstChild);
  }
}

```

### navButtons.js
To open the popups it is necessary to attach them to event listeners in **init.js**. There are also used function from **openClosePopUp.js**.
```javascript
// ...

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

```

## inPopUp.js
This file contain that what is happened in our popups. In `eventForListButtons` was defined functions responsible for removing lists in load popup and crating new list in another popup.


```javascript

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

    const modal = document.getElementById('loadModal');

    const getNameAndClosePopup = () => {
      const titleOfListHeader = document.querySelector('.title-of-list-header');
      titleOfListHeader.textContent = getTextName;
      modal.style.display = 'none';
    };

    // ...
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
  
```
## List.js
To create the list there is also needed a constructor.

```javascript
export default function List(name) {
  this.name = name;
}

```
<a name="topic_13"></a>
## How are new lists created?

In a similar way like in **UI.js**

```javascript
export default function PopUpUI() {}

PopUpUI.addListData = function addListData(list) {
  const documentFragment = document.createDocumentFragment();
  const containerList = document.querySelector('#modalBody');
  const rowDataContainer = document.createElement('DIV');
  const rowName = document.createElement('DIV');
  const rowFileIcon = document.createElement('DIV');
  const rowRemoveIcon = document.createElement('DIV');
  const fileIcon = document.createElement('i');
  const removeIcon = document.createElement('i');

  const clearBoth = document.createElement('DIV');
  clearBoth.setAttribute('style', 'clear:both;');
  rowDataContainer.className = 'popup-row-data-container';
  rowRemoveIcon.className = 'remove-div';
  rowName.className = 'popup-row-data';
  rowFileIcon.className = 'file-div';
  fileIcon.className = 'far fa-file';
  removeIcon.className = 'far fa-trash-alt';

  const textName = document.createTextNode(list.name);

  rowName.appendChild(textName);

  //-----------documentFragment------------------
  rowRemoveIcon.appendChild(removeIcon);
  rowFileIcon.appendChild(fileIcon);

  const tab = [rowFileIcon, rowName, rowRemoveIcon, clearBoth];
  tab.map(item => {
    rowDataContainer.appendChild(item);
  });
  documentFragment.appendChild(rowDataContainer);
  containerList.appendChild(documentFragment);
};
PopUpUI.clearInput = function(inputname) {
  inputname.value = '';
};

```
<a name="topic_14"></a>
## How are the persons saved?
 In the **navButtons.js** file there is function that I haven't mentioned before. It's `storeDataInLocalStorage()`. In this case is used `localStorage`, which serves as the database. We declare `obj` as an array to put data from the list's rows. Then the `obj` have to be parsed to string by the `stringify` method because data in `local storage` is saving in JSON format. Finally, the `obj` is set by the `setItem` method.

```javascript
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
```
<a name="topic_15"></a>
## How is the data loaded?

After saving the data it would be appropiate to load it. In the `inPopup.js` there is certain event, which is responsible for it.
We are talking about `getName` event. It is triggered if we will click on `'.popup-row-data'`. Based on a name of given list, we can refer to **local storage** and get the object with given key. Then we reach to its properties such as `name`, `surname`, and `time`.
Thanks to `loadRowData()` the fetched data can be displayed.

```javascript
  if (getName !== null) {
    const loadBtn = document.querySelector('#load-btn');
    const storageBtn = document.querySelector('#storage-btn');
    const getTextName = e.target.closest('.popup-row-data').textContent;
    const containerPersonId = document.querySelector('.container-person');

    const modal = document.getElementById('loadModal');

    const getNameAndClosePopup = () => {
      const titleOfListHeader = document.querySelector('.title-of-list-header');
      titleOfListHeader.textContent = getTextName;
      modal.style.display = 'none';
    };

    if (getName !== null) {
      const prsdataJSONString = localStorage.getItem(getTextName);
      const prsdataObjJs = JSON.parse(prsdataJSONString);
      let name;
      let surname;
      let time;

      storageBtn.dataset.save = getTextName;
      loadBtn.dataset.index = 0;

      const loadRowData = loadPerson => {
        return UI.addRowData(loadPerson);
      };

      $('.container-person-field').remove();
      $('.container-person').addClass('fill');
      $('#container-person').empty();

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
  }
```
<a name="topic_16"></a>
## How the lists is loaded after entry to the website?

The solution is pretty easy. In that issue I have used a loop, to iterate on every key (the key is our list), then based on this I created `list` instance and then I used the `addListData` method to display them.

```javascript
// Load The Content
export default function loadLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const name = localStorage.key(i);
    const list = new List(name);
    PopUpUI.addListData(list);
  }
}
```
<a name="topic_17"></a>
## How the pdf is generated?

```javascript
const generatePDF = e => {
  const doc = new jsPDF();
  const loadBtn = document.querySelector('#load-btn');
  const container = document.querySelector('#container-person');
  let data = document.querySelector('.row-data-container');
  
  // check icon
  const imgCheck =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB/klEQVRIx+3Tv2sTYRgH8O/z3CVNoZUi4iQixcHBQeoFgjg41UFFRSVIwV9tLjh0cBAHt7o5SAcRfYlbQVEXf6ARLRrQauTFv8HNVSFD0949j0POxMS79mKzCH1ue5/3/Xzfe44D/veiQWKemEMKveoqF+tOqTHQAE/MQYW+UugIgd67ysfqTqkxkIC8mIJAXyt0S2c0rZANB+TFeAJ9o9Cx3h6BqhsKyIvZJ9BFhW6NwZcJ9O9vkBezV6DvFLotBl8h0HHLfpW7DoVm4sDq/ey6eGj2RDdPwk9Z9qsA0A7wxEwK6cemEzwuBJXcGvhuIV1U6PYYPCBQ0bL/orMW4Qp9qtBctPGtK87JujvT6MHHhbSm0B0J+FnL/pOudS80k0od/I8DS47ykS9O6UeE74zwXTG4EGjKsv/wr95+ufdcoUfjxkGgr47yYYXmInw8AT9v2V+IMzgjzhkCvYxrKnQiJKlFM0/Cp5Pw9jcoBJXcKocPFHoCKYtaT8myX1lrHwPAZ3dmOStukUCP+sAvr4e3AwDgkzu9MiSZKQItpMBnLft301ym60dbci8Fw+HQRQJVknFcsezfTjtK7l34kLkQjATDZQbdicGvWS7Pp8VjAwCglj0nY83RWQbdauEAAdctl2/2g/8+m1infz7jb6PfbwBoWi7P9YtvVqr6BdA80PneueGMAAAAAElFTkSuQmCC';
  
 // X icon
 const imgX =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABaUlEQVRIx6WWwWrCQBCG//kpTeijiIiIiOcgIiIexLcTH8CDpz6VBBEPViTN2EOzkibubGIH9pTd75udGdgARWRRFKvINic7eDFUZK0iuyyO3/98yKIoVuBTgbsCByW7L8BXCmQK3FVk/5BU4PeSpNcCvnzA3XISFdlX4G6lOdlvAF8ocHvKENk4+80jOSo5MOBz42yauyqYWfxKhjU4ObPO1G4fyOak5KgEnyhwbQyvZOU7eFZyrGRi7DnlRkmdZGpKgIsBH6JJBErwVJyXSthUkhjZ/g/eQnJWcmwxGHB8Afg2vr8B+Hg1+1HR1FCJrkpO2sKHCpxaNPmq5KwpfKDA0QO6GLe6qcjchOdk34STiZLjgGThy7ynQGqUICklMgpIllV4V4FDmyYWEl+fMhVZuY2dAHxqlHQYkKyhIlvvVRtMRm4NhcjO92SGJyI0HMa77J+EsCStwV0Uvy372gS0k/RUZFOG/wDPuFD1Of6MzgAAAABJRU5ErkJggg==';
  
  let temp = 2;
  let cord1 = 20;
  let cord2 = 40;
  let cord3 = 35;
  doc.setFontType('bold');
  doc.text('Name:', 20, 20);
  doc.text('Surname:', 70, 20);
  doc.text('Time:', 120, 20);
  doc.text('Presence:', 170, 20);
  doc.setFontType('normal');

  if (loadBtn.dataset.index == 0) {
    temp = 0;
  }
  
  // 
  for (let j = 0; j < container.children.length; j++) {
    for (let i = 0; i < data.children.length; i++) {
      if (data.childNodes[i].className === 'check-button selected') {
        doc.addImage(imgCheck, 'PNG', 180, cord3);
      } else if (data.childNodes[i].className === 'times-button selected') {
        doc.addImage(imgX, 'PNG', 180, cord3);
      }
      doc.text(data.childNodes[i].textContent, cord1, cord2); // cord1 - horizontal, cord2 - vertical
      cord1 += 50; // space between children of '.row-data-container'
    }
    cord1 = 20;
    cord2 += 20; // new line
    cord3 += 20;
    data = container.childNodes[++temp];
  }
  doc.save('a4.pdf');
};
```

