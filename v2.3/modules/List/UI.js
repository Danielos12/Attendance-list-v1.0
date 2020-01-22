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

UI.clearInput = function(inputname, inputsurname) {
  inputname.value = '';
  inputsurname.value = '';
};
