<template>


<div class="container">
    
   <v-row justify="center" class="ma-5">
       <!-- page  title -->
       <h1 class="mb-5 ml-4">List Blog Titles</h1>
       <v-spacer></v-spacer>
       <!-- search bar -->
       <v-text-field label="search blogs" v-model="search" class="mx-4"></v-text-field>
       <!-- <input type="text" v-model="search" placeholder="search blogs"> -->

       <!-- Blog list -->
        <v-expansion-panels popout>
            <v-expansion-panel v-for="blog in filteredBlogs" :key="blog.id">
                <v-expansion-panel-header>{{ blog.title }}</v-expansion-panel-header>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-row>
</div>
 


</template>

<script>
import searchMixin from '../mixin/searchMixin'
import db from '@/main'

export default {
   data: () => ({
       blogs: [],
       show: false,
       search: '',
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
              }
          })
        })

    },
    mixins: [searchMixin]
}
</script>

<style>
    .container{
        width: 80%;
        margin: 0 auto;
    }
</style>