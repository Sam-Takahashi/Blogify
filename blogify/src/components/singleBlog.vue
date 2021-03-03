<template>
  <div class="contain">
      <v-card elevation="0" tile class="ma-5">

<!-- ---------------- edit start ----------------------------------------------------------- -->
 <v-row 
 justify="space-around" 
 v-show="onlyAdmin"
 class="mb-5">

<v-col>
    <router-link 
      to="/showBlogs"
      style="text-decoration: none;">
     <v-btn depressed class="primary--text">
        <v-icon left color="primary">mdi-arrow-left-bold</v-icon>
        return
     </v-btn>
    </router-link>
</v-col>

    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="1000"
        persistent
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
             @click="startEdit(blog)"
            v-on="on">
            <v-icon left>mdi-pencil-outline</v-icon>
            Edit</v-btn>
        </template>


        <template v-slot:default="dialog">
          <v-card>

          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Title"
                  required
                  v-model="blog.title"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Content"
                  type="text"
                  required
                  auto-grow
                  v-model="blog.content"
                ></v-textarea>
              </v-col>
                 <!-- select box -->
          <v-card elevation="0">
              <v-row>
                  <v-col cols="12">
                        <!-- <label>Author:</label> -->
                        <v-select
                        :items="items" 
                        outlined
                        dense
                        chips
                        small-chips
                        v-model="blog.author" 
                        label="Choose Author"></v-select>
                  </v-col>
              </v-row>
           </v-card>
            </v-row>

       <v-row wrap>
                <v-col cols="6" md="3">   
                <v-checkbox 
                    v-model="blog.category"
                    label="Soccer"
                    value="Soccer"></v-checkbox>
                </v-col>
                <v-col cols="6" md="3">   
                <v-checkbox 
                    v-model="blog.category"
                    label="Baseball"
                    value="Baseball"></v-checkbox>
                </v-col>
                <v-col cols="6" md="3">   
                <v-checkbox 
                    v-model="blog.category"
                    label="Basketball"
                    value="Basketball"></v-checkbox>
                </v-col>
                <v-col cols="6" md="3">   
                <v-checkbox 
                    v-model="blog.category"
                    label="Golf"
                    value="Golf"></v-checkbox>
            </v-col>               
          </v-row>
        </v-container>
      </v-card-text>
    
<!-- edit controls -->
            <v-card-actions class="justify-end">
              
              <v-btn
                text
                @click="dialog.value = false"
              >Cancel</v-btn>
              <v-btn
                text
                color="primary"
                @click="
                editBlog(), 
                dialog.value = false">
                <v-icon left>mdi-pencil-outline</v-icon>
                Edit</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>





<!-- ---------------- delete start ----------------------------------------------------------- -->
    <v-col cols="auto">
      <v-dialog
        transition="dialog-top-transition"
        max-width="350"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="error"
             @click="startEdit(blog)"
            v-bind="attrs"
            v-on="on">
            <v-icon left>mdi-trash-can-outline</v-icon>
            Delete</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
          
          <v-card-title class="headline white--text" style="background: #FF5252;">
          Are you sure?
        </v-card-title>
        <v-card-text class="pt-5">Deleting will permanently remove this blog.</v-card-text>
        <v-card-actions class="justify-end">
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="dialog.value = false"
          >Cancel</v-btn>

<router-link to="/showBlogs/"  style="text-decoration: none; color: inherit;">
          <v-btn
            color="error"
            text
            @click="
            adminDelete(),
            dialog.value = false">
            <v-icon left>mdi-trash-can-outline</v-icon>
            Delete</v-btn>
</router-link>
        </v-card-actions>

          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
     


         



<!-- Display Blog content -->
        <v-card-title>{{ blog.title }}</v-card-title>
        <v-card-text>{{ blog.content }}</v-card-text>

        <v-card-text>
           <v-row class="mb-3 mt-1 ml-0" >
                <span class="red--text text--lighten-3">Category: </span>
              <ul class="pl-1" v-for="sport in blog.category" :key="sport.name">
                  <li >{{ sport }}</li>
              </ul>
         
            </v-row>


         <p class="red--text text--lighten-3">Author: <span class="black--text">{{ blog.author }}</span> </p>
        </v-card-text>
           

           
      </v-card>


    <v-card 
     class="pa-md-2 mx-lg-auto justify-center text-center"  
     elevation="0"
     v-if="!onlyAdmin">
      <router-link 
        to="/showBlogs"
        style="text-decoration: none;">
            
          <v-btn depressed class="primary--text">
            <v-icon left color="primary">mdi-arrow-left-bold</v-icon>
            Return
          </v-btn>

      </router-link>
    </v-card>
  </div>
</template>

<script>
import db from '@/main'
import 'firebase/auth';
import firebase from 'firebase/app';

export default {
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
created() {
    let ref = db.collection('blogs').doc(this.$route.params.id)
    ref.get()
    .then(snapshot => {  //DocSnapshot
        if (snapshot.exists) {
            this.blog = snapshot.data()
        } else {
            // snapshot.data() will be undefined in this case
            console.log("No such document!");
        }  
    })  
},

 data(){
     return {
         id: this.$route.params.id,
         blog: {
             title:null,
             content:null,
             category:null,
             author:'',
            
         },
         items: ['Sam', 'Terauchi', 'Hassan'],
         dialog: false,
         activeItem:null,
         onlyAdmin: false,
     }
 },
// By doing let ref = db.collection('post').doc(this.$route.params.id) you get a DocumentReference as detailed in the documentation here.
// Then by doing get() on this DocumentReference you get a DocumentSnapshot, as detailed here, and not a QuerySnapshot.
// So you should get the doc data via the data() method (or the get(<field>) to get a specific field) and not by doing snapshot.forEach(doc => {}) which should be used on a QuerySnapshot.


methods: {
    startEdit(){
        let ref = db.collection('blogs').doc(this.$route.params.id)
            ref.get()
            .then(snapshot => {  //DocSnapshot
                if (snapshot.exists) {
                    let blog = snapshot.id
                    // let blog = snapshot.data()
                    // console.log(blog)
                    this.activeItem = blog;
                } else {
                    // snapshot.data() will be undefined in this case
                    console.log("No such document!");
                }  
            })
    },

    editBlog() {
        
        db.collection('blogs')
        .doc(this.activeItem)
        .update(this.blog)
        .then(function() {
           
            console.log('Document successfully updated!!!!')
        }).catch(function(error) {
            console.log('Error updating document: ', error)
        })
      },

        adminDelete() {
            
          db.collection('blogs')
          .doc(this.activeItem)
          .delete(this.blog)
          .then(function() {

              console.log("Blog successfully deleted.");
          }).catch(function(error) {
              console.log('Error removing blog', error);
          })
        },

    }

}
</script>

<style >
.contain{
    width: 80%;
    margin: 0 auto;
    padding-top: 2rem;
}

   ul li{
        list-style: none;
        font-weight: 600;
    }
</style>