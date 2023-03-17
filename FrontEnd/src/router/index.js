import { createRouter, createWebHistory } from 'vue-router'

import Team from '../views/Team.vue'
import ProductList from '../views/ProductList.vue'
import AddEditProduct from '../views/AddEditProduct.vue'
import ViewProduct from '../views/ViewProduct.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Team',
        name: 'Team',
        component: Team
    },
    {
        path: '/ProductList',
        name: 'ProductList',
        component: ProductList
    },
    {
        path: '/AddProduct',
        name: 'AddEditProduct',
        component: AddEditProduct
    },
    {
        path: '/Product/:productId',
        name: 'Product',
        component: ViewProduct
    },
    {
        path: '/:catchNotMatchPath(.*)',
        name: 'PageNotFound',
        component: PageNotFound
      }





]



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
  export default router