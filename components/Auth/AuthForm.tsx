"use client";

import { useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { meadows } from "@/constants/meadows";
import { FormInput } from "@/lib/types";

type AuthFormProps = {
  schema: ZodSchema<any>;
  defaultValues: {
    [key: string]: string;
  };
  inputs: FormInput[];
  handleInputs: (values: z.infer<ZodSchema<any>>) => void;
};

export default function AuthForm({
  schema,
  defaultValues,
  inputs,
  handleInputs,
}: AuthFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      handleInputs(values);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {inputs.map((input: z.infer<typeof schema>["input"]) => (
          <FormField
            key={input.name}
            control={form.control}
            name={input.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{input.label}</FormLabel>
                {input.type === "select" ? (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your meadow" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {meadows.map((meadow) => (
                        <SelectItem key={meadow.id} value={meadow.name}>
                          {meadow.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <FormControl>
                    <Input {...field} type={input.type} />
                  </FormControl>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
