import { FormInput } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";
import { useCreateListing } from "@/context/CreateListingProvider";
import { ICON_LIST } from "@/lib/constants";
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
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

type ListingFormProps = {
  schema: ZodSchema<any>;
  defaultValues: {
    [key: string]: string;
  };
  onSubmit: (values: z.infer<ZodSchema<any>>) => Promise<void> | void;
  isLoading: boolean;
};

const LISTING_FORM_INPUTS = [
  {
    name: "icon",
    label: "Marker Icon",
    type: "select",
  },
  {
    name: "location",
    label: "Location",
    type: "text",
  },
  {
    name: "caption",
    label: "Caption (Optional)",
    type: "textarea",
  },
  {
    name: "contact",
    label: "Contact (optional)",
    type: "tel",
  },
];

export default function ListingForm({
  schema,
  defaultValues,
  onSubmit,
  isLoading,
}: ListingFormProps) {
  const { setIcon } = useCreateListing();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {LISTING_FORM_INPUTS.map((input: FormInput) => (
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
                      onValueChange={(value) => {
                        field.onChange(value);
                        setIcon(value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ICON_LIST!.map((icon) => (
                          <SelectItem key={icon.id} value={icon.icon}>
                            {icon.icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : input.type === "textarea" ? (
                    <Textarea />
                  ) : input.type === "tel" ? (
                    <PhoneInput
                      defaultCountry="us"
                      value={field.value}
                      onChange={(phone) => {
                        field.onChange(phone);
                      }}
                    />
                  ) : (
                    <Input {...field} type={input.type} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={isLoading}>
          Continue
        </Button>
      </form>
    </Form>
  );
}
