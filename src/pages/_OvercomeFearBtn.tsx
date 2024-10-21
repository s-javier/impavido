import { actions } from 'astro:actions'
import { animate } from 'motion'
import ls from 'localstorage-slim'
import { useStore } from '@nanostores/solid'
import * as v from 'valibot'
import { vignette, sepia } from '@cloudinary/url-gen/actions/effect'

import { LocalDBKey } from '~/enums'
import { $fear, $fearErrMsg } from '~/stores'
import { cld } from '~/utils/cld'

export default function OvercomeFearBtn() {
  const fear = useStore($fear)

  const validateRequest = () => {
    const Schema = {
      fear: v.pipe(
        v.string('El valor de este campo es inválido.'),
        v.trim(),
        v.nonEmpty('Este campo es requerido.'),
        v.minLength(5, 'Por favor, desarrolla un poco más la idea.'),
        v.maxLength(300, 'Por favor, escribe menos. Se admite un máximo de 300 caracteres.'),
      ),
    }
    const fearErr = v.safeParse(Schema.fear, fear())
    $fearErrMsg.set(fearErr.issues ? fearErr.issues[0].message : '')
    const verificationResult = v.safeParse(v.object(Schema), {
      fear: fear(),
    })
    if (!verificationResult.success) {
      return false
    }
    return true
  }

  return (
    <button
      id="btn-start"
      class={[
        'opacity-0 uppercase text-sm',
        'inline-flex gap-2 justify-center rounded-lg',
        'py-3 px-4 bg-slate-700 text-white hover:bg-slate-600',
      ].join(' ')}
      onClick={async () => {
        if (validateRequest() === false) {
          return
        }

        await animate('#panels', { opacity: 0 }, { duration: 1 }).finished
        document.getElementById('panels')?.classList.add('hidden')

        document.getElementById('loader')?.classList.remove('hidden')
        await animate('#loader', { opacity: 1 }, { duration: 1 }).finished

        const { data, error }: any = await actions.overcome({
          fear: fear(),
        })

        await animate('#loader', { opacity: 0 }, { duration: 0.5 }).finished
        document.getElementById('loader')?.classList.add('hidden')

        if (error) {
          $fearErrMsg.set('Hubo un error. Por favor, inténtalo nuevamente o más tarde.')
        }

        if (data?.error) {
          $fearErrMsg.set(data.error)
        }

        if (error || data?.error) {
          document.getElementById('panels')?.classList.remove('hidden')
          await animate('#panels', { opacity: 1 }, { duration: 1 }).finished
          return
        }

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

        ls.set(LocalDBKey.FEAR_SENT, true)
        ls.set(LocalDBKey.FEAR_SOLUTION, data.solution)
        ls.set(LocalDBKey.FEAR_IMAGE_SOLUTION, data.imageSolution)
      }}
    >
      <span>Vencer miedo</span>
      <span aria-hidden="true" class="hidden text-slate-400 sm:inline">
        →
      </span>
    </button>
  )
}
