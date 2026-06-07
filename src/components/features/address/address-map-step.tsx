'use client';

// Imports

import { useState, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  MapMouseEvent,
} from '@vis.gl/react-google-maps';
import { MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAddAddress } from '@/hooks/use-add-address';
import { useUpdateAddress } from '@/hooks/use-update-address';
import type {
  Address,
  AddressFormData,
} from '../../../lib/types/address';

// Types

const DEFAULT_CENTER = { lat: 30.0444, lng: 31.2357 };

interface AddressMapStepProps {
  /** Validated form data from Step 1 */
  formData: AddressFormData;
  /** Existing address object if in edit mode */
  editingAddress?: Address | null;
  /** Session username for attribution */
  username: string;
  /** Callback after successful save */
  onSave: () => void;
}

// Component

/**
 * AddressMapStep - Step 2 of the address wizard: Precise location picker
 *
 * Features:
 * - Interactive Google Map for pin placement
 * - Geolocation support (Find Your Location)
 * - Managed camera state for smooth navigation
 * - Integrated API calls for create/update
 *
 * @param props - Component properties
 */
export default function AddressMapStep({
  formData,
  editingAddress,
  username,
  onSave,
}: AddressMapStepProps) {
  // Context

  const t = useTranslations('pages.address.map');

  // State

  const initialCenter =
    editingAddress?.latitude && editingAddress?.longitude
      ? {
          lat: Number(editingAddress.latitude),
          lng: Number(editingAddress.longitude),
        }
      : DEFAULT_CENTER;

  const [selectedLocation, setSelectedLocation] =
    useState(initialCenter);
  const [cameraProps, setCameraProps] = useState({
    center: initialCenter,
    zoom: 14,
  });

  // Mutation

  const { addAddress, isPending: isAdding } =
    useAddAddress();
  const { updateAddress, isPending: isUpdating } =
    useUpdateAddress();
  const isPending = isAdding || isUpdating;

  // Variables

  const isEditing = !!editingAddress;

  // Handlers

  /**
   * Update selected location on map click
   * @param e - Map mouse event
   */
  const handleMapClick = useCallback((e: MapMouseEvent) => {
    if (e.detail.latLng) {
      const newPos = {
        lat: e.detail.latLng.lat,
        lng: e.detail.latLng.lng,
      };
      setSelectedLocation(newPos);
      setCameraProps(prev => ({ ...prev, center: newPos }));
    }
  }, []);

  /**
   * Sync camera state with map interactions
   * @param ev - Camera change event
   */
  const handleCameraChange = useCallback(
    (ev: {
      detail: {
        center: { lat: number; lng: number };
        zoom: number;
      };
    }) => {
      setCameraProps({
        center: ev.detail.center,
        zoom: ev.detail.zoom,
      });
    },
    [],
  );

  /**
   * Request user's current geolocation
   */
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const newPos = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setSelectedLocation(newPos);
          setCameraProps(prev => ({
            ...prev,
            center: newPos,
          }));
        },
        () => toast.error(t('errors.unable')),
      );
    } else {
      toast.error(t('errors.notSupported'));
    }
  };

  /**
   * Final confirmation and API submission
   */
  const handleConfirm = () => {
    const payload = {
      street: formData.street,
      phone: formData.phone,
      city: formData.city,
      lat: String(selectedLocation.lat),
      long: String(selectedLocation.lng),
      username,
    };

    if (editingAddress) {
      updateAddress(
        { addressId: editingAddress._id, fields: payload },
        { onSuccess: () => onSave() },
      );
    } else {
      addAddress(payload, { onSuccess: () => onSave() });
    }
  };

  // Render

  return (
    <>
      {/* Google Map */}
      <div className="relative mb-4 h-100 overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-600">
        <APIProvider
          apiKey={
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
            ''
          }
        >
          <Map
            style={{ width: '100%', height: '100%' }}
            {...cameraProps}
            onCameraChanged={handleCameraChange}
            onClick={handleMapClick}
            gestureHandling="greedy"
            disableDefaultUI
            mapId="DEMO_MAP_ID"
          >
            {/* Use Current Location Button */}
            <Button
              variant="secondary"
              onClick={handleUseCurrentLocation}
              className="absolute right-4 top-4 z-10 flex items-center justify-center gap-2 border-2 border-red-500 px-2 py-2.5 text-sm font-medium rtl:left-4 rtl:right-auto dark:border-softPink-400"
            >
              <MapPin className="h-4 w-4" />
              {t('findMe')}
            </Button>
            <AdvancedMarker position={selectedLocation} />
          </Map>
        </APIProvider>
      </div>

      {/* Selected location display */}
      <div className="mb-4 rounded-lg bg-gray-50 p-2 text-center dark:bg-zinc-800">
        <p className="text-xs text-gray-600 dark:text-gray-300">
          📍 {selectedLocation.lat.toFixed(4)},{' '}
          {selectedLocation.lng.toFixed(4)}
        </p>
      </div>

      {/* Confirm button */}
      <div className="space-y-3">
        <Button
          onClick={handleConfirm}
          disabled={isPending}
          className="h-12 w-full rounded-lg text-base font-medium"
        >
          {isPending
            ? t('saving')
            : isEditing
              ? t('update')
              : t('add')}
        </Button>
      </div>
    </>
  );
}
