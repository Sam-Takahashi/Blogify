<template>
<div class="contain">
     <v-container class="size">

          <!-- FORM -->
      <v-form 
      v-if="!submitted"
      ref="form">
          <h2 class="mb-5">Add New a Blog</h2>
          <!-- title -->
          <v-text-field 
          :rules="inputRules"
          label="Blog Title" 
          placeholder="write something"
          v-model.lazy="blog.title"></v-text-field>

          <!-- content -->     
          <v-textarea 
          :rules="inputRules"
          label="Blog Content" 
          auto-grow 
          placeholder="write something"
          v-model.lazy="blog.content"></v-textarea>

          <!-- checkbox -->
           <v-card 
           elevation="0" 
           class="mt-3">
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

          <!-- select box -->
          <v-card elevation="0">
              <v-row>
                  <v-col cols="12" md="6">
                        <label>Author:</label>
                        <v-select
                         :items="items" 
                         v-model="blog.author" 
                         label="Choose Author"></v-select>
                  </v-col>
              </v-row>
           </v-card>
         </v-card>

         <!-- SUBMIT to firebase btn -->
         <v-btn @click.prevent="submit">Add Blog</v-btn>
      </v-form>

      <!-- after submitted -->
      <v-card 
      class="pa-md-2 mx-lg-auto justify-center text-center"  
       
      elevation="0"
      v-if="submitted">
          <v-card-text >
              <h2>Thank you for adding a post!</h2>
          </v-card-text>

          <router-link 
            to="/showBlogs"
            style="text-decoration: none;">
            
            <v-btn depressed class="primary--text">
                <v-icon left color="primary">mdi-arrow-left-bold</v-icon>
                Return</v-btn>
          </router-link>
      </v-card>
    

    <!-- preview -->
    <div id="preview">
        <h3 class="grey--text mb-5" >Preview Blog</h3>
        <p class="red--text text--lighten-3">
            Blog title: 
            <span class="black--text">{{ blog.title }}</span>   
        </p>
       <!--  -->
        <p class="red--text text--lighten-3">Blog content:</p>
        <p>{{ blog.content }}</p>
        <!--  -->

        <v-row class="mb-3 mt-1 ml-0" >
            <span class="red--text text--lighten-3">Category: </span>
            <ul class="pl-1" v-for="sport in blog.category" :key="sport.name">
                <li >{{ sport }}</li>
            </ul>
         
        </v-row>


         <p class="red--text text--lighten-3">Author: <span class="black--text">{{ blog.author }}</span> </p>
  
    </div>

    </v-container>
</div>
   
    
  
</template>

<script>
import db from '@/main'


export default {

data: () => ({
     items: ['Sam', 'Terauchi', 'Hassan'],
     blog: {
        title: '',
        content: '',
        category: [],
        author: ''
       },
       submitted: false,
       inputRules: [
            val => val.length >= 3 || 'Required (Minimum length is 3 characters)'
        ]
    }),

    methods: {
        // this is for posting to fb FIRESTORE(new NNinja)
      submit() {
            if(this.$refs.form.validate()){
            const project = {
                title: this.blog.title,
                content: this.blog.content,
                category: this.blog.category,
                author: this.blog.author
            }

            db.collection('blogs').add(project).then(() => {
                console.log('added to db!')
                this.submitted = true
            })
        }
      }
    }
}
</script>

<style scoped>

@media only screen and (min-width: 992px){
    .contain{
            width: 80%;
            margin: 0 auto;
        }
    }
   
    .size{
        max-width: 800px;
    }
    #preview{
        margin-top: 3rem;
        max-width: 800px;
        border: 1px solid rgb(226, 226, 226);
        border-radius: 5px;
        padding: 2rem;
    }
    #preview li{
        list-style: none;

    }
   
</style>