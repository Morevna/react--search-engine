import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale } from "../navigation";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    locale = defaultLocale;
  }

  const messages =
    locale === "ru"
      ? (await import("../messages/ru.json")).default
      : (await import("../messages/en.json")).default;

  return {
    locale,
    messages,
  };
});
