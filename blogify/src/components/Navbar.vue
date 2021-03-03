<template>
  <nav>

<!-- SNACKBAR MSG -->
    <v-snackbar 
    v-model="snackus" 
    :timeout="4000" 
    top 
    color="sam">
        <span class="koi--text">Awesome! You added a new project.</span>
        <v-btn 
        text 
        @click="snackus = false"
        color="koi">Close</v-btn>
    </v-snackbar>

  <v-app-bar
  elevation="0" 
  text 
  class="color3">
  
      <!-- BURGER icon -->
      <v-app-bar-nav-icon 
      class="sam--text" 
      @click="drawer = !drawer"></v-app-bar-nav-icon>

<!-- LOGO text -->
    <v-toolbar-title class="text-uppercase sam--text">
        <span class="font-weight-light">BLOGIFY</span> 
        <span>APP</span> 
    </v-toolbar-title>
    
<v-spacer></v-spacer>

<v-row class="hidden-md-and-down">

    <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
            <span
            v-bind="attrs"
            v-on="on">
            <addAdmin v-show="onlyAdmin"/>
            </span>
        </template>
        <span class="white--text">管理者を追加</span>
        </v-tooltip>

    <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
            <span
            v-bind="attrs"
            v-on="on">
            <showBlogsBtn v-show="loggedIn"/>   
            </span>
        </template>
        <span class="white--text">すべてのブログを見る</span>
        </v-tooltip>

    <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
            <span
            v-bind="attrs"
            v-on="on">
            <signUp v-show="loggedOut"/>   
            </span>
        </template>
        <span class="white--text">サインアップ</span>
        </v-tooltip>

        <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
            <span
            v-bind="attrs"
            v-on="on">
            <account v-show="loggedIn"/>  
            </span>
        </template>
        <span class="white--text">アカウント情報</span>
        </v-tooltip>

    <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
            <span
            v-bind="attrs"
            v-on="on">
            <createBlog v-show="onlyAdmin"/>  
            </span>
        </template>
        <span class="white--text">ブログを作成する</span>
        </v-tooltip>

    <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
            <span
            v-bind="attrs"
            v-on="on">
            <logIn v-show="loggedOut"/>
            </span>
        </template>
        <span class="white--text">ログイン</span>
        </v-tooltip>

    <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
            <span
            v-bind="attrs"
            v-on="on">
            <logOut v-show="loggedIn"/>
            </span>
        </template>
        <span class="white--text">ログアウト</span>
    </v-tooltip>
 </v-row>
   

  </v-app-bar>





<!-- side bar menu -------------------------------------------------->
   <v-navigation-drawer 
   app 
   v-model="drawer" 
   temporary 
   class="color2">

<!-- side bar profile -->
       <v-row>
        <v-col class="mt-5 text-center">
            <v-avatar 
            size="100" 
            class="profile" >
            <img src="../assets/logo1.png">
            </v-avatar>
            <p class="sam--text subheading mt-1">VUE.JS</p>
        </v-col>
       </v-row>

<!-- <v-col>
  <Popup @projectAdded="snackus = true"></Popup>
</v-col> -->

       <v-list justify-center>
<!-- Drawer Menu -->
         <v-col class="ml-5 ">
             <!-- addAdmin only Admin -->
            <addAdmin d-none v-show="onlyAdmin"/>
            <signUp d-none v-show="loggedOut"/>
            <logIn d-none v-show="loggedOut"/>
            <showBlogsBtn d-none v-show="loggedIn"/>
            <account d-none v-show="loggedIn"/>
            <!-- createBlog only Admin -->
            <createBlog d-none v-show="onlyAdmin"/>
            <logOut d-none v-show="loggedIn"/>
         </v-col>
            
       </v-list>
   </v-navigation-drawer>    

 
  </nav>
</template>

<script>
// import Popup from './Popup'
import addAdmin from './AddAdmin'
import signUp from './signUp'
import account from './account'
import logOut from './logOut'
import createBlog from './createBlog'
import logIn from './logIn'
import showBlogsBtn from './showBlogsBtn'
import firebase from 'firebase/app';
import 'firebase/auth';


export default {
      data() {
      return {
          drawer: false,
          snackus: false,
          loggedOut: true,
          loggedIn: false,          
          onlyAdmin: false,          
      }
  },
    // lifecycle hook
    mounted(){
        // listen for auth status changes
        // Checking if user exits/is and ADMIN
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // check if user is admin
                    user.getIdTokenResult().then(idTokenResult => {
                        user.admin = idTokenResult.claims.admin;
                     if (user.admin) {
                        //  if logged in user is an admin
                    this.onlyAdmin = true;
                    }
                })

                // when logged in
                // console.log('user logged in: ', user)
                this.loggedOut = false;
                this.loggedIn = true;
                
            } else {
                //  when logged out
                // console.log('user logged out');
                this.loggedOut = true;
                this.loggedIn = false;
                this.onlyAdmin = false;
            }
        });

    },

 components: {
     signUp,
     account,
     logOut,
     createBlog,
     logIn,
     showBlogsBtn,
     addAdmin,
    //  Popup
 }
}

</script>

<style>

/* .color2{
    background-color: rgba(5, 5, 15, 0.808)!important;
}
.color3{
    background-color: rgba(9, 15, 29, 0.959)!important;
} */
</style>