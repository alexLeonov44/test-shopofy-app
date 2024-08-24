
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader = async()=>{
  const setting ={
    ok: true,
    message: 'Hello from API'
  }
  return json(setting)
}

export const action = async({ request }: LoaderFunctionArgs)=>{
   const method = request.method
   switch (method) {
    case "POST":
      return json({ message: 'succes', addD: 'add d', method: "POST"})

    case "PATCH":
      return json({ message: 'succes', addD: 'add d', method: "PATCH"})
      
    case "DELETE":
      return json({ message: 'succes', addD: 'add d', method: "DELETE"})
    
    default:
    return new Response("method not allowed")
   }
}