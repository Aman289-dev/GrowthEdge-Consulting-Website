import { listCaseStudies } from '../services/caseStudyService.js';

export async function getCaseStudies(req, res, next) {
  try {
    const caseStudies = await listCaseStudies();
    res.json({ success: true, data: caseStudies });
  } catch (err) {
    next(err);
  }
}
