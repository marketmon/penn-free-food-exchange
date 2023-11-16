import { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  Form as FormShadcn,
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
import { FormInput, Meadow } from "@/lib/types";
import AuthPrompt from "@/components/Auth/AuthPrompt";

type AuthFormProps = {
  title: string;
  schema: ZodSchema<any>;
  defaultValues: {
    [key: string]: string;
  };
  inputs: FormInput[];
  handleInputs: (values: z.infer<ZodSchema<any>>) => Promise<void> | void;
  meadowsLoading?: boolean;
  meadows?: Meadow[];
};

export default function Form({
  title,
  schema,
  defaultValues,
  inputs,
  handleInputs,
  meadowsLoading,
  meadows,
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
    <div className="mb-8">
      <h1 className="text-center mt-2 mb-6">{title} to continue to Panbo</h1>
      <FormShadcn {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {inputs.map((input: FormInput) => (
            <FormField
              key={input.name}
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <FormItem>
                  {meadowsLoading ? (
                    <div>Loading</div>
                  ) : (
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
                            {meadows!.map((meadow) => (
                              <SelectItem
                                key={meadow.id}
                                value={JSON.stringify({
                                  domain: meadow.domain,
                                  id: meadow.id,
                                })}
                              >
                                {meadow.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input {...field} type={input.type} placeholder={input.label} />
                      )}
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {title === "Sign in" && <AuthPrompt promptTo="Forgot password" />}
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </form>
        {serverError && <div>{serverError}</div>}
      </FormShadcn>
    </div>
  );
}
