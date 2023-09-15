import NodeCache from "node-cache";

export const myCache = new NodeCache({ stdTTL: 60, checkperiod: 80 });