import { describe, it, expect } from "vitest";
import { rolesByDomain, skillsByRole, formatLabel } from "@/lib/careerMasterDB";

describe("Every role has technical skills mapped", () => {
  const allRoleIds = new Set<string>();
  for (const roles of Object.values(rolesByDomain)) {
    for (const r of roles) allRoleIds.add(r);
  }

  for (const roleId of allRoleIds) {
    it(`${formatLabel(roleId)} has skills`, () => {
      const skills = skillsByRole[roleId];
      expect(skills, `Missing skills for role: ${roleId}`).toBeDefined();
      expect(skills.length).toBeGreaterThanOrEqual(3);
    });
  }
});
