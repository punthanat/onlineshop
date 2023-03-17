<template>
    <div class= "flex  mx-auto">
       <div v-for="(n,index) in reversePage" :key="n" class= "text-white flex-auto mx-2">
      <button class="border border-white bg-gray-900
      hover:bg-black focus:bg-black text-white
      px-2 py-2 md:mx-1" @click="clickPage(n)">  {{ index+1 }}</button>
       </div>

        
    </div>
</template>


<script>
export default {
    props:['totalPage','currentPage'],
    data(){
       return{ 
        reversePage:[]
    }
    },
    methods: {
        clickPage(pageSelect){
            this.$emit('change-page',pageSelect);
        }
    },
    beforeUpdate(){
        if( this.reversePage != [] && this.reversePage.length == this.totalPage){
            return ;
        }
        for(let i = this.totalPage-1 ; i >= 0 ; i--){
            if(this.reversePage.indexOf(i) === -1 ){     
                 this.reversePage.push(i)}
      }  
      
    }

}
</script>



