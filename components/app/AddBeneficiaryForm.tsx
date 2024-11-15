"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface FormErrors {
  email?: string;
  walletAddress?: string;
  trustPercentage?: string;
}

const AddBeneficiaryForm = () => {
  const [formData, setFormData] = useState({
    walletAddress: "",
    email: "",
    trustPercentage: "",
    relationship: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // if (!formData.walletAddress) {
    //   newErrors.walletAddress = "Wallet address is required";
    // }

    if (formData.trustPercentage) {
      const percentage = Number(formData.trustPercentage);
      if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        newErrors.trustPercentage = "Percentage must be between 0 and 100";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        // Here you would typically make an API call
        console.log("Form submitted:", formData);
        // Reset form after successful submission
        setFormData({
          walletAddress: "",
          email: "",
          trustPercentage: "",
          relationship: "",
          phoneNumber: "",
        });
      } catch (error) {
        console.error("Submission error:", error);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="p-6 border-none">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-gray-900">
          Add New Beneficiary
        </h2>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Wallet Address Field */}
            <div className="space-y-2">
              <Label htmlFor="walletAddress" className="text-sm font-medium">
                Wallet Address
                {/* <span className="text-red-500">*</span> */}
              </Label>
              <Input
                id="walletAddress"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleChange}
                className={errors.walletAddress ? "border-red-500" : ""}
                placeholder="Enter wallet address or ENS"
              />
              {/* {errors.walletAddress && (
                <p className="text-sm text-red-500">{errors.walletAddress}</p>
              )} */}
            </div>

            {/* Trust Percentage Field */}
            <div className="space-y-2">
              <Label htmlFor="trustPercentage" className="text-sm font-medium">
                Trust Percentage
              </Label>
              <div className="relative">
                <Input
                  id="trustPercentage"
                  name="trustPercentage"
                  type="number"
                  value={formData.trustPercentage}
                  onChange={handleChange}
                  className={
                    errors.trustPercentage ? "border-red-500 pr-8" : "pr-8"
                  }
                  placeholder="Enter percentage"
                  min="0"
                  max="100"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
              {errors.trustPercentage && (
                <p className="text-sm text-red-500">{errors.trustPercentage}</p>
              )}
            </div>

            {/* Relationship Field */}
            <div className="space-y-2">
              <Label htmlFor="relationship" className="text-sm font-medium">
                Relationship
              </Label>
              <Input
                id="relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                placeholder="Enter relationship"
              />
            </div>

            {/* Phone Number Field */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-4 border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({
                walletAddress: "",
                email: "",
                trustPercentage: "",
                relationship: "",
                phoneNumber: "",
              });
              setErrors({});
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Beneficiary"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddBeneficiaryForm;
