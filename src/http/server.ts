import fastify from "fastify"
import { PrismaClient} from "@prisma/client"
import {z} from "zod"

const app = fastify()

const prisma = new PrismaClient()

app.post("/polls", async(request, reply)=> {
  const creataPollBody = z.object({
    title: z.string()
  })
  const {title} = creataPollBody.parse(request.body)

  const poll = await prisma.poll.create({
    data:{
      title,
    }
  })

  return reply.status(201).send({
    pollId: poll.id
  })

})

app.listen({port: 3333}).then(()=> {
  console.log("HTTP server running🚀")
})