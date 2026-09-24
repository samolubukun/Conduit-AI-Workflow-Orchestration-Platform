"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GitForkIcon } from "lucide-react";

const formSchema = z.object({
  variableName: z
    .string()
    .min(1, { message: "Variable name is required" })
    .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, {
      message:
        "Variable name must start with a letter or underscore and contain only letters, numbers, and underscores",
    }),
  leftOperand: z.string().min(1, "Left operand is required"),
  operator: z.enum([
    "EQUALS",
    "NOT_EQUALS",
    "CONTAINS",
    "GREATER_THAN",
    "LESS_THAN",
    "IS_EMPTY",
    "IS_NOT_EMPTY",
  ]),
  rightOperand: z.string().optional(),
});

export type ConditionFormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ConditionFormValues) => void;
  defaultValues?: Partial<ConditionFormValues>;
}

export const ConditionDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: Props) => {
  const form = useForm<ConditionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variableName: defaultValues.variableName || "myCondition",
      leftOperand: defaultValues.leftOperand || "",
      operator: defaultValues.operator || "EQUALS",
      rightOperand: defaultValues.rightOperand || "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        variableName: defaultValues.variableName || "myCondition",
        leftOperand: defaultValues.leftOperand || "",
        operator: defaultValues.operator || "EQUALS",
        rightOperand: defaultValues.rightOperand || "",
      });
    }
  }, [open, defaultValues, form]);

  const watchOperator = form.watch("operator");
  const watchVariableName = form.watch("variableName") || "myCondition";
  const needsRightOperand =
    watchOperator !== "IS_EMPTY" && watchOperator !== "IS_NOT_EMPTY";

  const handleSubmit = (values: ConditionFormValues) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
              <GitForkIcon className="size-5" />
            </div>
            <div>
              <DialogTitle>Condition Evaluator</DialogTitle>
              <DialogDescription>
                Evaluate variables and branch logic based on boolean outcome.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-2"
          >
            <FormField
              control={form.control}
              name="variableName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variable Name</FormLabel>
                  <FormControl>
                    <Input placeholder="myCondition" {...field} />
                  </FormControl>
                  <FormDescription>
                    Outcome available via: {`{{${watchVariableName}.matched}}`} (true/false)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="leftOperand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value / Variable</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. {{stripeEvent.amount}} or {{webSearch.answer}}"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="operator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operator</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Operator" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="EQUALS">Equals (==)</SelectItem>
                      <SelectItem value="NOT_EQUALS">Does Not Equal (!=)</SelectItem>
                      <SelectItem value="CONTAINS">Contains</SelectItem>
                      <SelectItem value="GREATER_THAN">Greater Than (&gt;)</SelectItem>
                      <SelectItem value="LESS_THAN">Less Than (&lt;)</SelectItem>
                      <SelectItem value="IS_EMPTY">Is Empty / Null</SelectItem>
                      <SelectItem value="IS_NOT_EMPTY">Is Not Empty</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {needsRightOperand && (
              <FormField
                control={form.control}
                name="rightOperand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compare Against</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 100 or 'success' or {{otherVar}}"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter className="mt-4">
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
