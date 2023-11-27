import { useState } from "react";
import { useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import { ZodSchema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form as FormShadcn,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormInput, Meadow } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import SuccessMessage from "@/components/common/Message/SuccessMessage";
import ErrorMessage from "@/components/common/Message/ErrorMessage";
import FormSubmit from "@/components/Auth/Form/FormSubmit";

type AuthFormProps = {
  schema: ZodSchema<any>;
  defaultValues: {
    [key: string]: string | boolean;
  };
  inputs: FormInput[];
  handleInputs: (values: z.infer<ZodSchema<any>>) => Promise<void> | void;
  meadowsLoading?: boolean;
  meadows?: Meadow[];
  showLabel?: boolean;
  additionalPrompt?: React.ReactNode;
  btnText?: string;
  disabled?: boolean;
  showSuccessMessage?: boolean;
};

export default function Form({
  schema,
  defaultValues,
  inputs,
  handleInputs,
  meadowsLoading,
  meadows,
  showLabel,
  additionalPrompt,
  btnText,
  disabled,
  showSuccessMessage,
}: AuthFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsLoading(true);
    try {
      await handleInputs(values);
      setStatus("success");
    } catch (error: any) {
      setStatus(error.errors[0].longMessage);
    }
    setIsLoading(false);
  };

  return (
    <FormShadcn {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mb-2">
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
                  <>
                    {showLabel && (
                      <FormLabel
                        className={`${
                          input.disabled && "opacity-25"
                        } text-sm font-medium`}
                      >
                        {input.label}
                      </FormLabel>
                    )}
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
                      ) : input.type === "toggle" ? (
                        <div className="flex flex-col space-y-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={input.disabled}
                          />
                        </div>
                      ) : input.type === "phone" ? (
                        <PhoneInput
                          defaultCountry="us"
                          value={field.value}
                          onChange={(phone) => {
                            field.onChange(phone);
                          }}
                        />
                      ) : (
                        <>
                          <Input
                            {...field}
                            type={input.type}
                            placeholder={input.label}
                            disabled={input.disabled}
                            autoComplete={
                              input.type === "password" ? input.name : "off"
                            }
                          />
                        </>
                      )}
                    </FormControl>
                  </>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <FormSubmit
          isLoading={isLoading}
          disabled={disabled}
          btnText={btnText}
          additionalPrompt={additionalPrompt}
        />
      </form>
      {status && status !== "success" && <ErrorMessage error={status} />}
      {showSuccessMessage && status === "success" && (
        <SuccessMessage success="Successfully updated" />
      )}
    </FormShadcn>
  );
}
