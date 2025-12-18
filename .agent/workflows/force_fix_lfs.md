---
description: Force replace LFS pointer with binary file by renaming
---

The file in GitHub is **still** the text pointer, not the 3D model. This happens because Git sometimes "remembers" the LFS state even after we try to untrack it.

We will fix this by **renaming** the file, committing the change, and then naming it back. This forces Git to see it as a brand new file.

Run these commands exactly:

1.  **Rename the file temporarily**:
    ```bash
    mv public/models/con_one.glb public/models/con_one_temp.glb
    ```

2.  **Tell Git the old file is gone**:
    ```bash
    git add public/models/con_one.glb
    git commit -m "Remove old LFS pointer"
    ```

3.  **Rename the file back**:
    ```bash
    mv public/models/con_one_temp.glb public/models/con_one.glb
    ```

4.  **Add the file as a new binary**:
    ```bash
    git add public/models/con_one.glb
    ```

5.  **Commit the new binary**:
    ```bash
    git commit -m "Add actual binary model file"
    ```

6.  **Push to GitHub**:
    ```bash
    git push origin main
    ```
