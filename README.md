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

##  How does the interface of the list work?
In the list's interface (crateList.js) there are enabled four functions, which can be recalled under the impact of the event. Those are `createNewPersonForm`, `removeRow`, `selectButton` and `clearList`. The first one was described, so let's focus on these last three.

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




