import React from "react";

const Footer = () => {
  const isOk = process.env.NEXT_PUBLIC_STATUS === "ok";

  return (
    <footer className="w-full border rounded-xl mb-2 border-border py-3 text-sm">
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/Rohitlodhii/deepfake-detector"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:underline underline-offset-4"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/rohitlodhiii"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:underline underline-offset-4"
        >
          LinkedIn
        </a>
      </div>

        <div
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
          isOk ? "bg-blue-50 text-green-600" : "bg-red-50 text-red-600"
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            isOk ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span>{isOk ? "Backend up" : "Backend down"}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
