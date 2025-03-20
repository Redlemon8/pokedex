import pokemon from './pokemon.js';
import team from './team.js';
import type from './type.js';


const app = {
    init() {
        pokemon.init();
        type.init();
        team.init();
    },
};

document.addEventListener("DOMContentLoaded", app.init);