# Unity Launcher Instructions — Echoes of Ward 13

## Overview

This guide explains how to create a minimal Unity project whose sole purpose is to open `index.html` in the user's default browser. This satisfies a common university requirement to submit a Unity project file while keeping the actual game as a self-contained HTML5 application. When the Unity project is opened and Play is pressed, a button appears in the Game view; clicking it launches the HTML game in the browser. No Unity gameplay logic is needed — Unity serves purely as a launcher wrapper.

---

## Prerequisites

- **Unity Hub** installed (download from [unityhub.com](https://unityhub.com))
- **Unity 2022.3 LTS** or newer (install via Unity Hub → Installs → Add)
- The **`index.html`** file (your game) available on your machine
- Basic familiarity with the Unity Editor interface

---

## Step-by-Step Instructions

### 1. Create the Unity Project

1. Open **Unity Hub**.
2. Click **New Project**.
3. Select the **2D (Core)** template.
4. Set the project name to: `EchoesOfWard13_Launcher`
5. Choose a location on your drive (e.g. your Desktop or Documents folder).
6. Click **Create Project** and wait for Unity to finish setting up.

### 2. Create the Scripts Folder

1. In the **Project** window (bottom panel), right-click on the `Assets` folder.
2. Select **Create → Folder**.
3. Name the new folder: `Scripts`

You should now have `Assets/Scripts/` in your project.

### 3. Create the GameLauncher Script

1. Right-click on the `Assets/Scripts` folder in the Project window.
2. Select **Create → C# Script**.
3. Name the script exactly: `GameLauncher`
4. Double-click the script to open it in your code editor (Visual Studio or VS Code).
5. **Delete all existing content** in the file.
6. Paste the complete code provided in the [Launcher.cs section](#launchercs-full-code) below.
7. Save the file (`Ctrl+S` / `Cmd+S`).

### 4. Create the GameObject and Attach the Script

1. In the **Hierarchy** window (left panel), right-click in empty space.
2. Select **Create Empty**.
3. A new `GameObject` will appear in the hierarchy. Click it to select it.
4. In the **Inspector** panel (right side), click on the name field at the top and rename it to: `GameLauncher`
5. With `GameLauncher` selected in the Hierarchy, look at the Inspector.
6. Click **Add Component** (at the bottom of the Inspector).
7. In the search box that appears, type `GameLauncher`.
8. Click the `GameLauncher` script that appears in the dropdown.

The script is now attached. You should see its public fields (`Html File Name`, `Open On Start`, `Open On Play Button`) in the Inspector.

### 5. Copy the Entire Game Folder Into the Project Root

The game is not a single file — it requires several subfolders alongside `index.html`. You must copy **all of the following** into the Unity project root (the folder that already contains `Assets`, `Library`, `Packages`, and `ProjectSettings`):

| What to copy | Where it lives in this repo |
|---|---|
| `index.html` | repo root |
| `framework/` | Phaser engine |
| `js/` | game scripts |
| `css/` | stylesheets |
| `assets/` | images, audio |
| `data/` | level JSON files |

1. Open your file manager (Windows Explorer / macOS Finder).
2. Navigate to the `Tetly_2d_horror_game` repository folder on your machine.
3. Select all six items listed above and copy them.
4. Paste them into the Unity project root — at the **same level** as `Assets`, `Library`, `Packages`, and `ProjectSettings`.

> **Example final structure:**
> ```
> EchoesOfWard13_Launcher/
> ├── Assets/
> ├── index.html          ← copied here
> ├── framework/          ← copied here
> ├── js/                 ← copied here
> ├── css/                ← copied here
> ├── assets/             ← copied here
> ├── data/               ← copied here
> ├── Library/
> ├── Packages/
> └── ProjectSettings/
> ```

### 6. Test in the Unity Editor

1. Return to Unity.
2. Press the **Play** button (▶) at the top of the Editor.
3. The Game view will appear with a red button labelled **▶ PLAY ECHOES OF WARD 13**.
4. Click the button.
5. Your default browser will open `index.html`.
6. Press **Play** again (or the Stop button ⏹) to exit Play mode.

> **Note:** If `Open On Start` is checked in the Inspector, the game will also attempt to open automatically when Play is pressed, before you click the button.

### 7. Save the Scene

1. Press `Ctrl+S` (Windows) / `Cmd+S` (Mac) to save the scene.
2. Name it `MainScene` and save it inside `Assets/`.

### 8. Build Settings (Optional — for distribution)

To create a standalone build:

1. Go to **File → Build Settings**.
2. Click **Add Open Scenes** to add `MainScene` to the build list.
3. Select your target platform (e.g. **Windows, Mac, Linux** for a desktop build).
4. Click **Switch Platform** if needed.
5. Click **Build** and choose an output folder.
6. Copy `index.html` into the same folder as the built executable before distributing.

For WebGL, see the [WebGL Build Notes](#webgl-build-notes) section below.

---

## Launcher.cs (Full Code)

Create this file at `Assets/Scripts/GameLauncher.cs`. Delete the default Unity template content entirely before pasting.

```csharp
using UnityEngine;
using System.IO;

public class GameLauncher : MonoBehaviour
{
    [Header("HTML Game Settings")]
    public string htmlFileName = "index.html";
    public bool openOnStart = true;
    public bool openOnPlayButton = true;

    private string htmlPath;

    void Start()
    {
        // Build the absolute path to index.html
        // Check project root first, then StreamingAssets
        string projectRoot = Path.GetFullPath(Path.Combine(Application.dataPath, ".."));
        htmlPath = Path.Combine(projectRoot, htmlFileName);

        if (!File.Exists(htmlPath))
        {
            // Try StreamingAssets
            htmlPath = Path.Combine(Application.streamingAssetsPath, htmlFileName);
        }

        if (openOnStart)
        {
            LaunchGame();
        }
    }

    public void LaunchGame()
    {
        if (File.Exists(htmlPath))
        {
            string url = "file:///" + htmlPath.Replace("\\", "/");
            Application.OpenURL(url);
            Debug.Log("Launched: " + url);
        }
        else
        {
            Debug.LogError("index.html not found at: " + htmlPath);
            Debug.LogError("Place index.html in the project root folder.");
        }
    }

    void OnGUI()
    {
        if (openOnPlayButton)
        {
            GUIStyle style = new GUIStyle(GUI.skin.button);
            style.fontSize = 24;
            style.normal.textColor = Color.red;
            if (GUI.Button(new Rect(Screen.width/2 - 150, Screen.height/2 - 30, 300, 60), "▶ PLAY ECHOES OF WARD 13", style))
            {
                LaunchGame();
            }
            GUIStyle label = new GUIStyle(GUI.skin.label);
            label.fontSize = 14;
            label.alignment = TextAnchor.MiddleCenter;
            label.normal.textColor = Color.grey;
            GUI.Label(new Rect(Screen.width/2 - 200, Screen.height/2 + 40, 400, 30), "HTML5 game will open in your default browser", label);
        }
    }
}
```

---

## WebGL Build Notes

If you want to deploy the Unity launcher itself as a WebGL page (rather than as a desktop app):

1. In Unity, go to **File → Build Settings → WebGL → Switch Platform**.
2. Copy `index.html` (your game) into `Assets/StreamingAssets/`.
   - Create the `StreamingAssets` folder inside `Assets/` if it does not exist.
   - Right-click `Assets` → **Create → Folder** → name it `StreamingAssets`.
3. The `GameLauncher` script auto-detects the `StreamingAssets` path at runtime, so no code changes are needed.
4. Click **Build** — Unity generates a self-contained WebGL folder.
5. Upload the entire build folder to a web host (see [Hosting Instructions](#hosting-instructions) below).

> **Browser security note:** Some browsers block `file://` URLs from WebGL builds due to CORS policy. For local testing, use a local server (e.g. `python -m http.server 8080`) or host online.

---

## Hosting Instructions

### Free Hosting Options

#### 1. GitHub Pages

1. Create a free account at [github.com](https://github.com) if you do not have one.
2. Create a new repository (public).
3. Upload `index.html` (and any supporting files) to the repository root.
4. Go to **Settings → Pages**.
5. Under **Source**, select **Deploy from a branch**.
6. Choose `main` branch, `/ (root)` folder, and click **Save**.
7. Your game will be live at: `https://yourusername.github.io/your-repo-name/`

#### 2. Netlify Drop

1. Go to [netlify.com/drop](https://app.netlify.com/drop) (no account required).
2. Drag and drop your `index.html` file (or a folder containing it) onto the page.
3. Netlify instantly hosts the file and gives you a live URL.
4. Optionally create a free Netlify account to claim a custom subdomain.

#### 3. itch.io

1. Create a free account at [itch.io](https://itch.io).
2. Click your username → **Dashboard → Create new project**.
3. Set **Kind of project** to **HTML**.
4. Under **Uploads**, click **Upload files** and upload a ZIP containing `index.html` and all game assets.
5. Check **This file will be played in the browser** on the uploaded ZIP.
6. Set your game to **Public** and click **Save & view page**.
7. Players can play directly in the browser on your itch.io page.

---

### Android APK via Capacitor

Capacitor wraps your HTML5 game in a native Android app without any game engine. This produces a real `.apk` file installable on any Android device.

**Requirements:** Node.js and npm installed. Android Studio installed (free from [developer.android.com/studio](https://developer.android.com/studio)).

**Step-by-step:**

1. Install the Capacitor CLI globally:
   ```bash
   npm install -g @capacitor/cli
   ```

2. Create a project folder and navigate into it:
   ```bash
   mkdir echoes-ward13 && cd echoes-ward13
   ```

3. Initialise a Node.js project:
   ```bash
   npm init -y
   ```

4. Install Capacitor core and Android platform:
   ```bash
   npm install @capacitor/core @capacitor/android
   ```

5. Initialise Capacitor (replace values if desired):
   ```bash
   npx cap init "EchoesOfWard13" "com.ward13.echoes" --web-dir .
   ```

6. Copy the entire game folder contents into `echoes-ward13` — that means `index.html`, `framework/`, `js/`, `css/`, `assets/`, and `data/` all sitting at the root of that folder.

7. Add the Android platform:
   ```bash
   npx cap add android
   ```

8. Sync your web files into the Android project:
   ```bash
   npx cap sync
   ```

9. Open the project in Android Studio:
   ```bash
   npx cap open android
   ```

10. In Android Studio, wait for the Gradle sync to finish, then:
    - Go to **Build → Generate Signed Bundle / APK**.
    - Select **APK**.
    - Create or use an existing keystore (follow the wizard).
    - Select **release** build variant.
    - Click **Finish** — the APK is generated in `android/app/release/`.

11. Install on a device:
    - Enable **Developer Options** and **USB Debugging** on your Android device.
    - Connect via USB and run: `adb install app-release.apk`
    - Or share the APK file directly (e.g. via Google Drive, email, or a download link).

---

### iOS via Capacitor

The process mirrors Android but requires a macOS machine and an Apple Developer account.

**Requirements:** macOS, Xcode (installed from the Mac App Store), an Apple Developer account (free for sideloading, $99/year for App Store distribution).

**Steps:**

1. Complete steps 1–8 from the Android section above (use the same Capacitor project).

2. Add the iOS platform:
   ```bash
   npx cap add ios
   npx cap sync
   ```

3. Open the project in Xcode:
   ```bash
   npx cap open ios
   ```

4. In Xcode:
   - Select your project in the Project Navigator.
   - Under **Signing & Capabilities**, select your Apple Developer team.
   - Set a unique **Bundle Identifier** (e.g. `com.ward13.echoes`).

5. To run on a connected iPhone/iPad:
   - Select your device from the device dropdown at the top.
   - Press **▶ Run** (or `Cmd+R`).

6. To distribute:
   - Go to **Product → Archive**.
   - Use the Organizer to distribute via TestFlight or the App Store.

> **Note:** iOS requires all apps to be signed. Free Apple Developer accounts can sideload to your own devices; distributing to others requires a paid account.

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `index.html not found` error in Unity console | Make sure `index.html` is in the project root (same level as the `Assets` folder), not inside `Assets`. |
| Browser opens a blank page | Check that `index.html` references all asset paths relatively. Avoid absolute paths. |
| Unity does not show the play button | Confirm the `GameLauncher` script is attached to the `GameLauncher` GameObject and `Open On Play Button` is checked in the Inspector. |
| WebGL build cannot load the HTML file | Place `index.html` in `Assets/StreamingAssets/` and rebuild. |
| Android Studio Gradle sync fails | Make sure you have the correct Android SDK installed via Android Studio's SDK Manager (API Level 22 or higher). |
| APK installs but shows blank screen | Ensure all game assets are in the same folder as `index.html` and paths in the HTML are relative (e.g. `./assets/` not `/assets/`). |

---

*Echoes of Ward 13 — University Game Project — 2025*
