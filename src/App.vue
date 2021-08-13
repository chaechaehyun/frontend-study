<template>
    <div>
        <router-view />
    </div>
</template>
<script>

export default {
    data() {
        return {
          
        }
    },
 
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: "-apple-system","BlinkMacSystemFont","helvetica","Apple SD Gothic Neo",sans-serif;
  -webkit-text-size-adjust:none;
  -ms-text-size-adjust: none;

  touch-action: manipulation;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-overflow-scrolling: touch;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

li, ol{
  list-style: none;
}
</style>
