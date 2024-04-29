import { Router, Request, Response } from "express";
import { schemas, validateWith } from "../../models/schemas";
import { client, search } from "../../db";
import { Dataset } from "../../models/types";

const router = Router();

router.get(
  "/:term",
  validateWith(schemas.search.term),
  async (req: Request, res: Response) => {
    try {
      return res.json({
        data: await search.mrna(
          client,
          req.params.term,
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
