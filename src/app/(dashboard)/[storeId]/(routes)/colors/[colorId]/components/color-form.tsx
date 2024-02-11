"use client";

import type { Color } from "@prisma/client";
import type * as z from "zod";

import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { colorFormSchema } from "@/schemas";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";

interface ColorFormProps {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  initialData: Color | null;
}

type ColorFormValues = z.infer<typeof colorFormSchema>;

export function ColorForm({ initialData }: ColorFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const title = initialData ? "Edit color" : "Create color";
  const description = initialData ? "Edit your color" : "Create your color";
  const toastMessage = initialData ? "Color updated successfully" : "Color created successfully";
  const action = initialData ? "Save changes" : "Create color";
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(colorFormSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const { storeId, colorId } = params;

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/${storeId.toString()}/colors/${colorId.toString()}`, data);
      } else {
        await axios.post(`/api/${storeId.toString()}/colors`, data);
      }
      router.push(`/${storeId.toString()}/colors/`);
      router.refresh();
      toast.success(toastMessage);
      // window.location.assign(`/${res.data.id}`);
    } catch (error) {
      toast.error(`Something went wrong. Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId.toString()}/colors/${colorId.toString()}`);
      router.push(`/${storeId.toString()}/colors`);
      router.refresh();
      toast.success("Color deleted successfully");
    } catch (error) {
      // toast.error(`Something went wrong. Error: ${(error as Error).message}`);
      toast.error("Make sure you remove all product using this color first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading description={description} title={title} />
        {initialData ? (
          <Button
            disabled={loading}
            size="icon"
            variant="destructive"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
      <Separator />
      <Form {...form}>
        <form className="w-full space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Color name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-2">
                      <Input disabled={loading} placeholder="#F08080" {...field} />
                      <div
                        className="rounded-full border p-4"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="ml-auto" disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
