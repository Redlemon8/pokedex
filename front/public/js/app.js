import pokemon from './pokemon.js';
import type from './type.js';


const app = {
    init() {
        pokemon.init();
        type.init();
    },
};

document.addEventListener("DOMContentLoaded", app.init);