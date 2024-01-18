<template>
  <div class="common-layout">
    <el-container>
      <el-header class="no-padding">
        <TheHeader />
      </el-header>
      <el-main class="no-padding" :style="{ height: `calc(100vh - 60px)` }" >
        <router-view v-slot="{Component}">
<!--          <transition name="el-fade-in-linear" mode="out-in">-->
            <component :is="Component"/>
<!--          </transition>-->
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
</script>

<style scoped>
.common-layout {
  width: 100%;
}
.no-padding {
  padding: 0;
}
</style>

