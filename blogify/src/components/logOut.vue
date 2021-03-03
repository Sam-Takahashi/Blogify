<template>

<v-row class="ma-3">
    <v-btn @click.prevent="logOut" text color="sam" :class="{ display: loggedIn}">
        <v-icon left>mdi-logout</v-icon>
        <span>Log Out</span>
    </v-btn>
</v-row>

</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
 data() {
   return {
     loggedIn: false,
   }
 },
   methods: {
    async logOut(){
      try{
      await firebase.auth().signOut();
      
        this.$router.replace({ name: "dashboard"})
      }catch(err){
        console.log(err)
      }
    }
      
    }
}
</script>

<style>

</style>