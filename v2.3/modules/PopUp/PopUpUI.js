export default function PopUpUI() {}

PopUpUI.addListData = function addListData(list) {
  let documentFragment = document.createDocumentFragment();
  let containerList = document.querySelector('#modalBody');
  let rowDataContainer = document.createElement('DIV');
  let rowName = document.createElement('DIV');
  let rowFileIcon = document.createElement('DIV');
  let rowRemoveIcon = document.createElement('DIV');
  let fileIcon = document.createElement('i');
  let removeIcon = document.createElement('i');

  let clearBoth = document.createElement('DIV');
  clearBoth.setAttribute('style', 'clear:both;');
  rowDataContainer.className = 'popup-row-data-container';
  rowRemoveIcon.className = 'remove-div';
  rowName.className = 'popup-row-data';
  rowFileIcon.className = 'file-div';
  fileIcon.className = 'far fa-file';
  removeIcon.className = 'far fa-trash-alt';

  let textName = document.createTextNode(list.name);

  rowName.appendChild(textName);

  //-----------documentFragment------------------
  rowRemoveIcon.appendChild(removeIcon);
  rowFileIcon.appendChild(fileIcon);

  let tab = [rowFileIcon, rowName, rowRemoveIcon, clearBoth];
  tab.map(item => {
    rowDataContainer.appendChild(item);
  });
  documentFragment.appendChild(rowDataContainer);
  containerList.appendChild(documentFragment);
};
PopUpUI.clearInput = function(inputname) {
  inputname.value = '';
};
