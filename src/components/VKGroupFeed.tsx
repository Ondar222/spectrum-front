import React, { useEffect, useId } from "react";

type VKGroupFeedProps = {
  groupId: number; // e.g. 225368787
  height?: number; // px
  wide?: 0 | 1;
  mode?: 1 | 2 | 3 | 4; // see VK.Widgets.Group modes
  width?: number | "auto";
  className?: string;
};

declare global {
  interface Window {
    VK?: any;
  }
}

export default function VKGroupFeed({
  groupId,
  height = 600,
  wide = 1,
  mode = 4,
  width = "auto",
  className,
}: VKGroupFeedProps) {
  const autoId = useId().replace(/:/g, "-");
  const containerId = `vk_group_${autoId}`;

  useEffect(() => {
    const initWidget = () => {
      try {
        if (
          window.VK &&
          window.VK.Widgets &&
          document.getElementById(containerId)
        ) {
          window.VK.Widgets.Group(
            containerId,
            { mode, wide, height, width },
            groupId
          );
        }
      } catch (e) {
        // no-op, widget will simply not render
        // console.error('VK widget init error', e);
      }
    };

    if (typeof window === "undefined") return;

    if (window.VK && window.VK.Widgets) {
      initWidget();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://vk.com/js/api/openapi.js"]'
    );
    if (existing) {
      existing.addEventListener("load", initWidget, { once: true });
      return () =>
        existing.removeEventListener("load", initWidget as EventListener);
    }

    const script = document.createElement("script");
    script.src = "https://vk.com/js/api/openapi.js?173";
    script.async = true;
    script.onload = initWidget;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [containerId, groupId, height, mode, wide, width]);

  return <div id={containerId} className={className} />;
}
