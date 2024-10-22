import { useEffect } from "react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";

import type { ThemeDirection } from "../types";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  direction: ThemeDirection;
};

const cacheRtl = createCache({
  key: "rtl",
  prepend: true,
  stylisPlugins: [rtlPlugin],
});

export function Rtl({ children, direction }: Readonly<Props>) {
  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  if (direction === "rtl") {
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
  }

  return <>{children}</>;
}
