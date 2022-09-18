import programs from './programs.json' assert {type: 'json'};

const saitPrograms = programs.programs.sort((a, b) => a.title.localeCompare(b.title))
const tableBody = document.querySelector('#tbody');

const deliverySelect = document.querySelector('.delivery-method-select');
const statusSelect = document.querySelector('.status-select');

deliverySelect.addEventListener('change', (event) => {
    switch(event.target.value) {
        case '1':
            displayRows(saitPrograms)
          break;
        case '2':
            getDelivery('Online')
          break
        case '3':
            getDelivery('On-Campus')
        break;
      }
});

statusSelect.addEventListener('change', (event) => {
    switch(event.target.value) {
        case '1':
            displayRows(saitPrograms)
          break;
        case '2':
            getStatus('Open')
          break
        case '3':
            getStatus('Closed')
        break;
        case '4':
            getStatus('Waitlisted')
        break;
      }
});

const getDelivery = (deliveryMethod) => {
    let filteredArray = saitPrograms.filter((element) => element.deliveryMethod.some((subElement) => subElement.delivery === deliveryMethod));
    for(var data in filteredArray){
      filteredArray[data].subElements = {"delivery": deliveryMethod};
      }

    displayRows(filteredArray)
}

const getStatus = (courseStatus) => {
    let filteredArray = saitPrograms.filter((element) => element.deliveryMethod.some((subElement) => subElement.status === courseStatus));
    for(var data in filteredArray){
      filteredArray[data].subElements = {"delivery": courseStatus};
      }

    displayRows(filteredArray)
}

const displayRows = (rows) => {
    const htmlString = rows
      .map((row) => {
        return `
        <tr>
            <td class='align-middle delivery-title-row'>
                <a href="https://www.sait.ca/programs-and-courses/would-need-additional-info/${row.title.replace(/\s/g, '-')}">${row.title}</a>
            </td>
            <td id='delivery-method-row'>
            ${row.deliveryMethod.map((method) => {
                return `
                        <div>${method.delivery}</div>
                            `
            }).join('')}
            </td>
            <td id='delivery-status-row'>
            ${row.deliveryMethod.map((method) => {
                return `
                        <div class='d-flex align-items-center'>
                            <div class='status-button ${method.status}'></div>
                            <div>${method.status}</div>
                        </div>
                            `
            }).join('')}
            </td>
        </tr>
              `
      })
      .join('');
      tableBody.innerHTML = htmlString;
  };

  displayRows(saitPrograms)