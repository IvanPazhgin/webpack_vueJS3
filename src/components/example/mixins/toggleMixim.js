// https://v3.ru.vuejs.org/ru/guide/mixins.html#%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D1%8B

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false)
    },
  },
  mounted() {
    console.log('mixin mounted')
  },
}
