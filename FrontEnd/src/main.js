import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import Container from './components/templates/Container.vue';
import ProductCard from './components/templates/ProductCard.vue';
import BaseButton from './components/templates/BaseButton.vue';       

const app = createApp(App)

app.component('base-button',BaseButton)
app.component('product-card',ProductCard)
app.component('container',Container)
app.use(router).mount('#app')
