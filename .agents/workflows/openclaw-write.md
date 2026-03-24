---
description: Write code from the current workspace back to a specified path in WSL.
---

1. Ensure the code you want to write is available in a file in your workspace.
2. Note: The common OpenClaw dev-group workspace path in WSL is usually `/home/unix_lc/.openclaw/workspace/output/dev-group`
3. Use `run_command` with `wsl bash -c "cat > <WSL_PATH>" << 'EOF'\n<FILE_CONTENT>\nEOF` or copy back via `/mnt/c/`.
4. Specifically: `wsl bash -c "cat /mnt/c/<WINDOWS_PATH> > <WSL_PATH>"` is the safest way to avoid encoding issues.
