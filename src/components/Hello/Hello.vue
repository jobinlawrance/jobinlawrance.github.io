<template>
  
  <section class="hero is-fullheight ">
    <div class="hero-body">
      <div class="container">
        <div class="is-hidden-touch">
          <h1 class="title is-1">
            {{ name }}
          </h1>
          <h2 class="subtitle is-3">
            {{ caption }}
          </h2>
        </div>
        <div class="is-hidden-desktop">
          <h1 class="title is-3">
            {{ name }}
          </h1>
          <h2 class="subtitle is-5">
            {{ caption }}
          </h2>
        </div>
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
