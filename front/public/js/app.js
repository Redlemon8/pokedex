import pokemon from './pokemon.js';
import team from './team.js';
import type from './type.js';


const app = {
    init() {
        pokemon.init();
        type.init();
        team.init();
        app.initNavigation();
        app.initLogoClick();
    },

    initNavigation() {
        // Gérer l'état actif de la navigation
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Retirer la classe active de tous les éléments
                navItems.forEach(nav => nav.classList.remove('active'));
                // Ajouter la classe active à l'élément cliqué
                item.classList.add('active');
            });
        });
    },

    initLogoClick() {
        // Retour à l'accueil en cliquant sur le logo/titre
        const logoLink = document.getElementById('logo-home-link');
        if (logoLink) {
            logoLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Retirer la classe active de tous les éléments de navigation
                const navItems = document.querySelectorAll('.nav-item');
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // Ajouter la classe active à l'élément Accueil
                const homeNav = document.getElementById('nav-item-home');
                if (homeNav) {
                    homeNav.classList.add('active');
                }
                
                // Charger la page d'accueil
                pokemon.load();
            });
        }
    }
};

document.addEventListener("DOMContentLoaded", app.init);