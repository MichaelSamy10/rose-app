'use client';

import {
  LogOut,
  MapPinHouse,
  ScrollText,
  Settings,
  User,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@/i18n/navigation';
import { signOut, useSession } from 'next-auth/react';
interface AccountDropdownProps {
  trigger?: React.ReactNode;
}

export function AccountDropdown({
  trigger,
}: AccountDropdownProps) {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Trigger button to open the account dropdown menu */}
        {trigger || (
          <Button variant="outline">Account</Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {session?.user?.firstName +
            ' ' +
            session?.user?.lastName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {/* View and edit user profile information */}
          <DropdownMenuItem>
            <Link
              href={'/profile'}
              className="flex items-center"
            >
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>

          {/* Manage subscription and billing details */}
          <DropdownMenuItem>
            <Link href={'/'} className="flex items-center">
              <MapPinHouse className="mr-2 h-4 w-4" />
              <span>My Addresses</span>
            </Link>
          </DropdownMenuItem>

          {/* Access application settings and configuration */}
          <DropdownMenuItem>
            <Link href={'/'} className="flex items-center">
              <ScrollText className="mr-2 h-4 w-4" />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>

          {/* View available keyboard shortcuts */}
          <DropdownMenuItem>
            <Link
              href={'/dashboard'}
              className="flex items-center"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>
          <Link
            href={'/login'}
            className="flex items-center"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
