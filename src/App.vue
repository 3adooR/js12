<template>
  <nav id="nav">
    <MDBContainer>
      <router-link to="/">Тренировка</router-link>
      <router-link to="/config">Конфигурация</router-link>
    </MDBContainer>
  </nav>
  <MDBContainer>
    <router-view/>
  </MDBContainer>
</template>

<script>
import {MDBContainer} from "mdb-vue-ui-kit";

export default {
  name: "App",
  components: {
    MDBContainer
  }
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 1em 0;
  background: #41B883;
  margin-bottom: 1em;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-transform: uppercase;
  margin: 0 1em
}

nav a:hover, nav a.router-link-exact-active {
  color: #fff;
}

h1 {
  text-transform: uppercase;
  text-align: center;
  color: #fff;
  background: #2c3e50;
  font-size: 1.2em;
  padding: 1em 0;
  border-radius: 1em;
}

.container {
  max-width: 360px;
}
</style>
