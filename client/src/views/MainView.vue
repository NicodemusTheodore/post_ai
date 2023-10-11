<script>
import RightPanel from '../components/RightPanel.vue'
import SideBar from '../components/SideBar.vue'

export default {
  name: 'MainView',
  components: { SideBar, RightPanel }
}
</script>
<template>
  <!-- CONTAINER -->
  <section class="flex h-full px-28">
    <!-- SIDEBAR -->
    <SideBar />
    <!-- CONTENT -->
    <RouterView />
    <!-- RIGHT PANEL -->
    <RightPanel />
  </section>
</template>
