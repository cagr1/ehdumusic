import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const fileArg = args.find((arg) => arg.startsWith("--file="));
const fileFocus = fileArg ? fileArg.split("=")[1] : "";
const positionalArg = args.find((arg) => !arg.startsWith("--"));

const readStdin = async () =>
  new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data.trim()));
  });

const safeExec = (command) => {
  try {
    return execSync(command, { cwd: projectRoot, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "unknown";
  }
};

const formatTimestamp = (date) =>
  `${date.toISOString().replace("T", " ").replace("Z", " UTC")}`;

const getProjectName = () => {
  const packageJsonPath = path.join(projectRoot, "package.json");
  try {
    const raw = fs.readFileSync(packageJsonPath, "utf8");
    const parsed = JSON.parse(raw);
    return parsed.name || "Ehdu";
  } catch {
    return "Ehdu";
  }
};

const buildStructuredTemplate = ({ promptExcerpt }) => `## Structured Analysis\n\n1) Activated Roles:\n- [ ] ARCHITECTURE_PERFORMANCE (if performance/budget/structure changes)\n- [ ] VISUAL_ANIMATION (if motion/scroll/timing/easing changes)\n- [ ] SEO_ACCESSIBILITY (if semantics/a11y/metadata/CLS changes)\n\n2) Critical Issues (if any):\n- None identified (placeholder)\n\n3) Recommended Action:\n- Summarize required edits or validations based on the prompt.\n- Avoid repeating previously validated advice.\n\n4) Performance Impact:\n- Describe expected impact (LCP/CLS/FID/bundle size).\n\nPrompt Excerpt (first 20 lines max):\n${promptExcerpt}\n`;

const buildChecklistTemplate = () => `## Checklist (Actionable, concise)\n- [ ] Identify relevant agents based on prompt scope.\n- [ ] Apply only the necessary agent rules (no global re-review).\n- [ ] Validate changes against performance budget and 60fps motion.\n- [ ] Confirm accessibility/SEO constraints are preserved.\n- [ ] Record completed checks to avoid repetition.\n`;

const buildEntry = ({ projectName, timestamp, branch, fileFocus, promptExcerpt }) => {
  const contextLines = [
    `### ${projectName} — ${timestamp}`,
    `- Branch: ${branch}`,
    `- File focus: ${fileFocus || "(not specified)"}`,
  ];

  return [
    contextLines.join("\n"),
    "",
    "#### Context Summary",
    `- Project: ${projectName}`,
    `- Timestamp: ${timestamp}`,
    `- Branch: ${branch}`,
    `- File focus: ${fileFocus || "(not specified)"}`,
    "",
    buildStructuredTemplate({ promptExcerpt }),
    "",
    buildChecklistTemplate(),
    "",
  ].join("\n");
};

const writeChecklist = (content) => {
  const checklistPath = path.join(projectRoot, "agents", "checklist.md");
  const separator = fs.existsSync(checklistPath) ? "\n---\n\n" : "";
  fs.mkdirSync(path.dirname(checklistPath), { recursive: true });
  fs.appendFileSync(checklistPath, `${separator}${content}`, "utf8");
};

const run = async () => {
  let promptInput = positionalArg || "";
  if (!promptInput) {
    promptInput = await readStdin();
  }
  const promptLines = promptInput.split(/\r?\n/).filter(Boolean);
  const promptExcerpt = promptLines.slice(0, 20).map((line) => `> ${line}`).join("\n") || "> (no prompt provided)";

  const projectName = getProjectName();
  const timestamp = formatTimestamp(new Date());
  const branch = safeExec("git rev-parse --abbrev-ref HEAD");

  const entry = buildEntry({ projectName, timestamp, branch, fileFocus, promptExcerpt });
  writeChecklist(entry);

  process.stdout.write(`${entry}`);
};

run();
