import { onCleanup, onMount } from 'solid-js'

const phrases = [
  'Por favor, espera unos segundos',
  'El miedo es tan profundo como lo permita tu mente',
  'Por favor, espera unos segundos',
  'Enfrentar tus miedos es disolver su poder sobre ti.',
  'Por favor, espera unos segundos',
  'No temas tanto a la caída y disfruta el vuelo',
]
const phraseDelay = 7000

export default function GhostLoader(props: { textColor?: string }) {
  onMount(() => {
    const phraseOutput = document.querySelector('.phrase-output')
    let delay = 0
    const timeoutIds: any[] = []
    const displayPhrases = () => {
      phrases.forEach((phrase) => {
        const timeoutId = setTimeout(() => (phraseOutput!.textContent = phrase), delay)
        delay += phraseDelay
        timeoutIds.push(timeoutId)
      })
    }
    const intervalId = setInterval(displayPhrases, phraseDelay)

    onCleanup(() => {
      timeoutIds.forEach((id) => clearTimeout(id))
      clearInterval(intervalId)
    })
  })
  return (
    <div class="text-[100px] flex flex-col items-center justify-center">
      <div class="ghost">
        <div class="ghost-body">
          <div class="ghost-mouth"></div>
        </div>
        <div class="ghost-tail ghost-tail-1"></div>
        <div class="ghost-tail ghost-tail-2"></div>
        <div class="ghost-tail ghost-tail-3"></div>
        <div class="ghost-tail ghost-tail-4"></div>
      </div>
      <p class={['phrase-output', props.textColor ?? ''].join(' ')}>
        Por favor, espera unos segundos
      </p>
    </div>
  )
}
