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
      let solutionImg: any
      let perspective: any
      let perspectiveImg: any
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
        const description = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: `¿Cuál es una explicación detallada del siguiente miedo de una persona "${input.fear}"? Explicar en no más de 200 palabras`,
            },
          ],
        })
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
        const solutionImage: any = await ky
          .post('https://api.ideogram.ai/generate', {
            timeout: 100000,
            headers: {
              'Api-Key': import.meta.env.IDEOGRAM_API_KEY,
            },
            json: {
              image_request: {
                // @ts-ignore
                prompt: `Una imagen muy escalofriante, atmósfera opresiva, muy oscura, realista y cinematográfica relacionada con el siguiente miedo de una persona "${description.content[0].text}". Los detalles visuales deben incluir que la expresión facial o corporal de una persona debe reflejar terror`,
                aspect_ratio: 'ASPECT_16_9',
                model: 'V_2',
                magic_prompt_option: 'AUTO',
                style_type: 'REALISTIC',
              },
            },
          })
          .json()
        const cloudinary = getCloudinary()
        solutionImg = `impavido/fear/${uuidv4()}`
        await cloudinary.uploader.upload(solutionImage.data[0].url, {
          public_id: solutionImg,
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        })
        perspective = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: `Entrégame una idea totalmente opuesta, positiva y esperanzadora al siguiente miedo de una persona "${input.fear}". Respuesta en un máximo de 200 caracteres`,
            },
          ],
        })
        const perspectiveImage: any = await ky
          .post('https://api.ideogram.ai/generate', {
            timeout: 100000,
            headers: {
              'Api-Key': import.meta.env.IDEOGRAM_API_KEY,
            },
            json: {
              image_request: {
                prompt: `Una imagen positiva, esperanzadora, realista y cinematográfica al siguiente miedo de una persona "${input.fear}. Los detalles visuales deben incluir que la expresión facial o corporal de una persona debe reflejar felicidad"`,
                aspect_ratio: 'ASPECT_16_9',
                model: 'V_2',
                magic_prompt_option: 'AUTO',
                style_type: 'REALISTIC',
              },
            },
          })
          .json()
        perspectiveImg = `impavido/perspective/${uuidv4()}`
        await cloudinary.uploader.upload(perspectiveImage.data[0].url, {
          public_id: perspectiveImg,
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        })
      } catch (error) {
        if (import.meta.env.DEV) {
          console.log('*** Err ***')
          console.log(error)
        }
      }
      return {
        solution: solution.content[0].text,
        solutionImg,
        perspective: perspective.content[0].text,
        perspectiveImg,
      }
      // throw new Error('test')
    },
  }),
}
