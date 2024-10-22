import { createSignal, onMount, Show } from 'solid-js'
import { makePersisted } from '@solid-primitives/storage'
import { vignette, sepia } from '@cloudinary/url-gen/actions/effect'
import { animate } from 'motion'

import { LocalStorageKey } from '~/enums'
import { cld } from '~/utils/cld'

export default function Overcome() {
  const [fearSolution, setFearSolution] = makePersisted(createSignal(''), {
    name: LocalStorageKey.FEAR_SOLUTION as string,
  })
  const [fearImgSolution, setFearImgSolution] = makePersisted(createSignal(''), {
    name: LocalStorageKey.FEAR_IMAGE_SOLUTION as string,
  })
  const [isOvercome, setIsOvercome] = makePersisted(createSignal(false), {
    name: LocalStorageKey.IS_OVERCOME as string,
  })

  onMount(async () => {
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
    <Show when={isOvercome()}>
      <div
        id="overcome"
        class="opacity-0 max-w-[800px] flex items-center justify-center m-auto py-10"
      >
        <div class={['w-full rounded-2xl', 'bg-black bg-opacity-75 p-16 text-white'].join(' ')}>
          <h1 id="title" class="text-6xl uppercase font-thin mb-16 text-center">
            Impávido
          </h1>
          <div class="h-[400px] mb-10">
            <Show when={fearImgSolution() !== ''}>
              <img
                id="bg-img-better"
                src={cld
                  .image(fearImgSolution())
                  .format('auto:animated')
                  // @ts-ignore
                  .effect('e_zoompan:du_8;fps_40;to_(g_auto;zoom_3)')
                  // @ts-ignore
                  .effect('e_loop')
                  // @ts-ignore
                  .delivery('q_auto')
                  .toURL()}
                alt="Imagen cuando los miedos empiezan a desaparecer."
                class="h-full rounded-md m-auto"
              />
            </Show>
          </div>
          <div class="">{fearSolution()}</div>
        </div>
      </div>
    </Show>
  )
}
