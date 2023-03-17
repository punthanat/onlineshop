<template>
    <div class="mx-auto">
        <div v-if="!isEdit" class="text-white pb-20">
            <div class="grid grid-cols-1 lg:grid-cols-4 ml-2 md:ml-8">
                <div class="col-span-1 lg:col-span-2">
                    <div class="text-left ml-8 pt-12">
                        <h1 class="text-2xl  sm:text-3xl md:text-6xl py-1">
                            <b>{{ viewProduct.name }}</b>
                        </h1>
                        <h1 class="text-base sm:text-xl pb-8">{{ viewProduct.price }} THB</h1>
                        <base-button
                            class="border border-black mb-2 mr-2"
                            labels="EDIT"
                            @btn-click="isEdit = true"
                        />
                        <base-button
                            class="border border-black"
                            @btn-click="deleteProduct"
                            bordercolor="border-redpastel"
                            bgcolor="bg-redpastel"
                            hover="hover:bg-redpastel-dark hover:border-redpastel-dark"
                            labels="DELETE"
                        />

                        <h1 class="pt-12 md:py-1 my-3">
                            Color
                            <span
                                v-for="color in viewProduct.color"
                                :key="color.id"
                              
                            >
                                <span
                                    class="pr-5 md:pr-10 py-1 md:py-2 mr-2 ml-2 rounded  mt-1"
                                    v-bind:style="{ backgroundColor: color.colorCode }"
                                ></span>
                               
                        </span>
                        </h1>

                        <h1 class="text-sm sm:text-base py-1">brand : {{ viewBrandName }}</h1>
                        <h1 class="text-sm sm:text-base py-1 mb-4">manufacture date : {{ viewProduct.manufactureDate }}</h1>
                    </div>
                </div>

                <div class="col-span-1 pt-40 pl-16 lg:col-span-2 pr-12 lg:pt-8 lg:mt-24">
                    <img
                        :src="setImage"
                        class="ml-16 -mt-8 md:mt-8 w-36 h-40 md:w-72 md:h-auto lg:w-96 md:mx-auto pb-8 rounded"
                    />
                </div>

                <div
                    class="col-span-5 lg:col-span-4 text-left mr-10"
                    style="border-color:white; border-width : 2px 0px 0px 0px;"
                >
                    <h1 class="text-3xl pt-5">Product Information</h1>
                    <div class="grid grid-cols-1 lg:grid-cols-3 pt-5 pb-3">
                        <h1 class="my-2 underline lg:no-underline text-xl col-span-1">DESCRIPTION</h1>
                        <span class="my-2  text-base  col-span-2 overflow-x-scroll md:overflow-x-visible">{{ viewProduct.description }}</span>
                        <h1
                            class="my-2 underline lg:no-underline text-xl col-span-1 mt-2"
                        >MANUFACTURE DATE</h1>
                        <h1 class="my-2 text-l col-span-2 mt-2">{{ viewProduct.manufactureDate }}</h1>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="isEdit">
            <addEditProduct
                :viewProduct="viewProduct"
                :colors="colors"
                :isEdit="isEdit"
                :brands="brands"
                :products="products"
                :imageUrl="imageUrl"
                @edited="refreshViewProduct"
                @cancel-edit="refreshViewProduct"
            />
        </div>
    </div>
</template>



<script>
import router from '../router';
import AddEditProduct from './AddEditProduct.vue';
export default {
    components: {
        AddEditProduct
    },
    props: ["products", "brands", "colors","imageUrl"],
    data() {
        return {
            viewProduct: [],
            notFoundHook: [],
            viewBrandName: "",
            isEdit: false,
        }
    },
    methods: {
       async refreshViewProduct(){
            this.isEdit = false;
            this.viewProduct = await this.fetchByProduct();
            this.viewBrandName = this.viewProduct.brand.name;
        },



        async deleteProduct() {
            const res = await fetch(`${process.env.VUE_APP_API_URL}/products/${this.viewProduct.productId}`, {
                method: 'DELETE'
            })
            if(res.status == 200){
            this.viewProduct = [];
            router.push("/ProductList")
        }
        },
        async fetchByProduct(){
            
      const res = await fetch(`${process.env.VUE_APP_API_URL}/products/${this.$route.params.productId}`);
      const data = await res.json();
      if(res.status != 200){
        router.push('/NotFoundPage')

      }
      return data;
  

        },


    },
    computed: {

        setImage() {
            var index = this.products.findIndex(f => f.productId == this.$route.params.productId)
            if (index != -1) {
                return `${this.imageUrl}${this.products[index].imageName}`;
            }
            else {
                return "";
            }
        }

    },

  async mounted() {
        this.viewProduct = await this.fetchByProduct();
      
    },
    beforeUpdate(){

          this.viewBrandName = this.viewProduct.brand.name;
    }
  

}




</script>


