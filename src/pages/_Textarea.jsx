export default function Textarea() {
  function getScrollHeight(elm) {
    var savedValue = elm.value
    elm.value = ''
    elm._baseScrollHeight = elm.scrollHeight
    elm.value = savedValue
  }

  return (
    <textarea
      placeholder="Escribe aquí tu mayor miedo..."
      rows="3"
      data-min-rows="3"
      class={[
        'p-4 resize-none',
        'overflow-hidden rounded-md min-w-96 text-gray-300 bg-slate-900',
        'border-gray-700 border-2',
        'transition hover:bg-slate-800',
        'focus:bg-slate-700 focus:outline focus:outline-2 focus:outline-gray-500',
      ].join(' ')}
      onInput={({ target: elm }) => {
        !elm._baseScrollHeight && getScrollHeight(elm)
        const minRows = elm.getAttribute('data-min-rows') | 0
        elm.rows = minRows
        // 24 es el valor mínimo mayor a 0 de (elm.scrollHeight - elm._baseScrollHeight)
        const rows = Math.floor((elm.scrollHeight - elm._baseScrollHeight) / 24)
        elm.rows = minRows + rows
      }}
    ></textarea>
  )
}
