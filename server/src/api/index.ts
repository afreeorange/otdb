import { Router } from "express";

import affymetrixRouter from "./annotations/affymetrix";
import transcriptRouter from "./annotations/transcript";

import alternateSplicingRouter from "./expression/alternateSplicing";
import tissueRouter from "./expression/tissue";

import geneRouter from "./search/gene";
import mrnaRouter from "./search/mrna";
import transcriptIdRouter from "./search/transcriptId";

const router = Router();

router.use("/search/gene", geneRouter);
router.use("/search/mrna", mrnaRouter);
router.use("/search/transcript_id", transcriptIdRouter);

router.use("/expression/alternate_splicing", alternateSplicingRouter);
router.use("/expression/tissue", tissueRouter);

router.use("/annotations/affymetrix", affymetrixRouter);
router.use("/annotations/transcript", transcriptRouter);

export default router;
