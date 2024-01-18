<template>
  <div>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        close-on-click-outside:true
        :router="true"
    >
      <el-menu-item index="/"><el-icon><HomeFilled /></el-icon>PicView</el-menu-item>
      <el-menu-item index="/favorite" disabled><el-icon><Star /></el-icon>Favorite</el-menu-item>
      <el-menu-item index="/setting"><el-icon><Setting /></el-icon>Setting</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {HomeFilled, Setting, Star} from "@element-plus/icons-vue";

const activeIndex = ref('1')

</script>

<style scoped>

</style>