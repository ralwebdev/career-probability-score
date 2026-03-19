import { describe, it, expect } from "vitest";
import {
  masterEducationLevels,
  fieldsByEducation,
  formatLabel,
  hasSubdomains,
  getSubdomains,
  getRolesForDomain,
  getAllDomainsForFieldAndEducation,
  domainLeadsToRoles,
} from "@/lib/careerMasterDB";

describe("Every education → field path has valid domains", () => {
  for (const edu of masterEducationLevels) {
    const fields = fieldsByEducation[edu] ?? [];

    it(`${formatLabel(edu)} has fields of study`, () => {
      expect(fields.length).toBeGreaterThan(0);
    });

    for (const field of fields) {
      it(`${formatLabel(edu)} → ${formatLabel(field)} has at least one domain leading to roles`, () => {
        const domains = getAllDomainsForFieldAndEducation(field, edu);
        expect(domains.length).toBeGreaterThan(0);
        // Every returned domain must lead to roles
        for (const d of domains) {
          expect(domainLeadsToRoles(d)).toBe(true);
        }
      });
    }
  }
});

describe("Every domain's leaf subdomains have roles", () => {
  const checked = new Set<string>();

  function checkDomain(domain: string, path: string) {
    if (checked.has(domain)) return;
    checked.add(domain);

    if (hasSubdomains(domain)) {
      const subs = getSubdomains(domain);
      for (const sub of subs) {
        it(`${path} → ${formatLabel(sub)} leads to roles`, () => {
          expect(domainLeadsToRoles(sub)).toBe(true);
        });
        checkDomain(sub, `${path} → ${formatLabel(sub)}`);
      }
    } else {
      it(`${path} has direct roles`, () => {
        const roles = getRolesForDomain(domain);
        expect(roles.length).toBeGreaterThan(0);
      });
    }
  }

  for (const edu of masterEducationLevels) {
    const fields = fieldsByEducation[edu] ?? [];
    for (const field of fields) {
      const domains = getAllDomainsForFieldAndEducation(field, edu);
      for (const d of domains) {
        checkDomain(d, `${formatLabel(edu)} → ${formatLabel(field)} → ${formatLabel(d)}`);
      }
    }
  }
});

describe("Cross-domain isolation", () => {
  it("12_arts → philosophy should NOT include engineering domains", () => {
    const domains = getAllDomainsForFieldAndEducation("philosophy", "12_arts");
    expect(domains).not.toContain("civil");
    expect(domains).not.toContain("mechanical");
    expect(domains).not.toContain("software_engineering");
  });

  it("undergraduate → ba should NOT include engineering domains", () => {
    const domains = getAllDomainsForFieldAndEducation("ba", "undergraduate");
    expect(domains).not.toContain("civil");
    expect(domains).not.toContain("mechanical");
    expect(domains).not.toContain("software_engineering");
  });

  it("undergraduate → btech SHOULD include engineering domains", () => {
    const domains = getAllDomainsForFieldAndEducation("btech", "undergraduate");
    expect(domains).toContain("software_engineering");
    expect(domains).toContain("mechanical");
    expect(domains).toContain("civil");
  });

  it("undergraduate → bdes SHOULD map to design", () => {
    const domains = getAllDomainsForFieldAndEducation("bdes", "undergraduate");
    expect(domains).toContain("design");
  });

  it("bootcamp → web_development has frontend/backend/fullstack", () => {
    const domains = getAllDomainsForFieldAndEducation("web_development", "bootcamp");
    expect(domains).toContain("frontend");
    expect(domains).toContain("backend");
    expect(domains).toContain("fullstack");
  });

  it("self_taught → content_creation has content_creation domain", () => {
    const domains = getAllDomainsForFieldAndEducation("content_creation", "self_taught");
    expect(domains).toContain("content_creation");
  });

  it("undergraduate → ba should NOT show content_creation as only domain", () => {
    const domains = getAllDomainsForFieldAndEducation("ba", "undergraduate");
    // ba should have media_communication, psychology, etc. — not just content_creation
    expect(domains.length).toBeGreaterThan(1);
  });
});
