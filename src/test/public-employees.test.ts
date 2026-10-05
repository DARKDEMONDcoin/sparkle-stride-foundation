import { describe, expect, it } from "vitest";
import { getMember, team } from "@/data/team";

describe("public employee content", () => {
  it("keeps six complete, uniquely routed employee profiles", () => {
    expect(team).toHaveLength(6);
    expect(new Set(team.map((member) => member.id)).size).toBe(6);

    for (const member of team) {
      expect(getMember(member.id)).toBe(member);
      expect(member.tasks.length).toBeGreaterThanOrEqual(5);
      expect(member.workflow).toHaveLength(4);
      expect(member.comparison).toHaveLength(3);
      expect(member.faqs).toHaveLength(3);
      expect(member.apps.length).toBeGreaterThanOrEqual(9);
    }
  });

  it("returns no employee for an invalid public route id", () => {
    expect(getMember("missing-employee")).toBeUndefined();
  });
});