import { createEffect, createSignal, Show } from 'solid-js'
import ls from 'localstorage-slim'

import { LocalDBKey } from '~/enums'
import { cld } from '~/utils/cld'

export default function Positive() {
  const [fearSolution, setFearSolution] = createSignal('')
  const [fearImgSolution, setFearImgSolution] = createSignal('')

  createEffect(() => {
    setFearSolution(ls.get(LocalDBKey.FEAR_SOLUTION) ?? '')
    setFearImgSolution(ls.get(LocalDBKey.FEAR_IMAGE_SOLUTION) ?? '')
    console.log(ls.get(LocalDBKey.FEAR_IMAGE_SOLUTION))
  })

  return (
    <div
      id="overcome"
      class="hidden opacity-0 max-w-[800px] flex items-center justify-center h-full m-auto py-10"
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
        <div class="">{ls.get(LocalDBKey.FEAR_SOLUTION) ?? ''}</div>
      </div>
    </div>
  )
}
