export { generatePDF };

const generatePDF = e => {
  const doc = new jsPDF();
  const loadBtn = document.querySelector('#load-btn');
  const container = document.querySelector('#container-person');
  let data = document.querySelector('.row-data-container');
  const imgCheck =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB/klEQVRIx+3Tv2sTYRgH8O/z3CVNoZUi4iQixcHBQeoFgjg41UFFRSVIwV9tLjh0cBAHt7o5SAcRfYlbQVEXf6ARLRrQauTFv8HNVSFD0949j0POxMS79mKzCH1ue5/3/Xzfe44D/veiQWKemEMKveoqF+tOqTHQAE/MQYW+UugIgd67ysfqTqkxkIC8mIJAXyt0S2c0rZANB+TFeAJ9o9Cx3h6BqhsKyIvZJ9BFhW6NwZcJ9O9vkBezV6DvFLotBl8h0HHLfpW7DoVm4sDq/ey6eGj2RDdPwk9Z9qsA0A7wxEwK6cemEzwuBJXcGvhuIV1U6PYYPCBQ0bL/orMW4Qp9qtBctPGtK87JujvT6MHHhbSm0B0J+FnL/pOudS80k0od/I8DS47ykS9O6UeE74zwXTG4EGjKsv/wr95+ufdcoUfjxkGgr47yYYXmInw8AT9v2V+IMzgjzhkCvYxrKnQiJKlFM0/Cp5Pw9jcoBJXcKocPFHoCKYtaT8myX1lrHwPAZ3dmOStukUCP+sAvr4e3AwDgkzu9MiSZKQItpMBnLft301ym60dbci8Fw+HQRQJVknFcsezfTjtK7l34kLkQjATDZQbdicGvWS7Pp8VjAwCglj0nY83RWQbdauEAAdctl2/2g/8+m1infz7jb6PfbwBoWi7P9YtvVqr6BdA80PneueGMAAAAAElFTkSuQmCC';
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
