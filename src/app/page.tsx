'use client'
import { SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { Button } from '../components/ui/button'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function Home() {
  const files = useQuery(api.files.getFiles)
  const createFile = useMutation(api.files.createFile)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <Button variant="secondary">
          <SignOutButton />
        </Button>
      </SignedIn>
      <SignedOut>
        <Button variant="secondary">
          <SignInButton mode="modal" />
        </Button>
      </SignedOut>
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>
      })}
      <Button
        onClick={() => {
          createFile({
            name: 'hello world',
          })
        }}>
        add file
      </Button>
    </main>
  )
}
