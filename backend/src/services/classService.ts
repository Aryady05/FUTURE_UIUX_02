import { query } from "../config/db";
import { mockClasses } from "../data/mockData";
import { useMockData } from "../config/env";
import { YogaClass } from "../types/models";
import { HttpError } from "../utils/HttpError";

type ClassFilters = {
  style?: string;
  dateLabel?: string;
};

export async function listClasses(filters: ClassFilters = {}) {
  if (useMockData) {
    return mockClasses.filter((item) => {
      const matchesStyle = filters.style ? item.style === filters.style : true;
      const matchesDate = filters.dateLabel ? item.dateLabel === filters.dateLabel : true;
      return matchesStyle && matchesDate;
    });
  }

  const values: string[] = [];
  const clauses: string[] = [];

  if (filters.style) {
    values.push(filters.style);
    clauses.push(`style = $${values.length}`);
  }

  if (filters.dateLabel) {
    values.push(filters.dateLabel);
    clauses.push(`date_label = $${values.length}`);
  }

  const whereClause = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const result = await query<YogaClass & { focus_tags: string[] }>(
    `
      SELECT
        id,
        title,
        style,
        instructor,
        date_label AS "dateLabel",
        start_time AS "startTime",
        end_time AS "endTime",
        duration,
        level,
        energy,
        spots_left AS "spotsLeft",
        price_label AS "priceLabel",
        description,
        studio_room AS "studioRoom",
        focus_tags AS "focusTags",
        featured
      FROM yoga_classes
      ${whereClause}
      ORDER BY featured DESC, date_label ASC, start_time ASC
    `,
    values
  );

  return result.rows;
}

export async function getClassById(classId: string) {
  if (useMockData) {
    const yogaClass = mockClasses.find((item) => item.id === classId);
    if (!yogaClass) {
      throw new HttpError(404, "Class not found.");
    }
    return yogaClass;
  }

  const result = await query<YogaClass & { focus_tags: string[] }>(
    `
      SELECT
        id,
        title,
        style,
        instructor,
        date_label AS "dateLabel",
        start_time AS "startTime",
        end_time AS "endTime",
        duration,
        level,
        energy,
        spots_left AS "spotsLeft",
        price_label AS "priceLabel",
        description,
        studio_room AS "studioRoom",
        focus_tags AS "focusTags",
        featured
      FROM yoga_classes
      WHERE id = $1
      LIMIT 1
    `,
    [classId]
  );

  if (!result.rows[0]) {
    throw new HttpError(404, "Class not found.");
  }

  return result.rows[0];
}

