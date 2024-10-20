export default function Page() {
  return (
    <div id="loader" class="hidden opacity-0 flex items-center justify-center h-full">
      <div
        class={[
          'flex flex-col justify-center',
          'page relative p-5 px-10 max-w-md min-h-[400px] bg-[#7e5d38] rounded-md m-auto',
          'text-black',
        ].join(' ')}
      >
        <div class="highlight"></div>
        <div class="font-mono">
          <h1 class="text-center uppercase font-bold mb-6 text-2xl">Mi mayor miedo</h1>
          <p class="text-gray-900">
            It was a special pleasure to see things eaten, to see things blackened and changed. With
            the brass nozzle in his fists, with this great python spitting its venomous kerosene.
          </p>
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
  )
}
