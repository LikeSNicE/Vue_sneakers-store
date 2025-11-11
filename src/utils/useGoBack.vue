<script>
import { useRouter } from 'vue-router'

const useGoBack = () => {
  const router = useRouter()

  const goBack = () => {
    router.go(-1)
  }

  return {
    goBack,
  }
}

export { useGoBack }
</script>
