<template>
 
  <nav-bar >
    <router-link to="/">
      <li class="liNav float-left">Home</li>
    </router-link>
    <router-link to="/AddProduct">
      <li class="liNav float-left">AddProduct</li>
    </router-link>
    <router-link to="/ProductList">
      <li class="liNav float-left">Products</li>
    </router-link>
    <router-link to="/Team">
      <li class="liNav float-left">Team</li>
    </router-link>
  </nav-bar>

<div class="bg-gray-900 pt-5 -mt-6 w-full h-screen overflow-auto">

  <container>
    <content-bar ></content-bar>
    
  <router-view
    :products="products"
    :imageUrl="imageUrl"
    :colors="colors"
    :brands="brands"
  />
  

</container>
</div>
</template>

<script>
import NavBar from './components/UI/NavBar.vue'
import ContentBar from './components/UI/ContentBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,ContentBar
  },
  data() {
    return {
      products: [],
      brands: [],
      colors: [],
      productsUrl: `${process.env.VUE_APP_API_URL}/products`,
      colorUrl: `${process.env.VUE_APP_API_URL}/colors`,
      brandUrl: `${process.env.VUE_APP_API_URL}/brands`,
      imageUrl : `${process.env.VUE_APP_API_URL}/getImage/`,
    }
  },


  methods: {

    async refreshProduct() {
      this.products = await this.fetchProducts();
    },
    async fetchProducts() {
      const res = await fetch(this.productsUrl);
      const data = await res.json();
      return data;
    }, 
    async fetchBrand() {
      const res = await fetch(this.brandUrl);
      const data = await res.json();
      return data;
    },
    async fetchColors() {
      const res = await fetch(this.colorUrl);
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.products = await this.fetchProducts();
    this.brands = await this.fetchBrand();
    this.colors = await this.fetchColors();
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>