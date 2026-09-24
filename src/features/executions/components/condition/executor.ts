import Handlebars from "handlebars";
import type { NodeExecutor } from "@/features/executions/types";

interface ConditionData {
  variableName?: string;
  leftOperand?: string;
  operator?: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "GREATER_THAN" | "LESS_THAN" | "IS_EMPTY" | "IS_NOT_EMPTY";
  rightOperand?: string;
}

export const conditionExecutor: NodeExecutor<ConditionData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  const left = Handlebars.compile(data.leftOperand || "")(context);
  const right = Handlebars.compile(data.rightOperand || "")(context);
  const operator = data.operator || "EQUALS";

  let conditionMet = false;

  switch (operator) {
    case "EQUALS":
      conditionMet = String(left).trim().toLowerCase() === String(right).trim().toLowerCase();
      break;
    case "NOT_EQUALS":
      conditionMet = String(left).trim().toLowerCase() !== String(right).trim().toLowerCase();
      break;
    case "CONTAINS":
      conditionMet = String(left).toLowerCase().includes(String(right).toLowerCase());
      break;
    case "GREATER_THAN":
      conditionMet = Number(left) > Number(right);
      break;
    case "LESS_THAN":
      conditionMet = Number(left) < Number(right);
      break;
    case "IS_EMPTY":
      conditionMet = !left || String(left).trim().length === 0;
      break;
    case "IS_NOT_EMPTY":
      conditionMet = Boolean(left && String(left).trim().length > 0);
      break;
    default:
      conditionMet = false;
  }

  const result = {
    matched: conditionMet,
    leftValue: left,
    rightValue: right,
    operator,
  };

  return {
    ...context,
    [data.variableName || "condition"]: result,
  };
};
