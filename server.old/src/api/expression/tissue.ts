import { Router, Request, Response } from "express";
import { schemas, validateWith } from "../../models/schemas";
import { client, expression } from "../../db";
import { Dataset, Tissue } from "../../models/types";

const router = Router();

router.get(
  "/:tissue",
  validateWith(schemas.expression.tissue),
  async (req: Request, res: Response) => {
    try {
      return res.json({
        data: await expression.tissue(
          client,
          req.params.tissue as Tissue,
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
