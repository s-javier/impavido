import { defineAction, type ActionAPIContext } from 'astro:actions'
import { z } from 'astro:schema'
import ky from 'ky'

export const server = {
  overcome: defineAction({
    accept: 'json',
    // input: z.object({
    //   title: z.string().min(4).max(100),
    //   isActive: z.boolean(),
    // }),
    handler: async (input: any, context: ActionAPIContext) => {
      console.log('AAA')
      let response
      try {
        response = await ky
          .post('https://api.ideogram.ai/generate', {
            timeout: false,
            headers: {
              'Api-Key': import.meta.env.IDEOGRAM_API_KEY,
            },
            json: {
              image_request: {
                prompt:
                  'Una imagen tenebrosa, cinematográfica y de tipo real relacionada con el siguiente miedo de una persona "Mi mayor miedo es contraer cáncer"',
                aspect_ratio: 'ASPECT_1_1',
                model: 'V_2',
                magic_prompt_option: 'AUTO',
                style_type: 'REALISTIC',
              },
            },
          })
          .json()
      } catch (error) {
        console.log('*** Err ***')
        console.log(error)
      }
      console.log('ZZZ')
      console.log(response)
    },
  }),
}
