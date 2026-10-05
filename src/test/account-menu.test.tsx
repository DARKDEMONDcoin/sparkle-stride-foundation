import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AccountMenu } from "@/components/app/AccountMenu";

vi.mock("@tanstack/react-router", () => ({ Link: ({ to, search, children, ...props }: any) => <a href={`${to}${search?.tab ? `?tab=${search.tab}` : ""}`} {...props}>{children}</a> }));

describe("account menu", () => {
  it("separates profile/settings and keeps destinations, uniform, and logout usable", () => {
    const onCountryChange = vi.fn();
    const onSignOut = vi.fn();
    render(<AccountMenu open onOpenChange={vi.fn()} avatar={<span>صورة</span>} name="أحمد علي" email="ahmed@example.com" country="EG" onCountryChange={onCountryChange} onPhoto={vi.fn()} onSignOut={onSignOut} busy={false} error={null} />);
    expect(screen.getByRole("link", { name: "الملف الشخصي" })).toHaveAttribute("href", "/app/settings?tab=account");
    expect(screen.getByRole("link", { name: "الإعدادات" })).toHaveAttribute("href", "/app/settings?tab=workspace");
    expect(screen.getByRole("link", { name: "تفضيلات التنبيهات" })).toHaveAttribute("href", "/app/settings?tab=notifications");
    expect(screen.getByRole("link", { name: "الاستخدام والباقات" })).toHaveAttribute("href", "/app/settings?tab=billing");
    expect(screen.getByRole("link", { name: "المساعدة والدعم" })).toHaveAttribute("href", "/app/help");
    fireEvent.change(screen.getByLabelText("زيّ الفريق"), { target: { value: "SA" } });
    expect(onCountryChange).toHaveBeenCalledWith("SA");
    fireEvent.click(screen.getByRole("button", { name: "تسجيل الخروج" }));
    expect(onSignOut).toHaveBeenCalledOnce();
  });
});