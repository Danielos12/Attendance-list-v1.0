# Attendance-list-v1.0

## What is Attendance-list?

It is just a simple application for checking attendance of workers, students or whoever you want. The clock will help you check when workers is going to be late. When you check the list, then you can download this in pdf!

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

##  Files structure

```bash
|--jsPDF
   `--...
|--v2.3
   |--fontawesome-free-5.11.2-web
      `--...
   |-modules
     |--List
        |--Person.js
        `--UI.js
     |--List_interface
        |--createList.js
        `--pdfButton.js
     |--Navbar_Buttons
        `--navButtons.js
     |--Popup
        |--List.js
        |--PopUpUI.js
        |--inPopUp.js
        `--openClosePopUp.js
     |--counter.js
     `--loadLocalStorage.js
  |--popup
  |--index.html
  |--init.js
  `--main.css
|--gitignore
`--README.md
```

