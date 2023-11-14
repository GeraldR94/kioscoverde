const navbar = document.querySelector('#navbar');


const createNavHome = () => {
  navbar.innerHTML = `
    <div class="max-w-7xl bg-lime-800 h-16 mx-auto flex items-center justify-between px-4">
            <p class="font-bold text-xl text-white">Kiosco Verde</p>
                <!-- version movil -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-lime-700 rounded-lg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
              
                <!-- version escritorio -->
              <div class="hidden md:flex flex-row gap-4">
                <a href="/login/" class="transition ease-in-out text-white font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Login</a>
                <a href="/signup/" class="transition ease-in-out text-white font-bold bg-lime-500 hover:bg-green-700 py-2 px-4 rounded-lg">Signup</a>
              </div>

              <!-- menu movil -->
              <div class="bg-slate-700 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
                <a href="/login/" class="transition ease-in-out text-white font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Login</a>
                <a href="/signup/" class="transition ease-in-out text-white font-bold bg-lime-500 hover:bg-green-700 py-2 px-4 rounded-lg">Signup</a>
              </div>

        </div>
    `;
};

if (window.location.pathname === '/') {
  createNavHome();
}

const navBtn = navbar.children[0].children[1];

navBtn.addEventListener('click', e => {
  const menuMobile = navbar.children[0].children[3];
  if (!navBtn.classList.contains('active')){
    navBtn.classList.add('active');
    navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />';
    menuMobile.classList.remove('hidden');
    menuMobile.classList.add('flex');
  }
  else {
    navBtn.classList.remove('active');
    navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />';
    menuMobile.classList.add('hidden');
    menuMobile.classList.remove('flex');
  }
});


