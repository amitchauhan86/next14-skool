import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({ 
    path: "/stripe",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const signature: string = request.headers.get("stripe-signature") as string;

        const payloadText = await request.text();
        const payload = JSON.parse(payloadText);
        const groupId = payload.data.metadata.groupId;
        const subscriptionId = payload.data.subscription;
        const endsOn = Date.now() + 30 * 24 * 60 * 60 * 1000;
        // // update endsOn
        // await ctx.runMutation(api.groups.updateSubscription, {
        //     groupId,
        //     subscriptionId,
        //     endsOn,
        // });

        const result = await ctx.runAction(internal.stripe1.fulfill, {
            signature,
            payload: await request.text(),
        });


        if (result.success) {
            return new Response(null, {
                status: 200,
            });
        } else {
            return new Response("Webhook Error", {
                status: 400,
            });
        }
    }),
});

export default http;