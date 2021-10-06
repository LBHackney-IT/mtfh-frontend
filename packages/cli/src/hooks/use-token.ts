import crypto from "crypto";

import { useEffect, useRef, useState } from "react";

import { $config } from "../store";

const algorithm = "aes-192-cbc";

const decryptToken = (password: string) => {
  const config = $config.getValue();
  if (!config.token || !config.iv) {
    return false;
  }
  const key = crypto.scryptSync(password, process.env.SALT || "salt", 24);
  const iv = Buffer.from(config.iv, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  try {
    const decrypted =
      decipher.update(config.token, "hex", "utf-8") + decipher.final("utf-8");
    return decrypted;
  } catch {
    return "";
  }
};

const updateToken = (token: string, password: string) => {
  const key = crypto.scryptSync(password, process.env.SALT || "salt", 24);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = cipher.update(token, "utf-8", "hex") + cipher.final("hex");

  $config.next({
    token: encrypted,
    iv: Buffer.from(iv).toString("hex"),
  });
};

const removeToken = () => {
  $config.next({});
};

export const useToken = (password = "") => {
  const [token, setToken] = useState<string | false>();
  const lastRef = useRef<null | string>(null);

  useEffect(() => {
    const sub = $config.subscribe(() => {
      if (lastRef.current === null || lastRef.current !== password) {
        setToken(decryptToken(password));
        lastRef.current = password;
      }
    });
    return () => sub.unsubscribe();
  }, [password]);

  return { token, updateToken, removeToken };
};
