export function checkRouteEnabled(pathname: string, mainMenu: any[]): boolean {
  // If the user hasn't created a menu yet (or completely deleted it), the app falls back to the hardcoded menu.
  // Therefore, all pages must be accessible in this state.
  if (!mainMenu || mainMenu.length === 0) {
    return true;
  }

  if (pathname === '/') return true; // Home is always enabled

  const findLink = (items: any[], target: string): boolean => {
    // Normalize target
    const cleanTarget = target.startsWith('/') ? target : '/' + target;

    for (const item of items) {
      if (item._type === 'menuItem') {
        const itemLink = item.link?.startsWith('/') ? item.link : '/' + (item.link || '');
        
        // Handle trailing slashes or exact matches
        if (itemLink === cleanTarget || itemLink + '/' === cleanTarget || itemLink === cleanTarget + '/') {
          return true;
        }
        // Also allow dynamic sub-routes. If the link is '/news', then '/news/some-article' should be enabled.
        if (cleanTarget.startsWith(itemLink + '/')) {
          return true;
        }
      } else if (item._type === 'menuDropdown' && item.items) {
        if (findLink(item.items, target)) {
          return true;
        }
      }
    }
    return false;
  };

  return findLink(mainMenu || [], pathname);
}
