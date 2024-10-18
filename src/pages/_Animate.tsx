import { onMount } from 'solid-js'
import { animate, stagger, timeline } from 'motion'

export default function Animate() {
  onMount(async () => {
    const textElement = document.getElementById('subtitle')
    const fullText = 'Halloween y el miedo están aquí.'
    fullText.split('').forEach((char) => {
      const span = document.createElement('span')
      span.textContent = char
      span.style.opacity = '0' /* Inicialmente invisible */
      textElement?.appendChild(span)
    })
    const spans = document.querySelectorAll('#subtitle span')
    await timeline([
      // ['#bg-img', { opacity: 1 }, { duration: 0.5 }],
      // ['#panel', { transform: 'translateX(0px)' }, { duration: 0.3 }],
      // ['#title', { opacity: 1 }, { duration: 3 }],
      // [spans, { opacity: 1 }, { at: '-2', duration: 3, delay: stagger(0.1) }],
      // ['#invitation', { opacity: 1 }, { at: '-1', duration: 1.5 }],
      // ['#fear', { opacity: 1 }, { duration: 1.5 }],
      // ['#btn-start', { opacity: 1 }, { duration: 1.5 }],
      ['#bg-img', { opacity: 1 }, { duration: 0.1 }],
      ['#panel', { transform: 'translateX(0px)' }, { duration: 0.1 }],
      ['#title', { opacity: 1 }, { duration: 0.1 }],
      [spans, { opacity: 1 }, { at: '-2', duration: 0.1, delay: stagger(0.1) }],
      ['#invitation', { opacity: 1 }, { at: '-1', duration: 0.1 }],
      ['#fear', { opacity: 1 }, { duration: 0.1 }],
      ['#btn-start', { opacity: 1 }, { duration: 0.1 }],
    ])
  })
}
