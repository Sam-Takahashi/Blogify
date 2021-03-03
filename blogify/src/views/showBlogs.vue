<template>
<div class="container2">
    
   <v-row justify="center" class="{'ma-0': $vuetify.breakpoint.smAndDown, 'ma-5': $vuetify.breakpoint.mdAndUp}">
       <!-- page  title -->
       <h1 class="my-5 ml-4 ">All Blog Articles</h1>
       <v-spacer></v-spacer>
       <!-- search bar -->
       <v-text-field 
       label="search blogs" 
       v-model="search" 
       class="mx-4 mt-5">    
        <v-icon
        slot="append"
        color="grey">
        mdi-magnify
        </v-icon>
      </v-text-field>

       <!-- Blog list OUTPUT-->
        <v-expansion-panels popout>
            <v-expansion-panel 
            v-for="(blog) in filteredBlogs" 
            :key="blog.id">

                <v-expansion-panel-header>
                    {{ blog.title }}
                    <v-spacer></v-spacer>

<!---- Admin only functions -->
                    <v-row 
                    justify="end" 
                    class="mr-2" 
                    v-show="onlyAdmin">
                        <router-link 
                        v-bind:to="/blog/ + blog.id" 
                        style="text-decoration: none; color: red;">
                        <!-- edit -->
                        <v-btn 
                        text
                        color="primary lighten-1">
                            <v-icon left>mdi-file-document-edit-outline</v-icon>
                            Edit
                        </v-btn>
                         </router-link> 
                        <!-- delete -->
                        
                        <!-- <v-btn 
                        icon 
                        color="pink"
                        @click="
                        removeUI(index), 
                        adminDelete(blog.id)">
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn> -->
                        
                    </v-row>
<!---------------------------->
                    </v-expansion-panel-header>
               
             <router-link 
             v-bind:to="/blog/ + blog.id" 
             style="text-decoration: none; color: grey;">
                <v-expansion-panel-content >
                    {{ blog.content | snippet }} <span style="color: #2196F3;">read more</span>
                    <v-icon color="#2196F3">mdi-chevron-right</v-icon>
                </v-expansion-panel-content>
             </router-link> 
             
            </v-expansion-panel>
        </v-expansion-panels>
<!-- 
          <div class="text-center">
            <v-pagination
            v-model="blogs"
            :length="6"></v-pagination>
          </div> -->

          <!-- Confimation box -->

    </v-row>
</div>
 


</template>

<script>
import searchMixin from '../mixin/searchMixin'
import db from '@/main'
import 'firebase/auth';
import firebase from 'firebase/app';
// import {functions} from '../main';

export default {
   data: () => ({
       blogs: [],
       show: false,
       search: '',
       Edit: '',
       Delete: '',
       onlyAdmin: false,
    }),

    created() {
        db.collection('blogs').onSnapshot(res => {
          const changes = res.docChanges();
          
          changes.forEach(change => {
              if (change.type === 'added'){
                  this.blogs.push({
                      ...change.doc.data(),
                      id: change.doc.id
                  })
              } else if (change.type == 'removed'){
                console.log('removed blog')
                // reload page(not ideal)
                // this.$router.go()
              }
          })
        })
    },
       // lifecycle hook
    mounted(){
        // listen for auth status changes
        // Checking if user exits/is and ADMIN so i can un-show the edit button
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
               
                
            } else {
                //  when logged out
                // console.log('user logged out');
            
            } 
        });

    },
   
    methods: {
  

    },
    mixins: [searchMixin]
    
}
</script>

<style scoped>
@media only screen and (min-width: 992px){
.container2{
        width: 80%;
        margin: 0 auto;
    }
}
    
    .dot{
        list-style: none;
    }
    .v-expansion-panel-content__wrap:hover{
        background: rgb(230, 230, 230);
        padding-top: .5rem;
        transition: .5s ease-in-out
    }
</style>