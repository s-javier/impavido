import { actions } from 'astro:actions'
import { navigate } from 'astro:transitions/client'
import { createSignal } from 'solid-js'
import { makePersisted } from '@solid-primitives/storage'
import { animate } from 'motion'
import * as v from 'valibot'
import { vignette, sepia } from '@cloudinary/url-gen/actions/effect'
import { useStore } from '@nanostores/solid'

import { LocalStorageKey } from '~/enums'
import { $fear, $fearErrMsg, $isLoader } from '~/stores'

export default function OvercomeFearBtn() {
  const fear = useStore($fear)
  const [isPanels, setIsPanels] = makePersisted(createSignal(true), {
    name: LocalStorageKey.IS_PANELS as string,
  })
  const isLoader = useStore($isLoader)
  const [isFearSent, setIsFearSent] = makePersisted(createSignal(false), {
    name: LocalStorageKey.IS_FEAR_SENT as string,
  })
  const [fearSolution, setFearSolution] = makePersisted(createSignal(''), {
    name: LocalStorageKey.FEAR_SOLUTION as string,
  })
  const [fearImgSolution, setFearImgSolution] = makePersisted(createSignal(''), {
    name: LocalStorageKey.FEAR_IMAGE_SOLUTION as string,
  })
  const [isOvercome, setIsOvercome] = makePersisted(createSignal(false), {
    name: LocalStorageKey.IS_OVERCOME as string,
  })

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
        setIsPanels(false)

        $isLoader.set(true)
        await animate('#loader', { opacity: 1 }, { duration: 1 }).finished

        const { data, error }: any = await actions.overcome({
          fear: fear(),
        })

        await animate('#loader', { opacity: 0 }, { duration: 0.5 }).finished
        $isLoader.set(false)

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

        setIsFearSent(true)
        setFearSolution(data.solution)
        setFearImgSolution(data.imageSolution)
        setIsOvercome(true)

        navigate('/superacion')
      }}
    >
      <span>Vencer miedo</span>
      <span aria-hidden="true" class="hidden text-slate-400 sm:inline">
        →
      </span>
    </button>
  )
}
