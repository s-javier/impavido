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
    input: z.object({
      fear: z.string().min(5).max(300),
    }),
    handler: async (input: any, context: ActionAPIContext) => {
      let solution: any
      let imageSolution: any
      try {
        const isFear = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: `La siguiente frase "${input.fear}", ¿corresponde a un posible miedo de una persona? Responder "Sí" o "No"`,
            },
          ],
        })
        // @ts-ignore
        if (isFear.content[0].text === 'No') {
          return {
            error: 'El texto ingresado no corresponde a un miedo que puedas tener.',
          }
        }
        solution = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: `¿Cuál podría ser la forma de superar el siguiente miedo de una persona "${input.fear}"? En un párrafo de máximo 500 caracteres, entrégame la mejor respuesta`,
            },
          ],
        })
        const imgSolution: any = await ky
          .post('https://api.ideogram.ai/generate', {
            timeout: false,
            headers: {
              'Api-Key': import.meta.env.IDEOGRAM_API_KEY,
            },
            json: {
              image_request: {
                prompt: `Una imagen muy escalofriante, muy oscura, realista y cinematográfica relacionada con el siguiente miedo de una persona "${input.fear}"`,
                aspect_ratio: 'ASPECT_16_9',
                model: 'V_2',
                magic_prompt_option: 'AUTO',
                style_type: 'REALISTIC',
              },
            },
          })
          .json()
        const cloudinary = getCloudinary()
        imageSolution = `impavido/fear/${uuidv4()}`
        await cloudinary.uploader.upload(imgSolution.data[0].url, {
          public_id: imageSolution,
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        })

        // response = await anthropic.messages.create({
        //   model: 'claude-3-5-sonnet-20240620',
        //   max_tokens: 1024,
        //   messages: [
        //     {
        //       role: 'user',
        //       content:
        //         'Entrégame una idea totalmente opuesta, positiva y esperanzadora al siguiente miedo de una persona "tengo miedo de tener un accidente vehicular"? La respuesta en un párrafo',
        //     },
        //   ],
        // })
      } catch (error) {
        if (import.meta.env.DEV) {
          console.log('*** Err ***')
          console.log(error)
        }
      }
      return {
        solution: solution.content[0].text,
        imageSolution,
      }
      // throw new Error('test')
    },
  }),
}
