'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { useLocale, useTranslations } from 'next-intl';
import { productSchema } from '@/lib/schemas/product.schema';
import { Textarea } from '@/components/ui/textarea';
import { ProductFields } from '@/app/[locale]/(auth)/register/_types/product-fields';
import useAllCategories from '@/hooks/use-all-category';
import useAllOccasions from '@/hooks/use-all-occasions';
import { useAddProduct } from '../_hooks/use-add-product';
import { useEffect } from 'react';
import { categories } from '@/lib/types/category';

export default function CreateProductForm() {
  // Translations
  const t = useTranslations(
    'pages.dashboard.products-page.add-product.form',
  );
  const locale = useLocale();

  // Query
  const { categories } = useAllCategories();
  const { occasions } = useAllOccasions();

  // Hooks
  const { isLoading, mutateAsync: addProduct } =
    useAddProduct();

  // Forms
  const form = useForm<ProductFields>({
    defaultValues: {
      title: '',
      description: '',
      price: '',
      discount: '',
      priceAfterDiscount: '',
      quantity: '',
      imgCover: undefined,
      images: undefined,
      category: '',
      occasion: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(productSchema(t)),
  });

  // Form methods
  const { watch, setValue } = form;

  // Watch price and discount
  const price = watch('price');
  const discount = watch('discount');

  // Functions
  const onSubmit: SubmitHandler<
    ProductFields
  > = async values => {
    try {
      await addProduct(values);
      toast.success(t('success-toast'));
      form.reset();
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : t('error-toast'),
      );
    }
  };

  // Automatically calculate price After Discount
  useEffect(() => {
    // If no price is entered (empty string), clear the discounted field
    if (price === '') {
      setValue('priceAfterDiscount', '');
      return;
    }

    const priceNum = Number(price) || 0;
    const discountNum = Number(discount) || 0;

    // Calculate discounted price (handles 0% discount correctly)
    const discounted =
      priceNum - (priceNum * discountNum) / 100;

    // Ensure 2 decimal places for consistent currency display
    setValue('priceAfterDiscount', discounted.toFixed(2));
  }, [price, discount, setValue]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-2/3 flex-col gap-5 rounded-2xl border-zinc-200 p-6"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="after:ms-0.5 after:text-red-600 after:content-['*']">
                {t('title-label')}
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t('title-placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="after:ms-0.5 after:text-red-600 after:content-['*']">
                {t('description-label')}
              </FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  rows={7}
                  placeholder={t('description-placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full gap-2">
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="after:ms-0.5 after:text-red-600 after:content-['*']">
                  {t('price-label')}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={t('price-placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Discount */}
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>{t('discount-label')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={t('discount-placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price after discount */}
          <FormField
            control={form.control}
            name="priceAfterDiscount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  {t('price-after-discount-label')}
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-zinc-100"
                    type="number"
                    readOnly
                    placeholder={t(
                      'price-after-discount-placeholder',
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Quantity */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="after:ms-0.5 after:text-red-600 after:content-['*']">
                {t('quantity-label')}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t('quantity-placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-4">
          {/* Product cover image */}
          <FormField
            control={form.control}
            name="imgCover"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="after:ms-0.5 after:text-red-600 after:content-['*']">
                  {t('img-cover-label')}
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={e =>
                      field.onChange(e.target.files?.[0])
                    }
                    onBlur={field.onBlur}
                    ref={field.ref}
                    name={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Gallery */}
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="after:ms-0.5 after:text-red-600 after:content-['*']">
                  {t('images-label')}
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={e =>
                      field.onChange(e.target.files)
                    }
                    onBlur={field.onBlur}
                    ref={field.ref}
                    name={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Categories */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="after:ms-0.5 after:text-red-600 after:content-['*']">
                {t('category-label')}
              </FormLabel>
              <FormControl>
                <Select
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t(
                          'select-placeholder',
                        )}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper">
                    {categories?.map(
                      (category: categories) => (
                        <SelectItem
                          key={category._id}
                          value={category._id}
                          className="capitalize"
                        >
                          {category.name}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Occasions */}
        <FormField
          control={form.control}
          name="occasion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="after:ms-0.5 after:text-red-600 after:content-['*']">
                {t('occasion-label')}
              </FormLabel>
              <FormControl>
                <Select
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t(
                          'select-placeholder',
                        )}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper">
                    {occasions?.map(occasion => (
                      <SelectItem
                        key={occasion._id}
                        value={occasion._id}
                        className="capitalize"
                      >
                        {occasion.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          loading={isLoading}
          className="mt-32 capitalize"
        >
          {t('submit-btn')}
        </Button>
      </form>
    </Form>
  );
}
