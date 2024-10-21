import { createSignal, onMount } from 'solid-js'
import { animate, stagger, timeline } from 'motion'
import ls from 'localstorage-slim'
import { brightnessHSB } from '@cloudinary/url-gen/actions/adjust'
import { vignette, sepia } from '@cloudinary/url-gen/actions/effect'

import { LocalDBKey } from '~/enums'
import { cld } from '~/utils/cld'
import Textarea from './_Textarea'
import OvercomeFearBtn from './_OvercomeFearBtn'

export default function Panels() {
  const [subtitle, setSubtitle] = createSignal('')
  onMount(async () => {
    document.body.style.backgroundImage = `url(${cld
      .image('impavido/bg-init')
      .quality('auto')
      .format('auto')
      .adjust(brightnessHSB(-30))
      .toURL()})`
    const textElement = document.getElementById('subtitle')
    const fullText = 'Halloween y el miedo están aquí.'
    if (
      !ls.get(LocalDBKey.INIT) ||
      // @ts-ignore
      (ls.get(LocalDBKey.INIT) && ls.get(LocalDBKey.INIT) < LocalDBKey.MAX_INIT)
    ) {
      await animate('#layer-init', { opacity: 0 }, { duration: 0.5 }).finished
      document.getElementById('layer-init')?.classList.add('hidden')
      fullText.split('').forEach((char) => {
        const span = document.createElement('span')
        span.textContent = char
        span.style.opacity = '0' /* Inicialmente invisible */
        textElement?.appendChild(span)
      })
      const spans = document.querySelectorAll('#subtitle span')
      await timeline([
        ['#panel', { transform: 'translateX(0px)' }, { duration: 0.3 }],
        ['#title', { opacity: 1 }, { duration: 3 }],
        [spans, { opacity: 1 }, { at: '-2', duration: 3, delay: stagger(0.1) }],
        // [spans, { opacity: 1 }, { at: '-2', duration: 0.1, delay: stagger(0.1) }],
        ['#invitation', { opacity: 1 }, { at: '-1', duration: 1.5 }],
        ['#fear', { opacity: 1 }, { duration: 1.5 }],
        ['#btn-start', { opacity: 1 }, { duration: 1.5 }],
      ]).finished
      // @ts-ignore
      ls.set(LocalDBKey.INIT, ls.get(LocalDBKey.INIT) ? ls.get(LocalDBKey.INIT) + 1 : 1)
    } else if (ls.get(LocalDBKey.FEAR_SENT)) {
      await animate('#panels', { opacity: 0 }, { duration: 1 }).finished
      document.getElementById('panels')?.classList.add('hidden')

      document.getElementById('layer-init')?.classList.remove('hidden')
      document.getElementById('layer-init')?.classList.add('overlay-1')
      document.body.style.backgroundImage = `url(${cld
        .image('impavido/bg-init')
        .quality('auto')
        .format('auto')
        // .effect(vignette())
        .effect(sepia())
        .toURL()})`
      await animate('#layer-init', { opacity: 0 }, { duration: 0.5 }).finished
      document.getElementById('layer-init')?.classList.add('hidden')

      document.getElementById('overcome')?.classList.remove('hidden')
      await animate('#overcome', { opacity: 1 }, { duration: 0.5 }).finished
    } else {
      document.getElementById('layer-init')?.classList.add('hidden')
      document.getElementById('panel')?.classList.remove('translate-x-full')
      document.getElementById('title')?.classList.remove('opacity-0')
      setSubtitle(fullText)
      document.getElementById('invitation')?.classList.remove('opacity-0')
      document.getElementById('fear')?.classList.remove('opacity-0')
      document.getElementById('btn-start')?.classList.remove('opacity-0')
    }
  })

  return (
    <div id="panels" class="h-screen grid grid-cols-5">
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
          <p id="subtitle" class="text-2xl italic text-gray-300 h-8">
            {subtitle()}
          </p>
        </div>
        <div>
          <p id="invitation" class="opacity-0 text-lg text-gray-300 mb-4">
            Esta es la oportunidad perfecta para vencer tu mayor miedo.
          </p>
          <Textarea id="fear" class="opacity-0" />
          <OvercomeFearBtn />
        </div>
      </div>
    </div>
  )
}
