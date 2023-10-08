import { useState } from "react";
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
import { meadows } from "@/lib/constants";
import { FormInput } from "@/lib/types";
import AuthPrompt from "./AuthPrompt";

type AuthFormProps = {
  title: string;
  schema: ZodSchema<any>;
  defaultValues: {
    [key: string]: string;
  };
  inputs: FormInput[];
  handleInputs: (values: z.infer<ZodSchema<any>>) => Promise<void> | void;
};

export default function AuthForm({
  title,
  schema,
  defaultValues,
  inputs,
  handleInputs,
}: AuthFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsLoading(true);
    try {
      await handleInputs(values);
    } catch (error: any) {
      setServerError(error.errors[0].longMessage);
    }
    setIsLoading(false);
  };

  return (
    <>
      <h1>{title}</h1>
      <h3>to continue to Panbo</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {inputs.map((input: FormInput) => (
            <FormField
              key={input.name}
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{input.label}</FormLabel>
                  <FormControl>
                    {input.type === "select" ? (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your meadow" />
                        </SelectTrigger>
                        <SelectContent>
                          {meadows.map((meadow) => (
                            <SelectItem key={meadow.id} value={meadow.name}>
                              {meadow.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input {...field} type={input.type} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {title === "Sign in" && <AuthPrompt promptTo="Forgot password"/>}
          <Button type="submit" disabled={isLoading}>
            Continue
          </Button>
        </form>
        {serverError && <div>{serverError}</div>}
      </Form>
    </>
  );
}
