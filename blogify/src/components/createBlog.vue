<template>
<v-row class="ma-3">
 <router-link to="/addBlogs/"  style="text-decoration: none; color: inherit;">
     <v-btn text color="sam" :class="{ display: adminMenu}" @click="adminMenu = !adminMenu">
       <v-icon left>mdi-pencil</v-icon>
        <span>Create Blog</span>
        
    </v-btn>
    </router-link>
</v-row>
    
</template>

<script>
export default {
 data() {
   return {
     adminMenu: false,
   }
 }
}
</script>

<style>

</style>