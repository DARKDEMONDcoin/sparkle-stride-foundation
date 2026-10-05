import { Bell, ChevronLeft, CircleHelp, CreditCard, Loader2, LogOut, Settings2, Shirt, User } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { COUNTRIES } from "@/data/team-portraits";
import type { ReactNode } from "react";

type Props = {
  open: boolean; onOpenChange: (open: boolean) => void; avatar: ReactNode;
  name: string | null; email: string | null; country: string;
  onCountryChange: (country: string) => void; onPhoto: () => void;
  onSignOut: () => void; busy: boolean; error: string | null;
};

export function AccountMenu(props: Props) {
  const close = () => props.onOpenChange(false);
  return <Popover open={props.open} onOpenChange={props.onOpenChange}>
    <PopoverTrigger asChild>
      <Button type="button" variant="ghost" size="icon" aria-label="حسابك" className="app-user-avatar-trigger account-menu-trigger">{props.avatar}</Button>
    </PopoverTrigger>
    <PopoverContent dir="rtl" align="end" sideOffset={12} collisionPadding={12} className="account-menu" aria-label="قائمة الحساب">
      <div className="account-menu-identity">
        <Button type="button" variant="ghost" size="icon" onClick={props.onPhoto} aria-label="عرض الصورة الشخصية كاملة" className="account-menu-photo app-user-avatar-trigger">{props.avatar}</Button>
        <div className="min-w-0 flex-1">
          <span className="account-menu-eyebrow">حسابك في سهل</span>
          <p className="account-menu-name" dir="auto">{props.name || "حسابك"}</p>
          {props.email && <p className="account-menu-email" dir="ltr" title={props.email}>{props.email}</p>}
        </div>
      </div>
      <nav aria-label="روابط الحساب" className="account-menu-links">
        <Button asChild variant="ghost" className="account-menu-link account-menu-primary">
          <Link to="/app/settings" search={{ tab: "account" }} onClick={close}><span className="account-menu-icon"><User /></span><span>الملف الشخصي</span><ChevronLeft className="account-menu-arrow" /></Link>
        </Button>
        <Button asChild variant="ghost" className="account-menu-link">
          <Link to="/app/settings" search={{ tab: "workspace" }} onClick={close}><Settings2 /><span>الإعدادات</span><ChevronLeft className="account-menu-arrow" /></Link>
        </Button>
        <Button asChild variant="ghost" className="account-menu-link">
          <Link to="/app/settings" search={{ tab: "notifications" }} onClick={close}><Bell /><span>تفضيلات التنبيهات</span><ChevronLeft className="account-menu-arrow" /></Link>
        </Button>
        <Button asChild variant="ghost" className="account-menu-link">
          <Link to="/app/settings" search={{ tab: "billing" }} onClick={close}><CreditCard /><span>الاستخدام والباقات</span><ChevronLeft className="account-menu-arrow" /></Link>
        </Button>
        <Button asChild variant="ghost" className="account-menu-link">
          <Link to="/app/help" onClick={close}><CircleHelp /><span>المساعدة والدعم</span><ChevronLeft className="account-menu-arrow" /></Link>
        </Button>
      </nav>
      <div className="account-menu-uniform">
        <label htmlFor="account-uniform"><Shirt className="size-4" />زيّ الفريق</label>
        <select id="account-uniform" value={props.country} onChange={event => props.onCountryChange(event.target.value)}>
          {COUNTRIES.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
        </select>
      </div>
      <div className="account-menu-footer">
        {props.error && <p role="alert" className="mb-2 text-xs text-destructive">{props.error}</p>}
        <Button type="button" variant="ghost" disabled={props.busy} onClick={props.onSignOut} className="account-menu-logout">
          {props.busy ? <Loader2 className="size-4 animate-spin" /> : <LogOut className="size-4" />} {props.busy ? "جارٍ تسجيل الخروج" : "تسجيل الخروج"}
        </Button>
      </div>
    </PopoverContent>
  </Popover>;
}