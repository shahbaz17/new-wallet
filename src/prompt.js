export function promptHidden(question) {
  const { stdin, stderr } = process;

  if (!stdin.isTTY) {
    return new Promise((resolve, reject) => {
      let data = "";
      stdin.setEncoding("utf8");
      stdin.on("data", (chunk) => (data += chunk));
      stdin.on("end", () => resolve(data.trim()));
      stdin.on("error", reject);
    });
  }

  return new Promise((resolve) => {
    let input = "";
    stderr.write(question);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    const finish = (value) => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener("data", onData);
      stderr.write("\n");
      if (value === null) process.exit(130);
      resolve(value.trim());
    };

    const onData = (chunk) => {
      for (const ch of chunk) {
        if (ch === "\r" || ch === "\n") return finish(input);
        if (ch === "\u0003") return finish(null);
        if (ch === "\u007f" || ch === "\b") input = input.slice(0, -1);
        else input += ch;
      }
    };

    stdin.on("data", onData);
  });
}
