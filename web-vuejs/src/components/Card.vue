<template lang="html">

  <section class="card">
    <div class="col-xs-6 col-sm-4 col-md-4">
      <div class="card-pf card-pf-accented card-pf-aggregate-status">
        <h2 class="card-pf-title">
          <span  class="mdi" :class="icon"/> {{title}}
        </h2>
        <div class="card-pf-body">
          {{text}}
        </div>
      </div>
    </div>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'Card',
    props: [
      'icon',
      'title',
      'text'
    ],
}
</script>

<style scoped lang="scss">
  .card {

  }
</style>
