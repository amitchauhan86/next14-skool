import { v } from "convex/values";
import { api, internal } from "./_generated/api";
import { action, internalAction } from "./_generated/server";
import Stripe from 'stripe';
import { Id } from "./_generated/dataModel";
import { useMutation } from "convex/react";

export const fulfill = internalAction(async ({ }, { signature, payload }) => {
    try {

      console.log("Signature:", signature);
      console.log("Payload---:", payload);
  
  
      return { success: true }; // Return success status if everything works
    } catch (error) {
      console.error("Error processing Stripe webhook:", error);
      return { success: false }; // Return failure status in case of an error
    }
  }); 

type Metadata = {
    groupId: Id<"groups">;
}

