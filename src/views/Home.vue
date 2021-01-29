<template>
  <div>
    <Header title='Usuários'>
      <template v-slot:actions>
        <v-btn depressed max-width='150px' class='success'>Novo cliente</v-btn>
      </template>
    </Header>
    <v-container tag='section' class='d-flex flex-row flex-wrap white'>
      <v-col
        v-for='(user, index) in users'
        :key='user + index'
        cols='12'
        sm='6'
        md='4'
        xl='4'
      >
        <v-card flat style="border: 1px solid grey;">
          <v-list-item three-line>
            <v-list-item-content>
            <div class="overline text--disabled">
              Pessoa física
            </div>
            <v-card-title class="font-weight-regular d-inline-block text-truncate">
              Henrique Noronha Favorette
            </v-card-title>
            </v-list-item-content>
            <v-list-item-avatar
              rounded="10"
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
  </v-container>
</div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'Home',
  components: {
    Header,
  },
  data() {
    return {
      users: {
        name: 'Primeiro nome',
        cpfCnpj: '1231231214123',
        genre: 'Indefinido',
        photoUrl: '',
      },
    };
  },
};
</script>

<style lang='scss'>
</style>
