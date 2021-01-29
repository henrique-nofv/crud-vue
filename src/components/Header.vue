<template>
  <v-container tag="header" class="d-flex flex-column white rounded mt-4 mb-4">
    <h1 class="headline">
      {{ title }}
    </h1>
    <slot name="actions" />
  </v-container>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
