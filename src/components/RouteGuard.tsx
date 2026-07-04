"use client";

import { usePathname } from "next/navigation";
import { checkRouteEnabled } from "@/utils/checkRouteEnabled";
export default function RouteGuard({ children, mainMenu, fallback }: { children: React.ReactNode, mainMenu: any[], fallback: React.ReactNode }) {
  const pathname = usePathname();
  
  // Remove locale prefix (e.g., /pl/shop -> /shop) to match Sanity links
  const localePrefixes = ['/pl', '/en', '/uk'];
  let cleanPathname = pathname;
  for (const prefix of localePrefixes) {
    if (cleanPathname.startsWith(prefix)) {
      cleanPathname = cleanPathname.slice(prefix.length);
      break;
    }
  }
  if (cleanPathname === '') cleanPathname = '/';

  // Certain paths are always allowed regardless of menu
  const bypassPaths = ['/', '/join'];
  if (bypassPaths.includes(cleanPathname)) {
    return <>{children}</>;
  }

  // Check if route exists in mainMenu
  const isEnabled = checkRouteEnabled(cleanPathname, mainMenu);

  if (!isEnabled) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
