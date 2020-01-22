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
  const modalBody = $('#modalBody');
  // Get the modal
  const modal = document.getElementById('loadModal');

  const span = document.getElementById('closeOne');

  modal.style.display = 'block';
  modalBody.empty();
  loadLocalStorage();

  span.onclick = () => {
    modal.style.display = 'none';
    modalBody.empty();
  };

  window.onclick = event => {
    if (event.target === modal) {
      modal.style.display = 'none';
      modalBody.empty();
    }
  };
};
