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
        <v-icon left>mdi-login</v-icon>
         <span>Login</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
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
                  label="Enter Password"
                  v-model="password"
                  type="password"
                  required>
                  </v-text-field>
                  <v-row justify="center">
                    <div class="
                    text-caption 
                    red--text 
                    text--lighten-2 
                    mt-3">{{ errors }}</div>
                  </v-row>

                 
              </v-col>
            </v-row>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <!-- RESET password -->
          <v-btn 
          text 
          @click="resetPassword"
          class="
          blue--text 
          text--lighten-2 
          font-weight-regular 
          caption" >
            Forgot password?
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :loading="loading"
            :disabled="loading"
            @click.prevent="
            login(), 
            dialog = false,
            loader = 'loading'">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    data: () => ({
      dialog: false,
      email: '',
      password: '',
      errors: '',
      loader: null,
      loading: false,
    }),

    methods: {
      async login(){
        try{
          const val = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          // console.log(val);
          val
          this.$router.replace({ name: "showBlogs"})
          
          }catch(err){
            this.errors = err.message;           
          }
        },

        resetPassword(){
          const auth = firebase.auth();
          const email = this.email;
          // console.log(email)
          email
          if(email != ""){
            auth.sendPasswordResetEmail(email).then(function() {
              window.alert('Email has been sent to you, please check and verify.')

            }).catch(function(error){  

              var errorMessage = error.message;
              window.alert(errorMessage);

            })
          } else {
            window.alert('Please write your email first.')
          }
        }

      }


     
}

</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>