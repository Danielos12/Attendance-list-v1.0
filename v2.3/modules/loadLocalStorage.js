import List from './PopUp/List.js';
import PopUpUI from './PopUp/PopUpUI.js';

// Load The Content
export default function loadLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const name = localStorage.key(i);
    const list = new List(name);
    PopUpUI.addListData(list);
  }
}
