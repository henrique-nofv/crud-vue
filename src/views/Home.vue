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
    <v-container
      v-if="loading"
      style="height: 60vh"
      tag='section'
      class='d-flex flex-row flex-wrap white'
    >
      <v-progress-circular
        class="ma-auto"
        indeterminate
        color="green"
      ></v-progress-circular>
    </v-container>
    <v-container v-else-if="users.length" tag='section' class='d-flex flex-row flex-wrap white'>
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
    <v-container v-else tag='section' class='d-flex flex-row flex-wrap white'>
      <h1 class="headline">Nenhum usuário encontrado 😢</h1>
    </v-container>
    <v-pagination
      @input="changePage"
      v-if="users.length"
      v-model="page"
      :length="pagination.length ? pagination.length : 0"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import CardUser from '@/components/CardUser.vue';
import { mapState } from 'vuex';
/* eslint no-underscore-dangle: ["error", { "allow": ["_count"] }] */
export default {
  name: 'Home',
  components: {
    HeaderComponent: Header,
    CardUser,
  },
  async mounted() {
    const params = {
      limit: this.limitPerPage,
      skip: this.page - 1,
    };

    this.$store.dispatch('getUsers', params);

    const response = await this.$store.dispatch('getPageInfo');

    this.pageInfo = response.data;

    this.loading = false;
  },
  methods: {
    async changePage(page) {
      this.loading = true;

      this.page = page;

      const params = {
        limit: this.limitPerPage,
        skip: this.page - 1,
      };

      await this.$store.dispatch('getUsers', params);

      this.loading = false;
    },
  },
  data() {
    return {
      pageInfo: '',
      page: 1,
      limitPerPage: 6,
      loading: true,
    };
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
    pagination() {
      const pageInfo = {
        page: this.page,
        length: Math.ceil(this.pageInfo._count / this.limitPerPage),
      };

      return pageInfo;
    },
  },
};
</script>

<style lang='scss'>
.card-pointer {
  cursor: pointer;
}
</style>
