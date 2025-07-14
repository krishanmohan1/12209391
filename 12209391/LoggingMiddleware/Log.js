

export function Log(stack, level, pkg, message, data = null) {
  const log = {
    timestamp: new Date().toISOString(),
    stack,
    level,
    package: pkg,
    message,
    data,
  };

  let logs = JSON.parse(localStorage.getItem("logs") || "[]");
  logs.push(log);
  localStorage.setItem("logs", JSON.stringify(logs));
}
