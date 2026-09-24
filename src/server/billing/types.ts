export interface CheckoutSessionParams {
  userId: string;
  userEmail: string;
  creditPackageId: string;
  credits: number;
  amountInCents: number;
  returnUrl: string;
}

export interface CheckoutSessionResult {
  checkoutUrl: string;
  intentId: string;
  provider: string;
}

export interface PaymentGateway {
  name: string;
  createCheckoutSession(
    params: CheckoutSessionParams
  ): Promise<CheckoutSessionResult>;
  completePayment?(intentId: string): Promise<boolean>;
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  priceInCents: number;
  currency: string;
  description: string;
  badge?: string;
}

export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: "starter",
    name: "Starter Pack",
    credits: 100,
    priceInCents: 500, // $5.00
    currency: "USD",
    description: "Ideal for testing workflows and prototyping automated triggers.",
  },
  {
    id: "growth",
    name: "Growth Pack",
    credits: 500,
    priceInCents: 1900, // $19.00
    currency: "USD",
    description: "Great for regular workflows and frequent AI generation runs.",
    badge: "Popular",
  },
  {
    id: "power",
    name: "Power Operator",
    credits: 2000,
    priceInCents: 5900, // $59.00
    currency: "USD",
    description: "For high-volume multi-agent chains and automated data pipelines.",
    badge: "Best Value",
  },
];
