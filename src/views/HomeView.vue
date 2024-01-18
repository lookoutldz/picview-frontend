<template>
  <div class="demo-image">
    <div v-for="book in books" :key="book.name" class="block">
      <el-image style="max-width: 60%;" :src="book.coverUrl" :fit="'contain'" @click="getChapters(book.name)" class="clickable" />
      <span class="demonstration">{{ book.name }}</span>
    </div>
    <el-dialog v-model="dialogTableVisible" title="章节选择" destroy-on-close>
      <el-scrollbar>
        <p v-for="chapter in chapters"
           :key="chapter.chapterName"
           @click="openBook(chapter.refBook, chapter.chapterName)"
           class="scrollbar-demo-item clickable"
        >{{ chapter.chapterName }}</p>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue'
import {get, getResource} from "@/net";
import type {CommonResponse} from "@/net/model";
import {useRouter} from "vue-router";

const router = useRouter()

type Book = {
  name: string;
  coverUrl: string;
};

const books = ref<Book[]>([]);
// 获取书籍列表
function getBooks() {
  get<CommonResponse>({ url: "/picview/books", success: commonResponse => {
      let bookNames = commonResponse.data
      for (let i = 0; i < bookNames.length; i++) {
        let bookName: string = bookNames[i];
        getResource(`/picview/cover?book=${encodeURIComponent(bookName)}`, (imgUrl) => {
          books.value[i].coverUrl = imgUrl
        })
        books.value.push({"name": bookName, "coverUrl": ""})
      }
    }
  })
}

type Chapter = {
  chapterName: string;
  refBook: string;
}
const dialogTableVisible = ref(false)
const chapters = ref<Chapter[]>([])
// 获取章节列表
function getChapters(bookName: string) {
  get<CommonResponse>({url: `/picview/chapters?book=${encodeURIComponent(bookName)}`, success: commonResponse => {
    chapters.value = []
      let chapterNames = commonResponse.data
      for (const c of chapterNames) {
        chapters.value.push({chapterName: c, refBook: bookName})
      }
      dialogTableVisible.value = true
    }
  })
}

function openBook(bookName: string, chapterName: string) {
  router.push({name: "pica", params: {bookName: bookName, chapterName: chapterName}});
}

onMounted(() => {
  getBooks()
})
onBeforeUnmount(() => {
})

</script>

<style scoped>
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  display: inline-block;
  width: 50%;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  padding: 0 10px;
  margin-bottom: 20px;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.clickable {
  cursor: pointer;
}
</style>