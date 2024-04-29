import { Router, Request, Response, NextFunction } from "express";

import { annotations, client } from "../../db";
import { schemas, validateWith } from "../../models/schemas";

const router = Router();

const makeHandler =
  (req: Request, res: Response, _: NextFunction) =>
  async (handler: Function) => {
    try {
      return res.json({
        data: await handler(client, parseInt(req.params.transcriptId)),
      });
    } catch (e) {
      return res.json({
        error: e,
      });
    }
  };

[
  ["/genes/:transcriptId", annotations.affymetrix.genes],
  ["/go/:transcriptId", annotations.affymetrix.go],
  ["/mrna/:transcriptId", annotations.affymetrix.mrna],
  ["/pathways/:transcriptId", annotations.affymetrix.pathways],
  ["/protein_domains/:transcriptId", annotations.affymetrix.proteinDomains],
  ["/swissprot/:transcriptId", annotations.affymetrix.swissprot],
  ["/unigene/:transcriptId", annotations.affymetrix.unigene],
].map(([path, handler]) =>
  router.get(
    path as string,
    validateWith(schemas.annotations.affymetrix),
    (...args) => makeHandler(...args)(handler as Function)
  )
);

export default router;
