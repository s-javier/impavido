export default function Textarea(props: { id: string; class: string }) {
  function getScrollHeight(elm: any) {
    var savedValue = elm.value
    elm.value = ''
    elm._baseScrollHeight = elm.scrollHeight
    elm.value = savedValue
  }

  return (
    <textarea
      id={props.id}
      placeholder="Escribe aquí tu mayor miedo..."
      rows="3"
      data-min-rows="3"
      class={[
        'p-4 resize-none',
        'overflow-hidden rounded-md min-w-96 text-gray-300 bg-gray-900',
        'border-slate-700 border-2',
        'transition hover:bg-gray-800',
        'focus:bg-gray-800 focus:outline focus:outline-2 focus:outline-slate-600',
        props.class,
      ].join(' ')}
      onInput={({ target: elm }) => {
        // @ts-ignore
        !elm._baseScrollHeight && getScrollHeight(elm)
        // @ts-ignore
        const minRows = elm.getAttribute('data-min-rows') | 0
        elm.rows = minRows
        // 24 es el valor mínimo mayor a 0 de (elm.scrollHeight - elm._baseScrollHeight)
        // @ts-ignore
        const rows = Math.floor((elm.scrollHeight - elm._baseScrollHeight) / 24)
        elm.rows = minRows + rows
      }}
    ></textarea>
  )
}
