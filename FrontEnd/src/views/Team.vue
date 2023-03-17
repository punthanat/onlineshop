<template>
    <div class= "mx-auto bg-gray-300 pt-3 mt-6 max-w-3xl pb-20 rounded">    
        <h1 class= " text-6xl header text-redpastel">Our Team</h1>
        <h1 class= " text-l description"><b>INT 221 Integrated Project</b></h1>
        

        <member-template v-for="member in members" :key="member.name">
            <template v-slot:image><img class="w-36 h-36  mt-2 mx-auto rounded-full" :src="require(`../assets/member-images/${member.image}`)"></template>
            <template v-slot:memberName>{{ member.name }}</template>
            <template v-slot:role>{{ member.role }}</template>
            <template v-slot:studentId>{{ member.studentId }}</template>
        </member-template>

    </div>
    <div class="pb-20"/>
</template>


<script>
    import MemberTemplate from '../components/templates/MemberTemplate.vue';

export default {
components: {
    MemberTemplate
},  
data() {
    return {
        
        members: [
        {
            image: "member36.jpg",
            name : "Thanasit Eksoragul",
            role : "BackEnd / DevOps / Database",
            studentId : "62130500036",
        },
        {
            image: "member37.jpg",
            name : "Thanapat Suwannaard",
            role : "FrontEnd / Database",
            studentId : "62130500037",
        }, 
        {
            image: "member58.jpg",
            name : "Punthanat Ularnwiriyanont",
            role : "BackEnd / DevOps / Network",
            studentId : "62130500058",
        }
        ]

    }
},

}
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@1,300&display=swap');
.header {
    font-family: 'Bebas Neue', cursive;

}

.description{
    font-family: 'Roboto Condensed', sans-serif;
}



</style>


