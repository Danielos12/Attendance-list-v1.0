# Attendance-list-v1.0

## What is Attendance-list?

It is just a simple application for checking attendance of workers, students or whoever you want. The clock will help you check when workers are going to be late. When you check the list, then you can download this in pdf!

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
Both functions will be describe in next parts.



