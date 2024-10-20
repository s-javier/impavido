import { defineAction, type ActionAPIContext } from 'astro:actions'
import { z } from 'astro:schema'
import ky from 'ky'
import OpenAI from 'openai'

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
        const openai = new OpenAI({
          organization: import.meta.env.OPENAI_ORG_ID,
          project: import.meta.env.OPENAI_PROJECT_ID,
          apiKey: import.meta.env.OPENAI_API_KEY,
        })
        response = await openai.images.generate({
          prompt:
            'Una imagen tenebrosa, cinematográfica y de tipo real relacionada con el siguiente miedo de un ser humano "A que me despidan del trabajo"',
          n: 1,
          size: '1024x1024',
        })
        // response = await ky
        //   .post('https://api.openai.com/v1/images/generations', {
        //     headers: {
        //       Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`,
        //     },
        //     json: {
        //       model: 'dall-e-3',
        //       prompt:
        //         'Una imagen tenebrosa, cinematográfica y de tipo real relacionada con el siguiente miedo "Mi mayor miedo es perder mi trabajo"',
        //       n: 1,
        //       size: '1024x1024',
        //     },
        //   })
        //   .json()
        // response = await fetch('https://api.openai.com/v1/images/generations', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`,
        //   },
        //   body: JSON.stringify({
        //     model: 'dall-e-3',
        //     prompt:
        //       'Una imagen tenebrosa, cinematografica y de tipo real relacionada con el siguiente miedo "Mi mayor miedo es perder mi trabajo"',
        //     n: 1,
        //     size: '1024x1024',
        //   }),
        // })
      } catch (error) {
        console.log('*** Err ***')
        console.log(error)
      }
      console.log('ZZZ')
      console.log(response)
    },
  }),
}
