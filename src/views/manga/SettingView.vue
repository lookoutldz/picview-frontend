<template>
  <div>
    <div class="current-message">
      <p>当前书库路径:</p>
      <p>{{libraryDirectory}}</p>
    </div>
    <el-divider content-position="left">修改路径</el-divider>
    <el-input v-model="newDirectory" placeholder="Please input" clearable />
    <el-button type="primary" style="margin-top: 10px" @click="changeDirectory()" :disabled="newDirectory.trim().length < 1">提交</el-button>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {get, postForm} from "@/net";
import type {CommonResponse} from "@/net/model";

const libraryDirectory = ref("/var/lib")
const newDirectory = ref("")

function changeDirectory() {
  postForm<CommonResponse>({url: `/picview/directory?newDirectory=${encodeURIComponent(newDirectory.value)}`, success: commonResponse => {
      libraryDirectory.value = commonResponse.data
    }
  })
}

onMounted(() => {
  get<CommonResponse>({url: "/picview/directory", success: commonResponse => {
      libraryDirectory.value = commonResponse.data
    }
  })
})
</script>

<style scoped>
.current-message {
  margin-top: 10px;
}
</style>