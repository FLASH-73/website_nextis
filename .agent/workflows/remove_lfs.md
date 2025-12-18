---
description: Remove Git LFS tracking for the compressed 3D model
---

The 3D model is now only **6MB** (compressed from 128MB). We don't need Git LFS anymore.
Removing LFS will fix the Vercel error because Vercel will just download the file directly like any other image or script.

Run these commands to convert it back to a regular file:

1.  **Remove LFS tracking**:
    ```bash
    git lfs untrack "public/models/*.glb"
    ```

2.  **Remove the .gitattributes file** (or edit it to remove the line):
    ```bash
    rm .gitattributes
    ```

3.  **Clear the cached file from git**:
    ```bash
    git rm --cached public/models/con_one.glb
    ```

4.  **Re-add the file** (now as a regular file):
    ```bash
    git add public/models/con_one.glb
    ```

5.  **Commit the changes**:
    ```bash
    git commit -m "Remove LFS and switch to regular file"
    ```

6.  **Push to GitHub**:
    ```bash
    git push origin main
    ```
