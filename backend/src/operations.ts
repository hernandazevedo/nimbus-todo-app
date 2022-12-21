import { Expression, Operation } from "@zup-it/nimbus-backend-core";

export const formatDate = (time: Expression<number | string>) =>
  new Operation<string>('formatDate', [time])
