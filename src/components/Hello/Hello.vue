<template>
  <div class="home">
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
            <h5 class="subtitle is-4">
              <a href="#work">Work</a>
              <a href="#">Contact</a>
            </h5>
          </div>
          <div class="is-hidden-desktop">
            <h1 class="title is-3">
              {{ name }}
            </h1>
            <h2 class="subtitle is-5">
              {{ caption }}
            </h2>
            <h5 class="subtitle is-6">
              <a href="#work">Work</a>
              <a href="#">Contact</a>
            </h5>
          </div>
        </div>
      </div>
    </section>
    <div id="work">
      <section class="section">
        <h2 class="title is-2">
            Work
          </h2>
        <div class="container">
          </br>
          <h1 class="title is-4">Kulo</h1>
          <span>
            <span class="work-tag">Android</span>
            <span class="work-tag">Web API</span>
            <span class="work-tag">Backend</span>
          </span>
          <h2 class="subtitle is-5">
            A taxi hiring service for black & yellow cabs in Mumbai
          </h2>
          
        </div>
        <div class="container">
          </br>
          <h1 class="title is-4">FootDream</h1>
          <span>
            <span class="work-tag">Android</span>
            <span class="work-tag">Web API</span>
          </span>
          <h2 class="subtitle is-5">
            Android app for soccer updates focused mainly on Indian football.
          </h2>
          
        </div>

        <div class="container">
          </br>
          <h1 class="title is-4">TEDxStXaviersMumbai</h1>
          <span>
            <span class="work-tag">Web Design</span>
          </span>
          <h2 class="subtitle is-5">
            Web design for independently orgainsed Ted(Tedx) event held annually in St.Xavier's College,Mumbai.
          </h2>
          
        </div>
        <div class="container">
          </br>
          <h1 class="title is-4">Jarvis</h1>
          <span>
            <span class="work-tag">Arduino</span>
            <span class="work-tag">Android</span>
            <span class="work-tag">Web Design</span>
          </span>
          <h2 class="subtitle is-5">
            A proof of concept home automation system build with Arduino.
          </h2>
          
        </div>
      </section>
    </div>
  </div>
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
