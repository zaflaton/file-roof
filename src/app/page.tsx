"use client"
import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(3).max(200),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, `Required`),
})

export default function Home() {
  const { toast } = useToast()

  const user = useUser()
  const organization = useOrganization()
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  })

  const fileRef = form.register("file")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!orgId) return

    const postUrl = await generateUploadUrl()

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": values.file[0].type },
      body: values.file[0]
    })
    const { storageId } = await result.json()

    createFile({
      name: values.title,
      type: 'image',
      fileId: storageId,
      orgId,
    })

    form.reset()
    setIsFileDialogOpen(false)

    toast({
      variant: 'success',
      title: 'File Uploaded',
      description: 'Your file is successfully uploaded'
    })
  }



  let orgId: string | undefined = undefined
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }

  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false)

  const files = useQuery(api.files.getFiles,
    orgId ? { orgId } : 'skip')
  const createFile = useMutation(api.files.createFile)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold"></h1>
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>
      })}

      <Dialog open={isFileDialogOpen} onOpenChange={(isOpen) => {
        setIsFileDialogOpen(isOpen)
        form.reset()
      }}>

        <DialogTrigger asChild>
          <Button>
            add file
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-8">Upload Your File Here!</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>title</FormLabel>
                        <FormControl>
                          <Input placeholder="file title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="file"
                    render={() => (
                      <FormItem>
                        <FormLabel>File</FormLabel>
                        <FormControl>
                          <Input type='file' {...fileRef}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={form.formState.isSubmitting} className="flex gap-1">
                    {form.formState.isSubmitting && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    Submit</Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </main>
  )
}
