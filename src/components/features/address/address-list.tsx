'use client';

// Imports

import { useState } from 'react';
import { MapPin, Phone, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils/tailwind-merge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGetAddresses } from '@/hooks/use-get-addresses';
import { useDeleteAddress } from '@/hooks/use-delete-address';
import type { Address } from '../../../lib/types/address';

// Types

interface AddressListProps {
  /** Callback function when edit button is clicked */
  onEdit: (address: Address) => void;
  /** Callback function to navigate to add new address step */
  onAddNew: () => void;
  /** Optional callback when an address card is clicked/selected */
  onSelect?: (address: Address) => void;
  /** ID of currently selected address for highlighting */
  selectedAddressId?: string | null;
}

// Component

/**
 * AddressList - Displays a list of user addresses with edit/delete actions
 *
 * Features:
 * - Fetches addresses from API using React Query
 * - Displays addresses with category badges
 * - Delete confirmation dialog with API integration
 * - Selection highlighting and optimized dark mode
 *
 * @param props - Component properties
 */
export default function AddressList({
  onEdit,
  onAddNew,
  onSelect,
  selectedAddressId,
}: AddressListProps) {
  // Query & Mutation

  const {
    data: addresses,
    isLoading,
    isError,
  } = useGetAddresses();
  const { deleteAddress, isPending: isDeleting } =
    useDeleteAddress();
  const t = useTranslations('pages.address.list');
  const tc = useTranslations('pages.address.categories');
  const ta = useTranslations('common.actions');

  // State

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);
  const [selectedForDeletion, setSelectedForDeletion] =
    useState<Address | null>(null);

  // Handlers

  /**
   * Open delete confirmation dialog
   * @param address - Address to be deleted
   */
  const handleDeleteClick = (address: Address) => {
    // Check if the address is currently selected
    if (address._id === selectedAddressId) {
      toast.error(t('deleteConfirm.error'));
      return;
    }

    setSelectedForDeletion(address);
    setDeleteDialogOpen(true);
  };

  /**
   * Finalize address deletion via API
   */
  const confirmDelete = async () => {
    if (selectedForDeletion) {
      deleteAddress(selectedForDeletion._id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSelectedForDeletion(null);
        },
      });
    }
  };

  // Render

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
        <p className="mb-4 text-red-500">{t('error')}</p>
        <Button onClick={() => window.location.reload()}>
          {ta('retry')}
        </Button>
      </div>
    );
  }

  const normalizedAddresses: Address[] = (
    addresses || []
  ).map((addr: Address) => ({
    _id: addr._id,
    username: addr.name,
    // category: addr.category || addr.type || tc('other'),
    street: addr.street,
    city: addr.city,
    phone: addr.phone,
    lat: addr.lat,
    long: addr.long,
  }));

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {t('title')}
        </h2>
        <Button
          onClick={onAddNew}
          variant="secondary"
          className="!px-3 text-end text-sm font-medium rtl:text-start"
        >
          {t('addNew')}
        </Button>
      </div>

      {/* Addresses List */}
      <div className="max-h-[500px]">
        <div className="space-y-3 p-4">
          {normalizedAddresses.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <MapPin className="mx-auto mb-4 h-16 w-16 opacity-30" />
              <p>{t('empty.title')}</p>
              <p className="text-sm">
                {t('empty.description')}
              </p>
            </div>
          ) : (
            normalizedAddresses
              .slice(-3)
              .map((address, index) => {
                const categories = [
                  tc('home'),
                  tc('work'),
                  tc('family'),
                ];
                const category =
                  categories[index] || tc('other');
                const isSelected =
                  selectedAddressId === address._id;

                return (
                  <div
                    key={address._id}
                    onClick={() => onSelect?.(address)}
                    className={cn(
                      'relative mb-5 cursor-pointer rounded-lg border-2 px-4 pb-2 pt-5 transition-all',
                      isSelected
                        ? 'border-red-500 shadow-md ring-2 ring-red-500 dark:border-softPink-500 dark:ring-softPink-300'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md',
                    )}
                  >
                    {/* Category Badge - Absolute Top Left */}
                    <div className="absolute -top-3 left-3 rounded-lg bg-white rtl:left-auto rtl:right-3 dark:bg-zinc-700">
                      <div className="rounded-full px-2">
                        <span className="text-sm font-semibold text-red-600 dark:text-softPink-500">
                          {category}
                        </span>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div dir="ltr" className="space-y-2">
                      {/* First Line: City and Phone */}
                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-green-500 p-1">
                            <MapPin className="h-4 w-4 text-white" />
                          </div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {address.city}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 rtl:flex-row-reverse dark:text-white">
                          <Phone className="h-4 w-4" />
                          <span
                            className="text-sm"
                            dir="ltr"
                          >
                            {address.phone}
                          </span>
                        </div>
                      </div>

                      {/* Second Line: Street Address */}
                      <p className="w-fit rounded-lg px-2 text-sm text-gray-600 dark:text-white">
                        {address.street}
                      </p>
                    </div>

                    {/* Action Buttons - Absolute Top Right */}
                    <div className="absolute -right-3 top-4 flex flex-col items-center gap-2 rtl:-left-3 rtl:right-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-red-600 dark:bg-zinc-700 dark:hover:text-softPink-500"
                        onClick={e => {
                          e.stopPropagation();
                          onEdit(address);
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-6 w-6 rounded-full border border-gray-200 text-white shadow-sm hover:border-red-200"
                        onClick={e => {
                          e.stopPropagation();
                          handleDeleteClick(address);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full">
                <Trash2 className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <DialogTitle className="text-center">
              {t('deleteConfirm.title')}
            </DialogTitle>
            <DialogDescription className="text-center">
              {selectedForDeletion && (
                <span className="font-medium text-gray-700">
                  {selectedForDeletion.city} -{' '}
                  {selectedForDeletion.street}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setDeleteDialogOpen(false);
                setSelectedForDeletion(null);
              }}
              disabled={isDeleting}
            >
              {t('deleteConfirm.cancel')}
            </Button>
            <Button
              variant="destructive"
              className="flex-1 bg-red-500 hover:bg-red-600"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting
                ? tc('deleting') || 'Deleting...'
                : t('deleteConfirm.confirm')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
