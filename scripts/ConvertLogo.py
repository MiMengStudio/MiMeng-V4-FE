from PIL import Image
import os
from datetime import datetime

def convert_logo(input_logo_path="logo.png", output_dir="."):
    """
    Converts a logo.png file into various sizes and formats.

    Args:
        input_logo_path (str): The path to the input logo.png file.
        output_dir (str): The directory where the converted images will be saved.
    """
    if not os.path.exists(input_logo_path):
        print(f"Error: Input file '{input_logo_path}' not found.")
        return

    os.makedirs(output_dir, exist_ok=True)

    try:
        img = Image.open(input_logo_path)
    except Exception as e:
        print(f"Error opening image '{input_logo_path}': {e}")
        return

    # Define the output formats and sizes
    conversions = {
        "128x128.png": (128, 128),
        "128x128@2x.png": (256, 256),  # Assuming @2x implies double resolution
        "32x32.png": (32, 32),
        "icon.png": (1024, 1024),  # A general purpose icon.png, can be adjusted
        "Square107x107Logo.png": (107, 107),
        "Square142x142Logo.png": (142, 142),
        "Square150x150Logo.png": (150, 150),
        "Square284x284Logo.png": (284, 284),
        "Square30x30Logo.png": (30, 30),
        "Square310x310Logo.png": (310, 310),
        "Square44x44Logo.png": (44, 44),
        "Square71x71Logo.png": (71, 71),
        "Square89x89Logo.png": (89, 89),
        "StoreLogo.png": (50, 50), # Common size for app store logos, adjust if needed
    }

    # Special handling for .ico and .icns
    # For .ico, we'll create multiple sizes within one file for better compatibility
    ico_sizes = [(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    # For .icns, we'll create multiple sizes and combine them. Needs a specific format.
    # Pillow's save method for .icns might not support all resolutions directly as iconutil does.
    # For robust .icns generation on macOS, `iconutil` command-line tool is often preferred.
    # Here, we'll just save a single large icon. For full .icns, consider external tools or more complex Pillow usage.

    output_files_info = []

    for filename, size in conversions.items():
        try:
            resized_img = img.resize(size, Image.LANCZOS)
            output_path = os.path.join(output_dir, filename)
            resized_img.save(output_path)
            file_size = os.path.getsize(output_path)
            output_files_info.append((output_path, file_size))
        except Exception as e:
            print(f"Error converting {filename}: {e}")

    # Generate .ico file
    try:
        ico_path = os.path.join(output_dir, "icon.ico")
        # Prepare images for .ico, resizing and adding to a list
        ico_images = []
        for s_w, s_h in ico_sizes:
            ico_images.append(img.resize((s_w, s_h), Image.LANCZOS))

        # Save the first image, and append others to it for multi-size .ico
        if ico_images:
            ico_images[0].save(ico_path, sizes=ico_sizes)
            file_size = os.path.getsize(ico_path)
            output_files_info.append((ico_path, file_size))
        else:
            print("Warning: No sizes defined for .ico generation.")

    except Exception as e:
        print(f"Error generating icon.ico: {e}")

    # Generate .icns file (basic implementation)
    try:
        icns_path = os.path.join(output_dir, "icon.icns")
        # For .icns, a common practice is to have a 1024x1024 base image.
        # Pillow can save to .icns, but for full multi-resolution .icns bundles
        # on macOS, 'iconutil' is the standard. This is a simple save.
        icns_base_size = (1024, 1024)
        icns_img = img.resize(icns_base_size, Image.LANCZOS)
        icns_img.save(icns_path, format='ICNS')
        file_size = os.path.getsize(icns_path)
        output_files_info.append((icns_path, file_size))
    except Exception as e:
        print(f"Error generating icon.icns: {e}")

    print("\n--- Conversion Summary ---")
    current_time = datetime.now().strftime("%Y/%m/%d %H:%M")
    for path, size in output_files_info:
        filename = os.path.basename(path)
        print(f"{current_time}           {size:,} {filename}")

if __name__ == "__main__":
    # Ensure logo.png is in the same directory as the script, or provide the full path
    convert_logo(input_logo_path="logo.png", output_dir=".")
    print("\nConversion complete!")