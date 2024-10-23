import { actions } from 'astro:actions'
import { navigate } from 'astro:transitions/client'
import { createSignal } from 'solid-js'
import { makePersisted } from '@solid-primitives/storage'
import { animate } from 'motion'
import * as v from 'valibot'
import { vignette, sepia } from '@cloudinary/url-gen/actions/effect'
import { useStore } from '@nanostores/solid'
import { Icon } from '@iconify-icon/solid'

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
  const [fearOvercome, serFearOvercome] = makePersisted(createSignal(''), {
    name: LocalStorageKey.FEAR_OVERCOME as string,
  })
  const [fearOvercomeImg, serFearOvercomeImg] = makePersisted(createSignal(''), {
    name: LocalStorageKey.FEAR_OVERCOME_IMG as string,
  })
  const [fearPerspective, setFearPerspective] = makePersisted(createSignal(''), {
    name: LocalStorageKey.FEAR_PERSPECTIVE as string,
  })
  const [fearPerspectiveImg, setFearPerspectiveImg] = makePersisted(createSignal(''), {
    name: LocalStorageKey.FEAR_PERSPECTIVE_IMG as string,
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
    <>
      <button
        id="btn-start"
        class={[
          'opacity-0',
          'group relative inline-flex items-center justify-center overflow-hidden rounded-lg',
          'px-5 py-3 duration-500',
          '[transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1',
          'active:scale-x-110 active:scale-y-90',
          'text-sm',
          'uppercase',
          // 'font-medium',
          'bg-slate-700 text-white hover:bg-slate-600',
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
            setIsPanels(true)
            await animate('#panels', { opacity: 1 }, { duration: 1 }).finished
            return
          }

          setIsFearSent(true)

          serFearOvercome(data.solution)
          serFearOvercomeImg(data.solutionImg)
          setFearPerspective(data.perspective)
          setFearPerspectiveImg(data.perspectiveImg)

          navigate('/superacion')
        }}
      >
        <div class="relative inline-flex -translate-x-0 items-center transition group-hover:translate-x-6">
          <div class="absolute top-0 -translate-x-4 opacity-0 transition group-hover:-translate-x-6 group-hover:opacity-100">
            <Icon icon="heroicons:face-smile" width="100%" class="h-5 w-5" />
          </div>
          <span class="pr-6">Vencer miedo</span>
          <div class="absolute right-0 top-0 translate-x-0 opacity-100 transition group-hover:translate-x-4 group-hover:opacity-0">
            {/* <Icon icon="heroicons:hand-thumb-up" width="100%" class="h-5 w-5" /> */}
            <Icon icon="bx:ghost" width="100%" class="h-5 w-5" />
          </div>
        </div>
      </button>
    </>
  )
}
