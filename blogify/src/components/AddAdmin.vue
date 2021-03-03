 <template>

  <v-row class="ma-3">
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          light
          v-bind="attrs"
          v-on="on">
        <v-icon left>mdi-account-plus-outline</v-icon>
         <span>Add Admin</span>
        </v-btn>
      </template>
      <v-card class="pa-3">
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  id="admin-email"
                  v-model="adminEmail"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn
           :loading="loading"
            :disabled="loading"
            color="grey lighten-4"
            @click.prevent="
            addAdmin(),
            loader = 'loading',
            dialog = false">
            Add Admin
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import 'firebase/auth';
import 'firebase/firestore'
import {functions} from '../main';

export default {
       

    data: () => ({
      dialog: false,
      adminEmail: '',
      loader: null,
      loading: false,
    }),
     watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 2000)

        this.loader = null
      },
    },
    
    methods: {
            
         // call cloud function(bind email to adminEmail)
            addAdmin() {
                    const addAdminRole = functions.httpsCallable('addAdminRole');
                    addAdminRole({ email: this.adminEmail }).then(result => {
                    console.log(result);
                });
            }

        }         
      }
  

</script>

<style>
/* .wide{
    width: 0px!important;
} */
</style>