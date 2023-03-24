import { Message, OpenAIModel } from "@/types";

export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => { 
  try { 
    const { key, model, messages } = (await req.json()) as {
      key: string,
      conversation: string,
      model: OpenAIModel,
      messages: Message[]
    };
    const prompt = `Please generate a title for the following conversation`

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key ? key : process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: model.id,
        messages: [
          {
            role: "system",
            content: prompt
          },
          ...messages
        ],
        temperature: 0.8,
        max_tokens: 10,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        n: 1,
      }),
    });

    if (response.ok) {
      const data = await response.json()
      const chatTitle: string = data.choices[0].message.content.trim();
      return new Response(JSON.stringify(chatTitle), { status: 200 }); 
    } else {
      console.error(await response.text())
      return new Response("Error", { status: 500 });
    }
    
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}

export default handler;