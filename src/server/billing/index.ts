import { MockPaymentGateway } from "./gateways/mock";
import { PaymentGateway } from "./types";

export * from "./types";
export { MockPaymentGateway } from "./gateways/mock";

// Registry of payment gateways. Swap or add Stripe / LemonSqueezy here whenever ready!
const gateways: Record<string, PaymentGateway> = {
  mock: new MockPaymentGateway(),
};

/**
 * Get active payment gateway.
 * Defaults to 'mock', or can be overridden via PAYMENT_GATEWAY env variable.
 */
export function getPaymentGateway(provider?: string): PaymentGateway {
  const chosen = provider || process.env.PAYMENT_GATEWAY || "mock";
  const gateway = gateways[chosen] || gateways["mock"];
  return gateway;
}
