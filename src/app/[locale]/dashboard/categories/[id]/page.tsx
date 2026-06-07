'use client';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormItem,
  FormLabel,
  Form,
  FormField,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { updateCategoryAction } from '../_actions/update-categories.actions';
import {
  useParams,
  useSearchParams,
} from 'next/navigation';
import { Link, useRouter } from '@/i18n/navigation';
import { Image as Img } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

// Type
type FormValues = {
  name: string;
};

export default function UpdateCategoriesPage() {
  // Transilation
  const t = useTranslations('dashboard.categories');

  // Navigation
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // Query
  const queryClient = useQueryClient();

  // Variable
  const categoryId = params.id as string;
  const categoryName = searchParams.get('name') || '';
  const categoryImage = searchParams.get('image') || '';

  // Form
  const form = useForm<FormValues>({
    defaultValues: {
      name: categoryName,
    },
  });

  return (
    <div className="ml-3 mt-3 flex min-h-screen flex-col">
      <div className="container max-w-3xl rounded-2xl">
        {/* Title */}
        <h2 className="mb-6 text-2xl font-semibold">
          {t('update-category')}: {categoryName}
        </h2>

        {/* form */}
        <div className="h-96 rounded-2xl bg-white p-3">
          <Form {...form}>
            {/* function */}
            <form
              action={async (formData: FormData) => {
                const result = await updateCategoryAction(
                  categoryId,
                  formData,
                );
                if (result.success) {
                  toast.success(result.message);
                  queryClient.invalidateQueries({
                    queryKey: ['categories'],
                  });
                  setTimeout(() => {
                    router.push('/dashboard/categories');
                  }, 1000);
                } else {
                  toast.error(result.message);
                }
              }}
              className="flex flex-col gap-6"
            >
              {/* name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('name')}{' '}
                      <span className="text-red-600">
                        *
                      </span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        name="name"
                        placeholder="Flowers"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* view image */}
              {categoryImage && (
                <Link
                  href={categoryImage}
                  target="_blank"
                  className="w-fite ml-auto mt-1 flex items-center gap-2 rounded-lg border border-gray-200 p-2 text-sm text-blue-600"
                >
                  <Img className="h-5 w-5" />
                  {t('view-category-image')}
                </Link>
              )}

              {/* button update */}
              <Button
                type="submit"
                className="mt-16 h-10 rounded-md bg-maroon-600 font-semibold text-white hover:bg-maroon-800"
              >
                {t('update-category')}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
