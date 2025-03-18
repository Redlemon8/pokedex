import pokemon from './pokemon.js';

const app = {
    init() {
        pokemon.init();
    },
};

document.addEventListener("DOMContentLoaded", app.init);