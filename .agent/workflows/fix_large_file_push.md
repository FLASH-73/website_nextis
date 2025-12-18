---
description: Fix GitHub push error by using Git LFS for large files
---

The push failed because `con_one.glb` is 127MB, which is larger than GitHub's 100MB limit.
We need to use **Git LFS** (Large File Storage) to handle this file.

Since you already committed the large file, we first need to "undo" the commit locally so we can track it properly with LFS before committing again.

Run the following commands in order:

1.  **Undo the last 2 commits** (keep your changes, just unstage them):
    ```bash
    git reset --soft HEAD~2
    ```

2.  **Unstage the large file** (so we can re-add it with LFS):
    ```bash
    git reset HEAD public/models/con_one.glb
    ```

3.  **Initialize Git LFS**:
    ```bash
    git lfs install
    ```

4.  **Track the GLB file with LFS**:
    ```bash
    git lfs track "public/models/*.glb"
    ```

5.  **Add the .gitattributes file** (created by the previous command):
    ```bash
    git add .gitattributes
    ```

6.  **Re-add the model file** (now it will be handled by LFS):
    ```bash
    git add public/models/con_one.glb
    ```

7.  **Add everything else**:
    ```bash
    git add .
    ```

8.  **Commit again**:
    ```bash
    git commit -m "Add 3D model with Git LFS"
    ```

9.  **Push to GitHub**:
    ```bash
    git push origin main
    ```
