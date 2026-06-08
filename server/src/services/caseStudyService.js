import CaseStudy from '../models/CaseStudy.js';

export async function listCaseStudies() {
  return await CaseStudy.find({ published: true }).sort({ createdAt: -1 });
}
