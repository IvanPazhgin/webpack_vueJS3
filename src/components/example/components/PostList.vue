<template>
  <div v-if="posts.length > 0">
    <!-- <div> -->
    <h3>Список постов</h3>
    <transition-group name="post-list">
      <post-item
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
      />
      <!-- в качестве ключей НЕ РЕКОМЕНДУЕТСЯ использовать индексы элементов в массиве, поскольку при удалении элемента индексы могут сдвигаться -->
    </transition-group>
    <!-- </div> -->
  </div>
  <h3 v-else style="color: red">Список постов пуст</h3>
</template>

<script>
import PostItem from './PostItem.vue'
export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  // чтобы что то сделать при инициализации компонента
  created() {
    // props are exposed on this
    // console.log(this.posts)
    // console.log(this.data)
  },
}
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  /* transform: translateY(30px); */
  transform: translateX(130px);
}
.post-list-move {
  transition: transform 0.4s ease;
}
</style>
