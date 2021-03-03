<template>
      <v-row class="ma-3">
      <v-dialog
        transition="dialog-top-transition"
        max-width="600">
      
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            light
            v-bind="attrs"
            v-on="on">
            <v-icon left>mdi-account</v-icon>
            <span>Account Info</span>
            </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="grey lighten-1"
              dark>
            <v-icon left>mdi-account</v-icon>
            <span>Account Information</span>
           
            </v-toolbar>
            <v-card-text>
              <div class="text-h6 pt-8 px-12">Logged in as:</div>
              
              <div class="text-h5 py-3 px-12 green--text text--lighten-2">
                <v-icon color="green lighten-2">mdi-account-check-outline</v-icon>
                 {{ email }}</div>

              <div class="text-h5 py-3 px-12 red--text text--lighten-2">
                <v-icon color="red lighten-2">
                 {{ userAdmin ? 'mdi-account-star-outline' : '' }}</v-icon>
                 {{ userAdmin ? 'Admin' : '' }}</div>
                 
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-row>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';



export default {
  mounted() {
     firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // when logged in
            user.getIdTokenResult().then(idTokenResult => {
                        user.admin = idTokenResult.claims.admin;
                     if (user.admin) {
                        //  if logged in user is an admin
                    this.userAdmin = true;
                    }

                  this.email = user.email
                })
                      
        } else {
            //  when logged out
            // console.log('user logged out');
            // account info
              this.email = '';
              this.userAdmin = false;
        }
    });
  },
 data() {
   return {
     loggedIn: false,
     email: true,
     userAdmin: false,
   }
 }
}
</script>

<style>

</style>