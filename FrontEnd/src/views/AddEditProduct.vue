<template>
    <div class="max-h-screen">
    <container class="shadow-2xl rounded bg-gray-300">
   
        <form @submit.prevent>
           <div class="grid grid-cols-1 md:grid-cols-2">
            <h1 v-if="!isEdit" class="text-6xl text-left ml-12 mt-12 mb-12 text-gray-200 col-span-2 head" style="text-shadow : 3px 3px gray ">New Product</h1>
            <h1 v-if="isEdit" class="text-6xl text-left ml-12 mt-12 mb-12 text-gray-200 col-span-2 head" style="text-shadow : 3px 3px gray ">Editing Product</h1>


            <div class="pt-2 text-left text-white col-span-2">
                <img v-if="!isEdit" :src="image || require('../assets/noimage.png') " class="w-auto h-60 mx-auto rounded mb-4"/>
                <img v-if="isEdit" :src="image || `${imageUrl}${viewProduct.imageName}`  " class="w-auto h-60 mx-auto rounded mb-4"/>
                <h1 class="ml-12 mt-10">Image File <b v-if="!isEdit" class="text-red-600 text-xl" >*</b></h1>
                <input type="file" id="imageFile" class= "ml-12 mb-2 " @change="uploadImageFile($event)" multiple accept=".jpg, .jpeg, .png" />
                <h1
                    v-if="errors.indexOf('noPic') !== -1"
                    class="text-red-600 ml-12"
                >Please Select Photo</h1>
                <h1
                v-if="errors.indexOf('invalidFile') !== -1"
                class="text-red-600 ml-12"
            >Please use jpg or png file</h1>
            </div>


            <div class="pt-2 text-left ml-12 mb-2  col-span-2 ">
                <label for="name" class="text-white">Name <b class="text-red-600 text-xl" >*</b> </label><br /><input type="text" class= "shadow-md py-1" style="width : 40% " v-model="formdata.name"/>
                <h1
                    v-if="errors.indexOf('noName') !== -1"
                    class="text-red-600"
                >Please Enter Name 2-20 Character</h1>
                <h1
                    v-if="errors.indexOf('have') !== -1"
                    class="text-red-600"
                >Already Have this Product</h1>
            </div>
            <div class="pt-2 text-left ml-12 mb-2  col-span-2 ">
                <label for="name" class="text-white">Description <b class="text-red-600 text-xl" >*</b> </label><br />
                <textarea
                    type="text"
                    v-model="formdata.description"
                    class=" w-48 align-top shadow-md py-1"
                    rows="3"
                    cols="20"
                    style="width : 40% "
                />
                <h1
                    v-if="errors.indexOf('noDes') !== -1"
                    class="text-red-600"
                >Please Enter Description 5 up to 70 character</h1>
            </div>
            <div class="pt-2 text-left ml-12 mb-2  col-span-2 text-white" >
                <label>Colors <b class="text-red-600 text-xl" >*</b></label>
                <span v-for="color in colors " :key="color.id">
                    <label for="color" class="ml-2 pr-8 py-1"  v-bind:style="{ backgroundColor : color.colorCode }"></label>
                    <input
                        type="checkbox"
                        class="w-6 h-7 ml-2 mr-3  align-middle shadow-md  rounded"
                        v-model="formdata.color"
                        :value="{ colorId : color.colorId, colorCode : color.colorCode}"
                    />
                </span>
                <h1 v-if="errors.indexOf('noColor') !== -1" class="text-red-600">Please Select Color</h1>
            </div>

            <div class="pt-2 text-left ml-12 mb-2 col-span-2 md:col-span-1 ">
                <label for="brand" class="text-white">Brand <b class="text-red-600 text-xl" >*</b> </label><br />
                <select name="brand" v-model="formdata.brand" class="shadow-md py-1">
                    <option
                        v-for="brand in brands"
                        :value="brand"
                        :key="brand.brandId"
                        
                    >{{ brand.name }}</option>
                </select>

                <h1 v-if="errors.indexOf('noBrand') !== -1" class="text-red-600">Please Select Brand</h1>
            </div>

            <div class="pt-2 text-left ml-12 mb-2  col-span-1   ">
                <label for="price" class="text-white">Price <b class="text-red-600 text-xl" >*</b> </label><br />
                <input type="text" v-model="formdata.price" style="width : 85%" class="shadow-md py-1" />
                <h1
                    v-if="errors.indexOf('noPrice') !== -1"
                    class="text-red-600"
                >Please Enter Price between 1 to 999999.99</h1>
                <h1
                    v-if="errors.indexOf('noPrice') !== -1"
                    class="text-red-600"
                >and cant have more than 2 decimal</h1>
            </div>

            <div class="pt-2 text-left ml-12  col-span-2 ">
                <label for="manufactureDate" class="text-white">Manufactor Date <b class="text-red-600 text-xl" >*</b> </label><br />
                <input type="date" v-model="formdata.manufactureDate" class="shadow-2xl py-1" />
                <h1 v-if="errors.indexOf('noDate') !== -1" class="text-red-600">Please Enter Date</h1>
            </div>

            
            <base-button
                v-if="!isEdit"
                value="Submit"
                class="border border-gray-600 mt-8 col-span-2 mb-12 mx-auto text-white" 
                @btn-click="submitForm" labels="SUBMIT" bgcolor="bg-greenpastel" bordercolor="border-greenpastel" hover="hover:bg-green-600 hover:border-greenpastel-dark"
            />
            <div class= "col-span-2 mt-12">
            <base-button v-if="isEdit" @btn-click="this.$emit('cancel-edit')" class="border border-gray-600  mb-12 mx-auto text-white" bordercolor="border-redpastel" bgcolor="bg-redpastel" hover="hover:bg-redpastel-dark hover:border-redpastel-dark" labels="CANCEL EDIT"/>
            <base-button v-if="isEdit" class="border border-gray-600 mt-2 mb-12 mx-auto  ml-2 text-white" @btn-click="editForm" labels="SUBMIT EDIT" bgcolor="bg-greenpastel" bordercolor="border-greenpastel" hover="hover:bg-green-600 hover:border-greenpastel-dark"/>
        </div>

        </div>
        </form>
  

