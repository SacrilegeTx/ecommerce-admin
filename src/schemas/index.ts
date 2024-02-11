import * as z from "zod";

export const settingsFormSchema = z.object({
  name: z.string().min(1).max(50),
});

export const billboardFormSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

export const categoryFormSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

export const sizeFormSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

export const colorFormSchema = z.object({
  name: z.string().min(1),
  value: z
    .string()
    .min(4)
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
      message: "String must be a valid hex color code.",
    }),
});

export const productFormSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  // imageUrls: z.array(z.string().min(1)),
  images: z.object({ url: z.string() }).array(),
  isFeatured: z.boolean(),
  isArchived: z.boolean(),
});
