<template>
  <v-container tag='header' class='d-flex flex-column white rounded mt-4 mb-4'>
    <slot name='headLine' />
    <h1 class='headline ml-4'>
      {{ title }}
    </h1>
    <slot name='actions' />
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
  computed: {
    crumbs() {
      const pathArray = this.$route.path.split('/');
      pathArray.shift();
      const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          disabled: true,
          href: path,
          to: breadcrumbArray[idx - 1]
            ? `/${breadcrumbArray[idx - 1].path}/${path}`
            : `/${path}`,
          text: this.$route.matched[idx].meta.breadCrumb || path,
        });
        return breadcrumbArray;
      }, []);
      return breadcrumbs;
    },
  },
};
</script>
