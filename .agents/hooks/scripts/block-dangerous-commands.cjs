#!/usr/bin/env node

/**
 * block-dangerous-commands.cjs
 * Antigravity 2.0 Lifecycle Hook: PreToolUse gate for `run_command`
 * Prevents destructive commands (force-push, hard-reset, rm -rf, deleting main branch, --no-verify)
 */

const fs = require("fs");

try {
  const stdinBuffer = fs.readFileSync(0);
  if (!stdinBuffer || stdinBuffer.length === 0) {
    console.log(JSON.stringify({ decision: "allow" }));
    process.exit(0);
  }

  const payload = JSON.parse(stdinBuffer.toString("utf-8"));
  const command = payload?.toolCall?.args?.CommandLine || "";

  if (!command) {
    console.log(JSON.stringify({ decision: "allow" }));
    process.exit(0);
  }

  let denyReason = "";

  // 1. Force push 방어
  if (/git\s+push\s+.*(-f\b|--force)/.test(command)) {
    denyReason = "Force push is strictly prohibited. Use git push without --force.";
  }
  // 2. Hard reset 방어
  else if (/git\s+reset\s+--hard/.test(command)) {
    denyReason = "git reset --hard is prohibited as it destroys uncommitted changes.";
  }
  // 3. Recursive force delete 방어 (rm -rf)
  else if (/rm\s+-[a-zA-Z]*r[a-zA-Z]*f|rm\s+-[a-zA-Z]*f[a-zA-Z]*r/.test(command)) {
    denyReason = "rm -rf is prohibited. Use targeted and safe file deletions instead.";
  }
  // 4. Git hook 우회 방어 (--no-verify)
  else if (/--no-verify/.test(command)) {
    denyReason = "Bypassing git hooks with --no-verify is strictly prohibited.";
  }
  // 5. main 브랜치 및 태그 강제 삭제 방어
  else if (/git\s+(branch|tag)\s+-[dD]\s+.*main/.test(command)) {
    denyReason = "Deleting the main branch or main tag is strictly prohibited.";
  }

  if (denyReason) {
    const shortCmd = command.slice(0, 80);
    console.log(
      JSON.stringify({
        decision: "deny",
        reason: `Blocked by Safety Guard: ${denyReason} (command: ${shortCmd}...)`,
      })
    );
    process.exit(0);
  }

  console.log(JSON.stringify({ decision: "allow" }));
  process.exit(0);
} catch (err) {
  // 에러 발생 시 fail-open (도구 실행 허용)
  console.log(JSON.stringify({ decision: "allow" }));
  process.exit(0);
}

