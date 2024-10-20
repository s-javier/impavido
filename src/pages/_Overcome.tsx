import { cld } from '~/utils/cloudinary'

export default function Positive() {
  return (
    <div
      id="overcome"
      class="hidden opacity-0 max-w-[900px] flex items-center justify-center h-full m-auto"
    >
      <div class={['w-full rounded-2xl', 'bg-black bg-opacity-75 p-16 text-white'].join(' ')}>
        <h1 id="title" class="text-6xl uppercase font-thin mb-16 text-center">
          Impávido
        </h1>
        <div class="grid grid-cols-5 gap-10">
          <div class="col-span-2">
            <img
              id="bg-img-better"
              src={cld
                .image('impavido/bg-init')
                .format('auto:animated')
                .effect('e_zoompan:du_8;fps_40;to_(g_auto;zoom_3)')
                .effect('e_loop')
                .delivery('q_auto')
                .toURL()}
              alt="Imagen cuando los miedos empiezan a desaparecer."
              class="w-full rounded-full"
            />
          </div>
          <div class="col-span-3">
            It was a special pleasure to see things eaten, to see things blackened and changed. With
            the brass nozzle in his fists, with this great python spitting its venomous kerosene
            upon the world, the blood pounded in his head, and his hands were the hands of some
            amazing conductor playing all the symphonies of blazing and burning to bring down the
            tatters and charcoal ruins of history. With his symbolic helmet numbered 451 on his
            stolid head, and his eyes all orange flame with the thought of what came next, he
            flicked the igniter and the house jumped up in a gorging fire that burned the evening
            sky red and yellow and black. He strode in a swarm of fireflies. He wanted above all,
            like the old joke, to shove a marshmallow on a stick in the furnace, while the
          </div>
        </div>
      </div>
    </div>
  )
}
