import { navigate } from 'astro:transitions/client'
import { createSignal, onMount, Show } from 'solid-js'
import { stagger, timeline } from 'motion'
import { brightnessHSB } from '@cloudinary/url-gen/actions/adjust'
import { makePersisted } from '@solid-primitives/storage'
import { useStore } from '@nanostores/solid'

import { LocalStorageKey } from '~/enums'
import { cld } from '~/utils/cld'
import { $isLoader } from '~/stores'
import Textarea from './_Textarea'
import OvercomeFearBtn from './_OvercomeFearBtn'

export default function Panels() {
  let panelsRef!: HTMLDivElement
  let panelRef!: HTMLDivElement
  let titleRef!: HTMLHeadingElement
  let subtitleRef!: HTMLParagraphElement
  let invitationRef!: HTMLParagraphElement
  const [initAnimation, setInitAnimation] = makePersisted(createSignal(0), {
    name: LocalStorageKey.INIT_ANIMATION as string,
  })
  const [isPanels, setIsPanels] = makePersisted(createSignal(true), {
    name: LocalStorageKey.IS_PANELS as string,
  })
  const [isFearSent, setIsFearSent] = makePersisted(createSignal(false), {
    name: LocalStorageKey.IS_FEAR_SENT as string,
  })
  const [subtitle, setSubtitle] = createSignal('')
  const isLoader = useStore($isLoader)

  onMount(async () => {
    document.body.style.backgroundImage = `url(${cld
      .image('impavido/bg-init')
      .quality('auto')
      .format('auto')
      .adjust(brightnessHSB(-30))
      .toURL()})`
    const textElement = document.getElementById('subtitle')
    const fullText = 'Halloween y el miedo están aquí.'
    if (initAnimation() < LocalStorageKey.MAX_INIT_ANIMATION) {
      // await animate('#layer-init', { opacity: 0 }, { duration: 0.5 }).finished
      // document.getElementById('layer-init')?.classList.add('hidden')

      fullText.split('').forEach((char) => {
        const span = document.createElement('span')
        span.textContent = char
        span.style.opacity = '0' /* Inicialmente invisible */
        textElement?.appendChild(span)
      })
      const spans = document.querySelectorAll('#subtitle span')

      await timeline([
        [panelRef, { transform: 'translateX(0px)' }, { duration: 0.3 }],
        [titleRef, { opacity: 1 }, { duration: 3 }],
        [spans, { opacity: 1 }, { at: '-2', duration: 3, delay: stagger(0.1) }],
        // [spans, { opacity: 1 }, { at: '-2', duration: 0.1, delay: stagger(0.1) }],
        [invitationRef, { opacity: 1 }, { at: '-1', duration: 1.5 }],
        ['#fear', { opacity: 1 }, { duration: 1.5 }],
        ['#btn-start', { opacity: 1 }, { duration: 1.5 }],
      ]).finished

      setInitAnimation((prev) => prev + 1)
    } else if (isFearSent()) {
      navigate('/superacion')
    } else {
      // document.getElementById('layer-init')?.classList.add('hidden')
      panelRef.classList.remove('translate-x-full')
      titleRef.classList.remove('opacity-0')
      setSubtitle(fullText)
      invitationRef.classList.remove('opacity-0')
      document.getElementById('fear')?.classList.remove('opacity-0')
      document.getElementById('btn-start')?.classList.remove('opacity-0')
    }
  })

  return (
    <Show when={isPanels() && !isLoader()}>
      <div id="panels" ref={panelsRef} class="h-screen grid grid-cols-5">
        <div class="col-span-2"></div>
        <div
          id="panel"
          ref={panelRef}
          class={[
            'col-span-3 bg-black bg-opacity-75 p-10 text-white flex flex-col',
            'justify-center gap-36',
            'transform translate-x-full',
          ].join(' ')}
        >
          <div>
            <h1 ref={titleRef} class="opacity-0 text-8xl uppercase font-thin mb-6">
              Impávido
            </h1>
            {/* <p id="subtitle" class="text-2xl italic text-gray-300">Halloween y el miedo están aquí.</p> */}
            <p ref={subtitleRef} id="subtitle" class="text-2xl italic text-gray-300 h-8">
              {subtitle()}
            </p>
          </div>
          <div>
            <p ref={invitationRef} class="opacity-0 text-lg text-gray-300 mb-4">
              Esta es la oportunidad perfecta para vencer tu mayor miedo.
            </p>
            <Textarea id="fear" class="opacity-0" />
            <OvercomeFearBtn />
          </div>
        </div>
      </div>
    </Show>
  )
}
