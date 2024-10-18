import { onMount } from 'solid-js'
import { animate, timeline } from 'motion'

export default function Animate() {
  onMount(() => {
    animate('#title', { opacity: 1 }, { duration: 3 })
  })
}
