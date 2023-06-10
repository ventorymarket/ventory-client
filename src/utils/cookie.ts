import { ACCESS_TOKEN } from "@/constants/authentication";

export function getCookie(name = ACCESS_TOKEN) {
  if (typeof window !== "undefined") {
    const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return v ? v[2] : null;
  }
}

export function setCookie(name: string, value: string, options: any = {}) {
  options = {
    path: "/",
    // add other defaults here if necessary
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export const cookieSetting = () => {
  return {
    path: "/",
  };
};
