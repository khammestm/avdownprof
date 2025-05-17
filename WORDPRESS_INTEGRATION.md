
# Integrating Your React App with WordPress

This guide explains how to build your React application (Social Media Downloader) and embed it into a WordPress website.

## 1. Build Your React Application

First, you need to build your React application to generate static HTML, CSS, and JavaScript files. These files are optimized for production.

Open your project terminal and run the following command:

```bash
npm run build
```

This command will create a `dist` folder in your project's root directory. Inside the `dist` folder, you'll find:
- `index.html`: The main HTML file (though you'll primarily use the JS/CSS bundles).
- `assets/`: A subfolder containing your bundled JavaScript (`.js`) and CSS (`.css`) files. These files will have unique names with hashes for cache-busting (e.g., `main.xxxxxxxx.js`, `main.xxxxxxxx.css`).

## 2. Upload Assets to Your WordPress Theme

Next, you need to make these built assets available to your WordPress site.
1.  Locate the `assets` folder inside your `dist` directory.
2.  Upload the contents of this `dist/assets` folder (your JS and CSS files) to your active WordPress theme's directory. A common practice is to create a dedicated subfolder, for example: `wp-content/themes/your-active-theme/react-app-assets/`.

## 3. Enqueue Scripts and Styles in WordPress

Now, you need to tell WordPress to load these CSS and JavaScript files. You can do this by adding code to your active theme's `functions.php` file.

```php
<?php
// In your theme's functions.php

function social_media_downloader_assets() {
    // IMPORTANT: Replace 'your-active-theme' and the filenames with the actual paths and names.
    // The filenames will have hashes, e.g., main.a1b2c3d4.js. You need to find these exact names
    // in your dist/assets folder after building.

    // Example: Enqueueing the main CSS file
    wp_enqueue_style(
        'social-media-downloader-css',
        get_stylesheet_directory_uri() . '/react-app-assets/main.xxxxxxxx.css', // Replace xxxxxxxx with actual hash
        array(),
        null // You can use filemtime() for versioning during development, or the hash itself
    );

    // Example: Enqueueing the main JavaScript file
    // The 'true' at the end tells WordPress to load the script in the footer.
    wp_enqueue_script(
        'social-media-downloader-js',
        get_stylesheet_directory_uri() . '/react-app-assets/main.xxxxxxxx.js', // Replace xxxxxxxx with actual hash
        array(), // Dependencies, if any (e.g., 'jquery')
        null,    // Version
        true     // Load in footer
    );
}

// Hook the function to the appropriate WordPress action
// Use 'wp_enqueue_scripts' for front-end scripts and styles
add_action( 'wp_enqueue_scripts', 'social_media_downloader_assets' );
?>
```

**Finding the exact filenames:** After running `npm run build`, inspect the `dist/assets` folder to get the exact names of your generated CSS and JS files (including the hashes). Update the paths in the `functions.php` code accordingly.

## 4. Add the Root HTML Element

Your React application needs an HTML element to render itself into. By default, this application uses a `div` with the ID `root`.

You can add this `div` to any WordPress page, post, or template file where you want the social media downloader to appear:

```html
<div id="root">
    <!-- Your React app will be loaded here -->
</div>
```

You can add this HTML using:
- The WordPress block editor (using a "Custom HTML" block).
- A WordPress page template file.
- A shortcode that outputs this `div`.

## 5. Important Considerations

*   **Asset Paths:** If your WordPress site is installed in a subdirectory (e.g., `yourdomain.com/blog/`), or if you place the assets in a location that causes path issues, the React app might not load correctly because it can't find its resources. The `vite.config.js` file (which controls the base path for assets) is currently read-only in this environment. If you encounter issues with asset loading (like 404 errors for JS/CSS files), you might need to adjust how assets are served or manually ensure paths are correct.
*   **Styling Conflicts:** There might be CSS conflicts between your WordPress theme's styles and the React app's styles. You may need to add more specific CSS rules or adjust your theme's CSS to resolve them.
*   **JavaScript Conflicts:** Similarly, ensure there are no JavaScript conflicts with other plugins or your theme's scripts.
*   **Updates:** Whenever you update your React application, you'll need to:
    1.  Run `npm run build` again.
    2.  Re-upload the new files from `dist/assets` to your WordPress theme.
    3.  Update the filenames (if the hashes changed) in your `functions.php` file.

This approach allows you to embed your modern React application within your existing WordPress website.
