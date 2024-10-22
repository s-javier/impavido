import { createSignal, Show } from 'solid-js'
import { makePersisted } from '@solid-primitives/storage'
import { useStore } from '@nanostores/solid'

import { LocalStorageKey } from '~/enums'
import { $fear, $isLoader } from '~/stores'

export default function Page() {
  const isLoader = useStore($isLoader)
  const fear = useStore($fear)

  return (
    <Show when={isLoader()}>
      <div id="loader" class="opacity-0 w-full h-screen flex flex-col items-center justify-center">
        <h1 class="text-2xl uppercase font-thin text-white">Estamos venciendo tu miedo...</h1>
        <div
          class={[
            'flex flex-col justify-center',
            'page relative p-5 px-10 min-w-[400px] min-h-[400px] bg-[#7e5d38] rounded-md m-auto',
            'text-black',
          ].join(' ')}
        >
          <div class="highlight"></div>
          <div class="font-mono">
            <h1 class="text-center uppercase font-bold mb-6 text-2xl">Mi mayor miedo</h1>
            <p class="text-gray-900 text-center">{fear()}</p>
          </div>
          <div class="burn absolute">
            <div class="flame"></div>
            <div class="flame"></div>
            <div class="flame"></div>
            <div class="flame"></div>
            <div class="flame"></div>
            <div class="flame"></div>
            <div class="flame"></div>
            <div class="flame"></div>
            <div class="flame"></div>
            <div class="flame"></div>
          </div>
        </div>
      </div>
    </Show>
  )
}
