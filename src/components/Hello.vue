<template>
  <section class="hero is-fullheight ">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-1">
          Jobin Lawrance
        </h1>
        <h2 class="subtitle is-3">
          {{ caption }}
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        name: 'Jobin Lawrance',
        caption: 'Web & App Developer'
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  @import 'main.scss';
</style>
