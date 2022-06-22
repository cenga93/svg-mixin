<template>
     <div class="home">
          <h1>test</h1>
     </div>
</template>

<script>
export default {
     name: 'HomeView',
};
</script>

<style lang="scss">
h1 {
     position: relative;

     &:after {
          content: '';
          position: absolute;
          width: 100px;
          height: 100px;
          background-image: sassvg('home', red);
          background-repeat: no-repeat;
     }

     &:hover {
          &:after {
               background-image: sassvg('home', red);
          }
     }
}
</style>
