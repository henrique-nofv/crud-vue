<template>
  <div>
    <header-component title='Usuários'>
      <template v-slot:actions>
          <router-link tag="span" to="/user">
            <v-btn depressed max-width='150px' class='success'>
                Novo usuário
            </v-btn>
          </router-link>
      </template>
    </header-component>
    <v-container tag='section' class='d-flex flex-row flex-wrap white'>
      <v-col
        v-for='(user, index) in users'
        :key='user + index'
        cols='12'
        sm='6'
        md='4'
        xl='4'
      >
        <router-link tag="span" :to="`/user/${user._id}`">
          <card-user :user="user" class='card-pointer' />
        </router-link>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import CardUser from '@/components/CardUser.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    HeaderComponent: Header,
    CardUser,
  },
  mounted() {
    this.$store.dispatch('getUsers');
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
  },
};
</script>

<style lang='scss'>
.card-pointer {
  cursor: pointer;
}
</style>
