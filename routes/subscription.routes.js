import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { createSubscription, getSubscription } from "../controller/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send("Get all subscriptions");
});
subscriptionRouter.get("/:id", (req, res) => {
  res.send(`Get subscription with ID: ${req.params.id}`);
});
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id", (req, res) => {
  res.send(`Update subscription with ID: ${req.params.id}`);
});
subscriptionRouter.delete("/:id", (req, res) => {
  res.send(`Delete subscription with ID: ${req.params.id}`);
});
subscriptionRouter.get("/user/:id", authorize, getSubscription);
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send(`Cancel subscription with ID: ${req.params.id}`);
});
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send("Get all upcoming renewals");
});

export default subscriptionRouter;
