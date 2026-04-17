import { Request, Response } from "express";

import { getClassById, listClasses } from "../services/classService";

export async function getClasses(req: Request, res: Response) {
  const classes = await listClasses({
    style: typeof req.query.style === "string" ? req.query.style : undefined,
    dateLabel: typeof req.query.dateLabel === "string" ? req.query.dateLabel : undefined
  });

  return res.json({ data: classes });
}

export async function getClassDetails(req: Request, res: Response) {
  const classId = String(req.params.classId);
  const yogaClass = await getClassById(classId);
  return res.json({ data: yogaClass });
}
