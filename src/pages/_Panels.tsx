import { onMount } from 'solid-js'
import { animate, stagger, timeline } from 'motion'

import Textarea from './_Textarea'
import OvercomeFearBtn from './_OvercomeFearBtn'

export default function Panels() {
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
      ['#bg-img-init', { opacity: 1 }, { duration: 0.5 }],
      ['#panel', { transform: 'translateX(0px)' }, { duration: 0.3 }],
      ['#title', { opacity: 1 }, { duration: 3 }],
      [spans, { opacity: 1 }, { at: '-2', duration: 3, delay: stagger(0.1) }],
      ['#invitation', { opacity: 1 }, { at: '-1', duration: 1.5 }],
      ['#fear', { opacity: 1 }, { duration: 1.5 }],
      ['#btn-start', { opacity: 1 }, { duration: 1.5 }],
      // ['#bg-img', { opacity: 1 }, { duration: 0.1 }],
      // ['#panel', { transform: 'translateX(0px)' }, { duration: 0.1 }],
      // ['#title', { opacity: 1 }, { duration: 0.1 }],
      // [spans, { opacity: 1 }, { at: '-2', duration: 0.1, delay: stagger(0.1) }],
      // ['#invitation', { opacity: 1 }, { at: '-1', duration: 0.1 }],
      // ['#fear', { opacity: 1 }, { duration: 0.1 }],
      // ['#btn-start', { opacity: 1 }, { duration: 0.1 }],
    ])
  })

  return (
    <div id="panels" class="h-full grid grid-cols-5">
      <div class="col-span-2"></div>
      <div
        id="panel"
        class={[
          'col-span-3 bg-black bg-opacity-75 p-10 text-white flex flex-col',
          'justify-center gap-36',
          'transform translate-x-full',
        ].join(' ')}
      >
        <div>
          <h1 id="title" class="opacity-0 text-8xl uppercase font-thin mb-6">
            Impávido
          </h1>
          {/* <p id="subtitle" class="text-2xl italic text-gray-300">Halloween y el miedo están aquí.</p> */}
          <p id="subtitle" class="text-2xl italic text-gray-300 h-8"></p>
        </div>
        <div>
          <p id="invitation" class="opacity-0 text-lg text-gray-300 mb-4">
            Esta es la oportunidad perfecta para vencer tu mayor miedo.
          </p>
          <Textarea id="fear" class="opacity-0 mb-4" />
          <OvercomeFearBtn />
        </div>
      </div>
    </div>
  )
}
