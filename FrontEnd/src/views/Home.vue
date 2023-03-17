<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 pb-20">
        <div class="grid-cols-1 md:col-span-2 text-white">
            <div class="text-left ml-12 mt-12 text-5xl blackShadow text-greenpastel">New Release Products</div>

            <div v-for="(product,index) in NewProduct.slice().reverse()" :key="index">
                <router-link  :to="{ name: 'Product', params: { productId: product.productId } }">
                <product-card class="mt-6 rounded mr-3 ml-6 text-black bg-gray-400">
                    <template v-slot:image><img class="w-36 h-36 ml-2 mt-2 rounded"  :src="`${imageUrl}${product.imageName}`"></template>
                    <template v-slot:productName ><h1 class="text-xl sm:text-2xl font-bold md:text-3xl ml-4 md:-ml-12">{{ product.name }}</h1></template>
                    <template v-slot:price><h1 class="ml-4 md:-ml-12">{{ product.price }} THB</h1></template>
                    <template v-slot:brand><h1 class="md:float-right md:-mt-14 ml-4 md:mr-4 text-base">by : {{ product.brand.name }}</h1></template>
                    <template v-slot:color>
                
                        <div  class="ml-4 md:-ml-12 mt-10 md:mt-14">
                        <span
                        v-for="color in product.color"
                        :key="color.id"
                        class=" md:mt-12"
                    >
                        <span
                            class="py-1 pr-3  rounded-full"
                            v-bind:style="{ backgroundColor: color.colorCode }"
                        ></span>
                    </span>
                </div>
                </template>

                
                </product-card>
                </router-link>
            
            </div>
        </div>
        <div class="col-span-1 text-white text-3xl mt-12 blackShadow">News

            <div class="pb-48 bg-gray-900 mt-8 rounded mx-8 text-white text-base pt-3 px-3">Hello we are SIT Student</div>

            <div class="pb-48 bg-gray-900 mt-4 rounded mx-8"> </div>


        </div>
    </div>
</template>

<script>
export default {
    props: ['products','imageUrl'],
    data() {
        
        return {
            NewProduct: []
        }
    }, methods: {
        setNewProduct() {
            if (this.products.length == 1) {
                this.NewProduct = this.products.slice(this.products.length - 1, this.products.length)
                return ;
            }
            if (this.products.length == 2) {
                this.NewProduct = this.products.slice(this.products.length - 2, this.products.length)
                return ;
            }
            else {
                this.NewProduct = this.products.slice(this.products.length - 3, this.products.length)
                return ;
            }

           
        }

    },
    mounted() { 
         this.$root.refreshProduct();
      
    },
    beforeUpdate() {
        if(this.products.length >= 1){
        this.setNewProduct();}
    }

}
</script>


<style>

.blackShadow {

    text-shadow : 3px 3px black;


}


    
</style>
