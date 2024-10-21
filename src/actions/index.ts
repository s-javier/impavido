import { defineAction, type ActionAPIContext } from 'astro:actions'
import { z } from 'astro:schema'
import ky from 'ky'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'

import { getCloudinary } from '~/utils/cloudinary'
import { anthropic } from '~/utils/anthropic'

export const server = {
  overcome: defineAction({
    accept: 'json',
    // input: z.object({
    //   title: z.string().min(4).max(100),
    //   isActive: z.boolean(),
    // }),
    handler: async (input: any, context: ActionAPIContext) => {
      console.log('AAA')
      let response: any
      try {
        // response = await ky
        //   .post('https://api.ideogram.ai/generate', {
        //     timeout: false,
        //     headers: {
        //       'Api-Key': import.meta.env.IDEOGRAM_API_KEY,
        //     },
        //     json: {
        //       image_request: {
        //         prompt:
        //           'Una imagen tenebrosa, oscura, realista y cinematográfica relacionada con el siguiente miedo de una persona "tengo miedo de tener un accidente vehicular"',
        //         aspect_ratio: 'ASPECT_1_1',
        //         model: 'V_2',
        //         magic_prompt_option: 'AUTO',
        //         style_type: 'REALISTIC',
        //       },
        //     },
        //   })
        //   .json()
        // const cloudinary = getCloudinary()
        // await cloudinary.uploader.upload(response.data[0].url, {
        //   public_id: `impavido/fear/${uuidv4()}`,
        //   use_filename: true,
        //   unique_filename: false,
        //   overwrite: true,
        // })
        // response = await anthropic.messages.create({
        //   model: 'claude-3-5-sonnet-20240620',
        //   max_tokens: 1024,
        //   messages: [
        //     {
        //       role: 'user',
        //       content:
        //         '¿Cuál podría ser la solución al siguiente miedo de una persona "tengo miedo de tener un accidente vehicular"? En un párrafo entrégame la mejor solución',
        //     },
        //   ],
        // })
        response = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content:
                'Entrégame una idea totalmente opuesta, positiva y esperanzadora al siguiente miedo de una persona "tengo miedo de tener un accidente vehicular"? La respuesta en un párrafo',
            },
          ],
        })
      } catch (error) {
        console.log('*** Err ***')
        console.log(error)
      }
      console.log('ZZZ')
      console.log(response)
    },
  }),
}
