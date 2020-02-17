# Attendance-list-v1.0

## Table of Contents
1. [ Description. ](#topic_1)
2. [ Usage tips. ](#topic_2)

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

## Technologies

- Vanilla JS
- jsPDF
- ESLint
- LocalStorage

## Link to the project

https://danielos12.github.io/Attendance-list-v1.0/v2.3/index.html

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

## Introduction
Entire principle working based on three types of language. We are talking about CSS, HTML and JS. In `index.html` I placed the static elements, that we see in the moment of visiting our application such as: navbar, icons, attendance list ect. In `main.css` and in `popup` folder I placed CSS files to style our elements. The most important thing that I want to discuss is part about Javascript, because the most significant functionality of this application is based on this language. So let's get started!

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

## 


