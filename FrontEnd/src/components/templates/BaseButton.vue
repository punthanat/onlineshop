<template>
    <button
        class="BaseButton"
        @click="sentVal"
        :class="[bordercolor, bgcolor, hover, txtcolor,paddingstyle]"
    >{{ labels }}</button>
</template>
<script>
export default {

    props: {
        labels: {
            type: String

        },
        bordercolor: {
            type: String,
            default: 'border-blue-500'
        },
        bgcolor: {
            type: String,
            default: 'bg-blue-500'
        },
        hover: {
            type: String,
            default: 'hover:bg-blue-600 hover:border-blue-600'
        },
        txtcolor: {
            type: String,
            default: 'text-white'
        },
        paddingstyle : {
            type: String,
            default : 'px-3 rounded py-1'

        }



    }
    ,
    methods: {
        sentVal() {
            this.$emit('btn-click', {
                labels: this.labels
            })

        }
    },
}
</script>