import { useEffect } from "react";

const DEFAULT_TITLE = "Generic eComerce";

export default function useTitle(title, { keepSuffix = true } = {}) {
  useEffect(() => {
    const newTitle = title
      ? (keepSuffix ? `${title} - ${DEFAULT_TITLE}` : title)
      : DEFAULT_TITLE;
    document.title = newTitle;
  }, [title, keepSuffix]);
}
