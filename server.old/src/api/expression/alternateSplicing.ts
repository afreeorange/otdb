import { Router, Request, Response } from "express";
import { schemas, validateWith } from "../../models/schemas";
import { client, expression } from "../../db";
import { Dataset } from "../../models/types";

const router = Router();

router.get(
  "/:transcriptIds",
  validateWith(schemas.expression.alternateSplicing),
  async (req: Request, res: Response) => {
    try {
      return res.json({
        data: await expression.alternateSplicing(
          client,
          req.params.transcriptIds.split(",").map((_) => parseInt(_.trim())),
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