</container>

</div>
</template>


<script>
    import router from '../router';
export default {
    props: ["products", "brands", "colors", "viewProduct", "isEdit","imageUrl"],
    data() {
        return {
            errors: [],
            uploadFile : null,
            image:"",
            formdata: {
                productId : null,
                imageName : null,
                name: null,
                description: null,
                color: [],
                price: null,
                brand: {},
                manufactureDate: null,
            },
        }
    },
    methods: {
        uploadImageFile(event){
            var input = event.target
            
           this.formdata.imageName  = input.files[0].name;
            if(input.files && input.files[0]){
                this.uploadFile = input.files[0]
                var reader = new FileReader();
                reader.onload = (e) => { this.image = e.target.result; } 
                reader.readAsDataURL(input.files[0])

            }        
        },



        refreshForm() {    
                this.image = ""
                this.uploadFile= null
                this.formdata.productId = null
                this.formdata.imageName = null
                this.formdata.name = ""
                this.formdata.description = null
                this.formdata.price = null
                this.formdata.brand = null
                this.formdata.manufactureDate = null
                this.formdata.color = []
        },
      async submitForm() {
            if (!this.isEdit) {
                
                this.validate();
                if (this.errors.length > 0) {
                    return;
                }
                if(this.products.length > 0){
                    this.formdata.productId = this.products[this.products.length-1].productId +1;
                    }
                    else{
                        this.formdata.productId = 1;
                }
               
                const blob = new Blob([JSON.stringify(this.formdata)], {
                    type: 'application/json'
                })

                const formData = new FormData(); 
                formData.append('imageFile',this.uploadFile);
                formData.append('product',blob);
               
                const res =  await fetch(`${process.env.VUE_APP_API_URL}/products/add`, { 
                    method: 'POST',
                    body: formData 
                })
            
                if(res.status == 200){

                router.push('/')
                }
                 
            }
        },


        async editForm() {
            this.validate();
            if (this.errors.length > 0) {
                return;
            }
            const blob = new Blob([JSON.stringify({
                    productId : this.formdata.productId,
                    imageName :this.formdata.imageName,
                    name: this.formdata.name,
                    description: this.formdata.description,
                    color: this.formdata.color,
                    price: this.formdata.price,
                    brand: this.formdata.brand,
                    manufactureDate: this.formdata.manufactureDate,
                })], {
                    type: 'application/json'
                })

                const formData = new FormData(); 
                if( this.uploadFile !== undefined){
                formData.append('imageFile',this.uploadFile);
            }
                formData.append('product',blob);

            const res=  await fetch(`${process.env.VUE_APP_API_URL}/products/put/${this.formdata.productId}`, {
                method: 'PUT',
                body: formData 
             })
            if(res.status == 200){
                this.$root.refreshProduct();
                this.$emit('edited')

            }

        },
        validate() {
           
            this.errors = [];

            if(this.formdata.imageName == null){
                this.errors.push("noPic")
            }
            var checkFile = this.formdata.imageName.slice(this.formdata.imageName.length-4,this.formdata.imageName.length);
            if( checkFile!== '.jpg'&& checkFile !=='.png' && 
            this.formdata.imageName.slice(this.formdata.imageName.length-5,this.formdata.imageName.length) !== '.jpeg'
            ){
                this.errors.push("invalidFile");
            }
            if (this.formdata.name == null || this.formdata.name.length < 2 || this.formdata.name.length > 20) {
                this.errors.push("noName");
            }
            if (this.formdata.description == null || this.formdata.description.length > 70 || this.formdata.description.length < 5) {
                this.errors.push("noDes");
            }
            if (this.formdata.brand == null) {
                this.errors.push("noBrand");
            } 
            if(this.formdata.color.length == 0){
                this.errors.push("noColor")
            }
            if (this.formdata.manufactureDate == null) { this.errors.push("noDate"); }
            if (this.formdata.price == null) {
                this.errors.push("noPrice");
            } if (/^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/.test(this.formdata.price.toString()) == false || this.formdata.price.length > 9) {
                this.errors.push("noPrice");
            }
            if(this.formdata.price.toString().indexOf(".") >= 7 ){
                this.errors.push("noPrice")
            }
            if(this.formdata.price.toString().length >= 7 && this.formdata.price.toString().indexOf(".") == -1){
                this.errors.push("noPrice")
            }
            this.formdata.price = parseFloat(this.formdata.price)
            var index = []
            if(this.products.length > 0){
                if(this.products.length > 1 && !this.isEdit){
                if(this.products[this.products.length-1].name.replace(" ","").toLowerCase() == this.formdata.name.replace(" ","").toLowerCase()){
                    this.errors.push('have');
                    return ;
                }
            }
            for (let  i = 0 ;i < this.products.length-1 ; i++){ 
                if(index.length >= 2){break ;}
                if(this.products[i].name.replace(" ","").toLowerCase() == this.formdata.name.replace(" ","").toLowerCase()){
                    index.push( this.products[i].productId)
                }
            }
             if (this.isEdit) {
                 if(index.length == 1 & index[0] !== this.formdata.productId){
                    this.errors.push("have");
                 }
                if (index.length >=2 && index[0] !== index[1]) {
                    this.errors.push("have");
                }
            } 
            if (!this.isEdit &&index.length >= 1) {
                    this.errors.push("have");
                }
            }
        },

    },
   async mounted() {
        this.$root.refreshProduct();
        if (this.isEdit) {
            this.formdata = this.viewProduct;
           
        }else{
            this.refreshForm();}
       
    }







}
</script>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');



.head{
    font-family: 'Roboto', sans-serif;
}



</style>