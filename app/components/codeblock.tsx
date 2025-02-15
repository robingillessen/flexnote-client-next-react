"use client";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "./ui/button";
import { Copy, CopyCheck } from "lucide-react";
import copy from "copy-to-clipboard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CodeBlockProps {
  id: string;
}

const CodeBlock = ({ id }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const code = `
  <script id="flexnote">
  (function() {
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://noti-widget.vercel.app/assets/index.js'
    scriptElement.setAttribute('websiteId', '${id}');
    scriptElement.type = 'module'
    document.body.appendChild(scriptElement);
})();
</script>`;

  const handleCopy = () => {
    copy(code);
    setCopied(true);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="relative  w-full">
      <SyntaxHighlighter
        customStyle={{
          padding: "1rem",
          borderRadius: "0.5rem",
          fontSize: "0.6rem",
          lineHeight: "1.5",
          wordBreak: "break-all",
        }}
        language="javascript"
        style={darcula}
      >
        {code}
      </SyntaxHighlighter>
      <button
        className={cn(
          "absolute top-2 right-2 bg-white text-secondary-foreground h-6 w-6 flex justify-center items-center rounded-full border border-secondary-foreground transition-all duration-300",
          copied
            ? "bg-green-500 text-white"
            : "hover:bg-secondary-foreground hover:text-white"
        )}
        onClick={handleCopy}
      >
        {copied ? (
          <CopyCheck size={15} />
        ) : (
          <Copy className="text-black" size={15} />
        )}
      </button>
    </div>
  );
};

export default CodeBlock;
