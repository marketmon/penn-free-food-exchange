import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, Meadow } from "@/lib/types";
import {
  Form as FormShadcn,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Select from "@/components/common/Form/FormInput/Select";
import SuccessMessage from "@/components/common/Message/SuccessMessage";
import ErrorMessage from "@/components/common/Message/ErrorMessage";
import TextInput from "@/components/common/Form/FormInput/TextInput";
import File from "@/components/common/Form/FormInput/File";
import FormLabel from "@/components/common/Form/FormLabel";
import ButtonSubmit from "@/components/common/Button/ButtonSubmit";

type FormProps = {
  schema: ZodSchema<any>;
  defaultValues: {
    [key: string]: string | boolean;
  };
  inputs: FormInput[];
  handleSubmit: (values: z.infer<ZodSchema<any>>) => Promise<void> | void;
  isLoadingFromMutateFunction?: boolean;
  btnDisabled?: boolean;
  showLabel?: boolean;
  additionalPrompt?: React.ReactNode;
  btnText?: string;
  btnLoadingText?: string;
  showSuccessMessage?: boolean;
  meadowsLoading?: boolean;
  meadows?: Meadow[];
  setIcon?: Dispatch<SetStateAction<string>>;
  error?: Error | null;
  formStyles: string;
};

export default function Form({
  schema,
  defaultValues,
  inputs,
  handleSubmit,
  isLoadingFromMutateFunction,
  btnDisabled,
  showLabel,
  additionalPrompt,
  btnText = "Continue",
  btnLoadingText = "Continuing",
  showSuccessMessage,
  meadowsLoading,
  meadows,
  setIcon,
  error,
  formStyles,
}: FormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState<{
    error: string | null;
    success: string | null;
  }>({
    error: null,
    success: null,
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsLoading(true);

    try {
      await handleSubmit(values);
      setStatus({
        error: null,
        success: "Successfully updated",
      });
    } catch (error: any) {
      setStatus({
        error: error.errors
          ? error.errors[0].longMessage
          : error.toString().split(": ").length > 1
          ? error.toString().split(": ")[1]
          : "Server error",
        success: null,
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (error) {
      setStatus({
        error: error?.message,
        success: null,
      });
    } else {
      setStatus({
        error: null,
        success: null,
      });
    }
  }, [error]);

  return (
    <FormShadcn {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={formStyles}>
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
                    {showLabel && <FormLabel input={input} />}
                    <FormControl>
                      {input.type === "select" ? (
                        <Select
                          value={field.value}
                          onChange={field.onChange}
                          input={input}
                          meadows={meadows}
                          setIcon={setIcon}
                        />
                      ) : input.type === "file" ? (
                        <File input={input} />
                      ) : (
                        <TextInput
                          value={field.value}
                          onChange={field.onChange}
                          input={input}
                        />
                      )}
                    </FormControl>
                  </>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div
          className={`space-y-2 ${
            btnText !== "Continue" && btnText !== "Verify" && "pt-4"
          }`}
        >
          <div className="space-y-3">
            {additionalPrompt}
            <ButtonSubmit
              btnText={btnText}
              btnLoadingText={btnLoadingText}
              isLoading={isLoading || (isLoadingFromMutateFunction ?? false)}
              disabled={btnDisabled}
            />
          </div>
        </div>
      </form>
      <div className="mt-2">
        {status.error && <ErrorMessage error={status.error} />}
        {status.success && showSuccessMessage && (
          <SuccessMessage success={status.success} />
        )}
      </div>
    </FormShadcn>
  );
}
