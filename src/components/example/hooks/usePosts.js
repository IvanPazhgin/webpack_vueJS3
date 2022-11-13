import axios from 'axios'
import { computed, onMounted, ref, watch } from 'vue'

export default function usePosts(limit) {
  const posts = ref([])
  const totalPages = ref(0)
  const isPostsLoading = ref(true)
  const fetching = async () => {
    try {
      const url = 'https://jsonplaceholder.typicode.com/posts'
      const response = await axios.get(url, {
        params: {
          // _page: this.page,
          _page: 1,
          _limit: limit,
        },
      })
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
      posts.value = response.data
    } catch (e) {
      console.log(e)
    } finally {
      isPostsLoading.value = false
    }
  }

  onMounted(fetching)
  // onCreated()
  // computed()
  // watch()

  return {
    posts,
    isPostsLoading,
    totalPages,
  }
}
