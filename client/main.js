import './style.css'
import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';

import App from './src/app.js';

window.Alpine = Alpine;

Alpine.plugin(persist);

Alpine.data('movies', App);

Alpine.start();
