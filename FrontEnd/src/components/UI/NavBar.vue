<template>
    <ul class="ulNavBar z-10 sm:text-base md:text-l" :class="[bgColor,position]">
        <slot></slot>
    </ul>
</template>


<script>
export default {
    props:{
        bgColor:{
            type: String , 
            default : 'bg-black'
        },

        position:{
            type :String,
            default : 'top-0'
        }


    }




}
</script>