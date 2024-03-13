import { OrganizationSwitcher, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";

export function Header() {
  return (
    <div className="border-b">
      <div className="container flex justify-between items-center py-4 bg-neutral-100">
        <Link href='/'>File Roof</Link>

        <SignedIn>
          <Button variant={"outline"}>
            <Link href="/dashboard/files">Your Files</Link>
          </Button>
        </SignedIn>

        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />

          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
