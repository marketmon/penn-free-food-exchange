import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

const es = initEdgeStore.create();

const edgestoreRouter = es.router({
  images: es.imageBucket().beforeDelete(({ ctx, fileInfo }) => {
    console.log("beforeDelete", ctx, fileInfo);
    return true; // allow delete
  }),
});

const handler = createEdgeStoreNextHandler({
  router: edgestoreRouter,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgestoreRouter;
