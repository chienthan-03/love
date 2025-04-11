"use client";

import { forwardRef, useImperativeHandle, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@euroland/ci-shadcn-styleguide";
import { z } from "zod";

const FormSchema = z.object({
  company: z.string().min(1, "Company name is required"),
});

interface AvailableToolSettingProps {
  handleRef: React.Ref<any>;
  onDraftChange: (values: any) => void;
  initState: any;
}

const AvailableToolSetting = forwardRef(
  ({ handleRef, onDraftChange, initState }: AvailableToolSettingProps) => {
    const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        company: "",
        ...initState,
      },
      mode: "onChange",
    });

    const { watch, getValues } = form;

    useEffect(() => {
      const subscription = watch(() => {
        console.log("Draft changed:", getValues());
        onDraftChange(structuredClone(getValues()));
      });
      return () => subscription.unsubscribe();
    }, [watch, getValues, onDraftChange]);

    const handleSubmit = async () => {
      const isValid = await form.trigger();
      if (isValid) {
        const data = form.getValues();
        return true;
      } else {
        console.log("Failed:", form.formState.errors);
        return false;
      }
    };

    useImperativeHandle(
      handleRef,
      () => ({
        onSubmit: handleSubmit,
      }),
      []
    );
    
    return (
      <Form {...form}>
        <div className="flex flex-wrap gap-5">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Company name</FormLabel>
                <FormControl>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    );
  }
);

export default AvailableToolSetting;
