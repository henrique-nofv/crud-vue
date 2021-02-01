<template>
  <v-card flat style="border: 1px solid grey">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline text--disabled">{{user.typePerson}}</div>
        <v-card-title class="font-weight-regular d-inline-block text-truncate">
          {{user.name}}
        </v-card-title>
        <v-card-subtitle class="font-weight-regular d-inline-block text-truncate">
          {{user.cpfCnpj}}
        </v-card-subtitle>
      </v-list-item-content>
      <v-list-item-avatar
        rounded="10"
        size="80"
        color="grey"
      >
        <v-img :src="user.photo.length >= 3 ? user.photo : 'https://ciclesradar.com.br/images/sem_foto.png'"></v-img>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
