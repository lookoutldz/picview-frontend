<template>
  <div  v-infinite-scroll="load" infinite-scroll-distance="1">
    <div class="demo-image__lazy">
      <el-image v-for="page in pages"
                :key="page.pageIndex"
                :src="page.pageUrl"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :hide-on-click-modal="true"
                :preview-src-list="pages.map(p => p.pageUrl)"
                :initial-index="page.number"
                />
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import type {CommonResponse} from "@/net/model";
import {get, getResource} from "@/net";

const route = useRoute()

const load = () => {
  let targetPageIndex = Math.min(currentPage.value + loadingStep.value, maxPage.value)
  for (let i = currentPage.value; i < targetPageIndex; i++) {
    let pageIndex = pageIndexes.value[i]
    pages.value.push({number: i, pageIndex: pageIndex, pageUrl: "/loading.gif"})
    getResource(`/picview/page?book=${encodeURIComponent(bookName.value)}&chapter=${encodeURIComponent(chapterName.value)}&page=${pageIndex}`, (imgUrl) => {
      pages.value[i].pageUrl = imgUrl
    })
  }
  currentPage.value = targetPageIndex
}

const bookName = ref("")
const chapterName = ref("")
const maxPage = ref(0)
const initPage = ref(2)
const currentPage = ref(0)
const loadingStep = ref(2)
const pages = ref<Page[]>([])
const pageIndexes = ref([])

type Page = {
  number: number;
  pageIndex: string;
  pageUrl: string;
}

onMounted(() => {
  bookName.value = <string>route.params.bookName
  chapterName.value = <string>route.params.chapterName
  get<CommonResponse>({
    url: `/picview/pages?book=${encodeURIComponent(bookName.value)}&chapter=${encodeURIComponent(chapterName.value)}`,
    success: commonResponse => {
      pageIndexes.value = commonResponse.data
      maxPage.value = pageIndexes.value.length
      for (let i = currentPage.value; i < initPage.value; i++) {
        let pageIndex = pageIndexes.value[i]
        pages.value.push({number: i, pageIndex: pageIndex, pageUrl: "/loading.gif"})
        getResource(`/picview/page?book=${encodeURIComponent(bookName.value)}&chapter=${encodeURIComponent(chapterName.value)}&page=${pageIndex}`, (imgUrl) => {
          pages.value[i].pageUrl = imgUrl
        })
      }
      currentPage.value = initPage.value
    }
  })
})

</script>

<style scoped>
.demo-image__lazy {
  overflow-y: auto;
}
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
</style>