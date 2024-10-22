import { navigate } from 'astro:transitions/client'
import { createSignal, onMount, Show } from 'solid-js'
import { makePersisted } from '@solid-primitives/storage'
import { vignette, sepia } from '@cloudinary/url-gen/actions/effect'
import { animate } from 'motion'

import { LocalStorageKey } from '~/enums'
import { cld } from '~/utils/cld'
import GhostLoader from '~/components/GhostLoader'

export default function Perspective() {
  const [fearPerspective, setFearPerspective] = makePersisted(createSignal(''), {
    name: LocalStorageKey.FEAR_PERSPECTIVE as string,
  })
  const [fearPerspectiveImg, setFearPerspectiveImg] = makePersisted(createSignal(''), {
    name: LocalStorageKey.FEAR_PERSPECTIVE_IMG as string,
  })
  const [initAnimation, setInitAnimation] = makePersisted(createSignal(0), {
    name: LocalStorageKey.INIT_ANIMATION as string,
  })
  const [isPanels, setIsPanels] = makePersisted(createSignal(true), {
    name: LocalStorageKey.IS_PANELS as string,
  })
  const [isFearSent, setIsFearSent] = makePersisted(createSignal(false), {
    name: LocalStorageKey.IS_FEAR_SENT as string,
  })
  const [isImg, setIsImg] = makePersisted(createSignal(false), {
    name: LocalStorageKey.IS_FEAR_PERSPECTIVE_IMG as string,
  })

  onMount(async () => {
    if (isFearSent() === false) {
      navigate('/')
    }
    document.body.style.backgroundImage = `url(${cld
      .image('impavido/bg-positive')
      .quality('auto')
      .format('auto')
      // .effect(vignette())
      .effect(sepia())
      .toURL()})`
    await animate('#overcome', { opacity: 1 }, { duration: 0.5 }).finished
  })

  return (
    <Show when={isFearSent()}>
      <div
        id="overcome"
        class="opacity-0 max-w-[800px] flex items-center justify-center m-auto py-10"
      >
        <div class={['w-full rounded-2xl', 'bg-white bg-opacity-75 p-16 text-gray-900'].join(' ')}>
          <h1 id="title" class="text-6xl uppercase font-thin mb-16 text-center">
            Impávido
          </h1>
          <div class="h-[400px] mb-10">
            <Show when={isImg() === false}>
              <GhostLoader textColor="!text-gray-700" />
            </Show>
            <img
              id="bg-img-better"
              src={cld
                .image(fearPerspectiveImg())
                .format('auto:animated')
                // @ts-ignore
                .effect('e_zoompan:du_8;fps_40;to_(g_auto;zoom_3)')
                // @ts-ignore
                .effect('e_loop')
                // @ts-ignore
                .delivery('q_auto')
                .toURL()}
              alt="Imagen psoitiva."
              class="h-full rounded-md m-auto"
              onLoad={() => {
                setIsImg(true)
              }}
            />
          </div>
          <h2 class="text-2xl font-bold mb-6 text-center">Perspectiva positiva</h2>
          <div class="mb-16">{fearPerspective()}</div>
          <div class="flex flex-row justify-between">
            <a
              href="/superacion"
              class={[
                'uppercase text-sm',
                'inline-flex gap-2 justify-center rounded-lg',
                'py-3 px-4 bg-slate-700 text-white hover:bg-slate-600',
              ].join(' ')}
            >
              <span>Superación del miedo</span>
            </a>
            <button
              class={[
                'uppercase text-sm',
                'inline-flex gap-2 justify-center rounded-lg',
                'py-3 px-4 bg-slate-700 text-white hover:bg-slate-600',
              ].join(' ')}
              onClick={async () => {
                setInitAnimation(0)
                setIsPanels(true)
                setIsFearSent(false)
                setIsImg(false)
                navigate('/')
              }}
            >
              <span>Vencer otro miedo</span>
            </button>
          </div>
        </div>
      </div>
    </Show>
  )
}
