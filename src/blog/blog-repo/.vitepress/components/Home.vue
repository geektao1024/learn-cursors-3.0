<script setup lang="ts">
import { VPHomeContent } from "vitepress/theme";
import { data as posts } from "./posts.data";

function getDateTime(time: number) {
  return new Date(time).toISOString();
}
</script>

<template>
  <div class="VPHome">
    <VPHomeContent>
      <Content />
      <div class="blog-list-warpper">
        <ul class="blog-list">
          <li v-for="post of posts" :key="post.url" class="blog-entry">
            <article>
              <time :datetime="getDateTime(post.date.time)">
                {{ post.date.string }}
              </time>
              <h2 class="title">
                <a :href="post.url">{{ post.title }}</a>
              </h2>
            </article>
          </li>
        </ul>
      </div>
    </VPHomeContent>
  </div>
</template>

<style scoped>
.VPHome {
  padding: 0 20% 5em 20%;
}
.blog-list {
  list-style-type: none;
}
.blog-entry {
  margin-top: 3em;
  border-bottom: 1px solid var(--vp-c-divider);
}
.blog-entry time {
  font-size: 14px;
}
.title {
  border: none;
  margin-top: 0;
  padding-top: 0;
  font-size: 22px;
}
.title a {
  font-weight: 600;
  text-decoration: none;
}
</style>
