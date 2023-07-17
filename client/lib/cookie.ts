import cookie from "js-cookie";

//types
import { ITokenDetailsCookie } from "@/types";

class CookieAllOperations<T extends object> {
  #cookieName: string;

  constructor(name: string) {
    this.#cookieName = name;
  }

  set = (value: T) => {
    const newValue = JSON.stringify(value);
    cookie.set(this.#cookieName, newValue);
  };

  get = () => cookie.get(this.#cookieName);

  get getJson() {
    const value = this.get();
    if (value) return JSON.parse(value) as T;
  }

  delete = () => cookie.remove(this.#cookieName);
}

export const tokenDetailsCookie = new CookieAllOperations<ITokenDetailsCookie>(
  "token_details"
);
