"use client";

import * as React from "react";
import { cn } from "./utils";

export function PricingTableFour({
  plans,
  title = "Choose Your Plan",
  subtitle,
  description,
  theme = "classic",
  size = "medium",
  className,
  showBillingToggle = false,
  billingToggleLabels = { monthly: "Monthly", yearly: "Yearly" },
  onPlanSelect,
}) {
  const [billingCycle, setBillingCycle] = React.useState("monthly");

  const sizeClasses = {
    small: "max-w-sm",
    medium: "max-w-2xl",
    large: "max-w-7xl",
  };

  return (
    <div className={cn("w-full", sizeClasses[size], className)}>
      {/* Header */}
      <div className="text-center mb-12">
        {subtitle && (
          <p className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
            {subtitle}
          </p>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      {/* Billing Toggle */}
      {showBillingToggle && (
        <div className="flex justify-center mb-8">
          <div className="relative bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <div className="flex">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-all",
                  billingCycle === "monthly"
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                {billingToggleLabels.monthly}
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-all",
                  billingCycle === "yearly"
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                {billingToggleLabels.yearly}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className={cn(
        "grid gap-6",
        theme === "minimal" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-3 lg:grid-cols-3"
      )}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "relative rounded-2xl border bg-white dark:bg-gray-800 p-8 shadow-sm transition-all hover:shadow-lg",
              plan.popular
                ? "border-purple-500 dark:border-purple-400 ring-2 ring-purple-500/20 dark:ring-purple-400/20"
                : "border-gray-200 dark:border-gray-700",
              theme === "minimal" && "hover:border-purple-300 dark:hover:border-purple-600"
            )}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {plan.badge || "Most Popular"}
                </span>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ${plan.price}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">
                  /{plan.credits} credits
                </span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => onPlanSelect?.(plan.id)}
              className={cn(
                "w-full py-3 px-6 rounded-lg font-medium transition-all",
                plan.popular
                  ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white",
                theme === "minimal" && "hover:scale-105"
              )}
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}