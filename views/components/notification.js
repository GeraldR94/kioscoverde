const div = document.querySelector('#notification');

export const createNotification = (isError, message) => {
//   const div = document.createElement('div');
//   div.classList.add('fixed', 'top-20', 'right-0', 'left-0');
  if (isError){
    div.innerHTML = `
    <div class="fixed top-20 right-0 left-0">
          <div class="max-w-7xl mx-auto px-4 flex justify-end">
              <p class="bg-red-600 p-3 font-semibold text-center rounded-lg w-3/12">${message}</p>
          </div>
      </div>
    `;
  } else {
    div.innerHTML = `
  <div class="fixed top-20 right-0 left-0">
        <div class="max-w-7xl mx-auto px-4 flex justify-end">
            <p class="bg-green-600 p-3 font-semibold text-center rounded-lg w-3/12">${message}</p>
        </div>
    </div>
  `;
  }
};