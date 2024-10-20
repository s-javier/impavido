import { actions } from 'astro:actions'
import { animate } from 'motion'
import { delay } from 'es-toolkit'

export default function OvercomeFear() {
  return (
    <button
      id="btn-start"
      class={[
        'opacity-0 uppercase text-sm',
        'inline-flex gap-2 justify-center rounded-lg',
        'py-3 px-4 bg-slate-700 text-white hover:bg-slate-600',
      ].join(' ')}
      onClick={async () => {
        await animate('#panels', { opacity: 0 }, { duration: 1 }).finished
        document.getElementById('panels')?.classList.add('hidden')

        document.getElementById('loader')?.classList.remove('hidden')
        await animate('#loader', { opacity: 1 }, { duration: 1 }).finished

        // await delay(4000)
        const { data, error }: any = await actions.overcome({
          // title: title().trim(),
        })

        await animate('#loader', { opacity: 0 }, { duration: 0.5 }).finished
        document.getElementById('loader')?.classList.add('hidden')

        await animate('#bg-img-init', { opacity: 0 }, { duration: 0.3 }).finished
        document.getElementById('bg-img-init')?.classList.add('hidden')
        document.getElementById('bg-img-better')?.classList.remove('hidden')
        await animate('#bg-img-better', { opacity: 1 }, { duration: 0.5 }).finished
        document.getElementById('overcome')?.classList.remove('hidden')
        await animate('#overcome', { opacity: 1 }, { duration: 0.5 }).finished
      }}
    >
      <span>Vencer miedo</span>
      <span aria-hidden="true" class="hidden text-slate-400 sm:inline">
        →
      </span>
    </button>
  )
}
