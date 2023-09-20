import { Router, Request, Response } from "express";

import { annotations, client } from "../../db";
import { schemas, validateWith } from "../../models/schemas";
import { Dataset } from "../../models/types";

const router = Router();

router.get(
  "/:transcriptId",
  validateWith(schemas.annotations.transcript),
  async (req: Request, res: Response) => {
    try {
      return res.json({
        data: await annotations.transcript(
          client,
          parseInt(req.params.transcriptId),
          (req.query.dataset?.toString() as Dataset) || "CORE"
        ),
      });
    } catch (e) {
      return res.json({
        error: e,
      });
    }
  }
);

export default router;
