// отслеживаем пересечения какого-либо элемента
// https://v3.ru.vuejs.org/ru/guide/custom-directive.html
export default {
  mounted(el, binding) {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    }
    const callback = (entries, observer) => {
      /* Content excerpted, show below */
      if (entries[0].isIntersecting) {
        binding.value()
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(el)
  },
  name: 'intersection',
}
