import OpenAI from "openai";
import { Completions } from "openai/resources";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: any) {

    try {
        const {message} = await request.json()

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {role: 'user' , content: message}
            ]
        })

        return Response.json({
            response: completion.choices[0].message.content 
        })
    } catch (error) {
        return Response.json({
            error: "Failded to Process",
        })
    }
    
}