// import { uesStore } from '../../store'
import { useRouter } from 'vue-router'
export default class {
  // constructor () {}
  init () {
    const router = useRouter()
    window.onmessage = (e) => {
      const { path } = e.data
      router.push({ path })
    }
  }
}
