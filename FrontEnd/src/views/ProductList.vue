<template>
    <h1 class="text-4xl md:text-6xl text-redpastel-dark mb-12 mt-12" style="text-shadow : 3px 3px black"><b>All Products We have</b></h1>
    <div class= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">


   
    <page-control class= "col-span-1 md:col-span-2" :currentPage="currentPage" :totalPage="totalPage" @change-page="clickPage"></page-control>

    <div class=" mx-2 col-span-1" v-for="product in productPage.slice().reverse()" :key="product.id">
    <router-link  :to="{ name: 'Product', params: { productId: product.productId } }">
        <product-card class="mt-6 rounded pr-24 bg-gray-400 text-black">
            <template v-slot:image><img class="w-36 h-36 ml-2 mt-2 rounded" :src="`${imageUrl}${product.imageName}`"></template>
            <template v-slot:productName><h1 class="ml-8" style="border-style: solid;
                border-color : #2c3e50;
                z-index : 3;
                border-width : 0px 0px 2px 0px; width:100%;"><b>{{ product.name }}</b></h1></template>
            <template v-slot:price><h1 class="ml-8">{{ product.price }} THB</h1></template>
            <template v-slot:brand><h1 class="ml-8 text-sm">by : {{ product.brand.name }}</h1></template>
            <template v-slot:color>
                
                <div  class="ml-8 mt-8">
                <span
                v-for="color in product.color"
                :key="color.id"
                class="mt-12"
            >
                <span
                    class="py-1 pr-3  rounded-full"
                    v-bind:style="{ backgroundColor: color.colorCode }"
                ></span>
            </span>
        </div>
        </template>



        </product-card>

        </router-link></div>
<div v-if="this.productPage.length <= 2" class="pb-48"></div>
    </div>
</template>



<script>
    import PageControl from '../components/UI/PageControl.vue'
export default {
    components:{
        PageControl

    },
    props: ["products","imageUrl"],

    data() {
        return {
            currentPage: 0 ,
            pageSize : 4,
            totalPage : 0,
            sortBy : "productId",
            productPageUrl: `${process.env.VUE_APP_API_URL}/products/page?pageNo=`,
            productPage:[],
        }
    },methods: {

       async clickPage(pageSelect){
            this.currentPage = pageSelect ;
            this.productPage = await this.fetchPage();
        },

     async fetchPage(){
     const res = await fetch(this.productPageUrl+this.currentPage+"&&pageSize="+this.pageSize+ "&&sortBy="+this.sortBy);
     const data = await res.json();
     return data;
    }


    },



    async mounted() {
        this.$root.refreshProduct();
        this.productPage = await this.fetchPage();
        if(this.totalPage  == 0 ){
        if (this.products.length%this.pageSize !== 0){
            this.totalPage = parseInt(this.products.length/this.pageSize+1);
        }else if(this.products.length%this.pageSize == 0){
            this.totalPage = this.products.length/this.pageSize;
        }
        if(this.products.length < this.pageSize ){
            this.totalPage = 1;    
        }   
        this.currentPage = this.totalPage-1;
        this.productPage = await this.fetchPage();
    }

    }, 
    
    




     




    




}
</script>