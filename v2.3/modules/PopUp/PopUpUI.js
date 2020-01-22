export default function PopUpUI() {}

PopUpUI.addListData = function addListData(list) {
  var documentFragment = document.createDocumentFragment();
  var containerList = document.querySelector('#modalBody');
  var rowDataContainer = document.createElement('DIV');
  var rowName = document.createElement('DIV');
  var rowFileIcon = document.createElement('DIV');
  var rowRemoveIcon = document.createElement('DIV');
  var fileIcon = document.createElement('i');
  var removeIcon = document.createElement('i');

  var clearBoth = document.createElement('DIV');
  clearBoth.setAttribute('style', 'clear:both;');
  rowDataContainer.className = 'popup-row-data-container';
  rowRemoveIcon.className = 'remove-div';
  rowName.className = 'popup-row-data';
  rowFileIcon.className = 'file-div';
  fileIcon.className = 'far fa-file';
  removeIcon.className = 'far fa-trash-alt';

  var textName = document.createTextNode(list.name);

  rowName.appendChild(textName);

  //-----------documentFragment------------------
  rowRemoveIcon.appendChild(removeIcon);
  rowFileIcon.appendChild(fileIcon);

  var tab = [rowFileIcon, rowName, rowRemoveIcon, clearBoth];
  tab.map(item => {
    rowDataContainer.appendChild(item);
  });
  documentFragment.appendChild(rowDataContainer);
  containerList.appendChild(documentFragment);
};
PopUpUI.clearInput = function(inputname) {
  inputname.value = '';
};
