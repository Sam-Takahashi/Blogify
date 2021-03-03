<template>

  <v-row class="ma-3">
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          light
          v-bind="attrs"
          v-on="on">
        <v-icon left>mdi-exit-to-app</v-icon>
        <span>Sign Up</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Sign up Form</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email"
                  v-model="email"
                  required>
                </v-text-field>

              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Create Password"
                  v-model="password"
                  type="password"
                  required
                ></v-text-field>
                <v-row justify="center">
                   <div class="text-caption red--text text--lighten-2 mt-3">{{ errors }}</div>
                </v-row>  
              </v-col>
            </v-row>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click.prevent="signUp(),
            dialog = false"
          >
            SIGN UP
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth';


export default {
    data: () => ({
      dialog: false,
      email: '',
      password: '',
      errors: ''
    }),
     methods: {
      // log in user
     async signUp(){
       try{
        const user = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        // console.log(user)
        user
        this.$router.replace({name: "showBlogs"});
       }catch(err){
        this.errors = err.message;
       }
     
      }
    }
}
</script>

<style>

</style>