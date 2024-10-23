import { navigate } from 'astro:transitions/client'
import { createSignal, onMount, Show } from 'solid-js'
import { makePersisted } from '@solid-primitives/storage'
import { vignette, sepia, generativeBackgroundReplace } from '@cloudinary/url-gen/actions/effect'
import { animate } from 'motion'
import { Icon } from '@iconify-icon/solid'

import { LocalStorageKey } from '~/enums'
import { cld } from '~/utils/cld'
import GhostLoader from '~/components/GhostLoader'

export default function Overcome() {
  const [fear, setFear] = makePersisted(createSignal(''), {
    name: LocalStorageKey.FEAR as string,
  })
  const [fearOvercome, serFearOvercome] = makePersisted(createSignal(''), {
    name: LocalStorageKey.FEAR_OVERCOME as string,
  })
  const [fearOvercomeImg, serFearOvercomeImg] = makePersisted(createSignal(''), {
    name: LocalStorageKey.FEAR_OVERCOME_IMG as string,
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
  const [isFearOvercomeImg, setIsFearOvercomeImg] = makePersisted(createSignal(false), {
    name: LocalStorageKey.IS_FEAR_OVERCOME_IMG as string,
  })
  const [isFearPerspectiveImg, setIsFearPerspectiveImg] = makePersisted(createSignal(false), {
    name: LocalStorageKey.IS_FEAR_PERSPECTIVE_IMG as string,
  })

  onMount(async () => {
    if (isFearSent() === false) {
      navigate('/')
    }
    document.body.style.backgroundImage = `url(${cld
      .image('impavido/bg-init')
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
        <div class={['w-full rounded-2xl', 'bg-black bg-opacity-75 p-16 text-white'].join(' ')}>
          <h1 id="title" class="text-6xl uppercase font-thin mb-16 text-center">
            Impávido
          </h1>
          <div class="h-[400px] mb-10">
            <Show when={isFearOvercomeImg() === false}>
              <GhostLoader />
            </Show>
            <img
              id="bg-img-better"
              src={cld
                .image(fearOvercomeImg())
                .quality('auto')
                .format('auto')
                .effect(
                  generativeBackgroundReplace().prompt(
                    `dark ghost lurking in a spooky environment and realistic relation with "${fear()}"`,
                  ),
                )
                .toURL()}
              alt="Imagen superación."
              class="h-full rounded-lg m-auto"
              onLoad={() => {
                setIsFearOvercomeImg(true)
              }}
            />
          </div>
          <h2 class="text-2xl font-bold mb-6 text-center">Posible superación del miedo</h2>
          <div class="mb-16">{fearOvercome()}</div>
          <div class="flex flex-row justify-between">
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
                setIsFearOvercomeImg(false)
                setIsFearPerspectiveImg(false)
                navigate('/')
              }}
            >
              <Icon icon="heroicons:arrow-long-left-16-solid" width="100%" class="h-5 w-5" />
              <span>Vencer otro miedo</span>
            </button>
            <a
              href="/perspectiva"
              class={[
                'uppercase text-sm',
                'inline-flex gap-2 justify-center rounded-lg',
                'py-3 px-4 bg-slate-700 text-white hover:bg-slate-600',
              ].join(' ')}
            >
              <span>Cambiar perspectiva</span>
              <Icon icon="heroicons:arrow-long-right-16-solid" width="100%" class="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </Show>
  )
}
