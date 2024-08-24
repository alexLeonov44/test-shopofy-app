import {
  Page,
  TextField,
  Button,
  BlockStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { Form, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import db from "../db.server"

export const loader = async()=>{

  const settings = await db.settings.findFirst()
  console.log(settings, 'settings=>>>>>>>>>>>>>')
  return json(settings)
}

export const action = async({ request }: LoaderFunctionArgs)=>{
   let settings = await request.formData()
   settings = Object.fromEntries(settings)

   await db.settings.upsert({
    where:{
      id: '2'
    },
    update: {
       id: '2',
      name: settings.name,
      description: settings.description
    },
    create: {
       id: '2',
      name: settings.name,
      description: settings.description
    },
   })
   
   return json(settings)
}

export default function AdditionalPage() {
  const settings = useLoaderData<typeof loader>()
  const [formState, setFormState] = useState(settings)
  return (
    <Page>
      <TitleBar title="Settings" />
      <Form method="POST">
        <BlockStack gap='400'>
      <TextField label="name" name="name" value={formState?.name} onChange={value=>setFormState(prev=> ({...prev, name: value}))} autoComplete="false"/>
      <TextField
        value={formState?.description}
        label="description"
        name="description"
        onChange={value=> setFormState(prev=> ({...prev, description: value}))}
        autoComplete="email"
      />
      <Button submit>Save</Button>
      </BlockStack>
    </Form>
    </Page>
  );
}
