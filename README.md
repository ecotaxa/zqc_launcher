# ZQC_launcher

## Introduction
Welcome to ZQC_launcher, a Tauri-based application designed for enhancing your experience with the ZQC app (Zooscan Quality Control App). ZQC_launcher offers a streamlined approach for mapping local drives to Docker volumes and updating and running containers for the ZQC app, which is dedicated to performing quality control on zooscan data from Zooprocess.

## Features
- **Drive Mapping**: Easily map your local drives to Docker volumes, simplifying the process of data accessibility for Docker containers.
- **Automatic Updates**: Seamlessly update and run the ZQC app container, ensuring you always have the latest features and fixes.
- **Cross-Platform Compatibility**: Thanks to Tauri, ZQC_launcher works smoothly on Windows, MacOS, and Linux.
- **User-Friendly Interface**: A straightforward, vanilla JavaScript UI makes your tasks effortless and intuitive.

## Requirements
- Docker installed on your system.
- Basic understanding of Docker volume management.
- ZQC_app container ready for use on the ecotaxa docker registry.

## Installation
1. **Clone the Repository**:
   ```shell
   git clone https://github.com/your-repo/ZQC_launcher.git
   ```
2. **Navigate to the App Directory**:
   ```shell
   cd ZQC_launcher
   ```
3. **Install Dependencies**:
   ```shell
   npm install
   ```
4. **Run the Application**:
   ```shell
   npm start
   ```

## Usage
1. **Map Local Drives**: Follow the instructions in the app to map your local drives to Docker volumes.
2. **Generate ZQC App**: Use the generate feature to keep your ZQC app container up-to-date and start the ZQC app container directly from the ZQC_launcher.
3. **Launch ZQC App**: Open the zqc app in a browser window.

## CI 

1. **Build Triggered by New Tag**:
   - Make sure to set the package version in `package.json`, `tauri.conf.json` and `Cargo.toml`.
   - Upon pushing a new tag (`git tag -a v0.0.0 -m "MESSAGE"` and `git push --follow-tags`), the zqc launcher is built for Windows, MacOS and Linux.

3. **Draft Release Creation**:
   - A draft release note, tagged 'main', is automatically generated.
   - This includes executables for the current software version.

4. **Review Process**:
   - The draft release note need to be reviewed for accuracy and completeness.
   - Executables need to be checked for any issues.
   - Necessary changes are applied to the release note and executables.

5. **Publishing the Release Note**:
   - The final release note is published, marking the release as official.
   - The 'main' tag may be updated to a specific version tag.

This CI process ensures that each release is systematically built, reviewed, and documented before being made available to users.

For more information, issues, or feature requests, please visit [ZQC_launcher GitHub Repository](https://github.com/ecotaxa/zqc_launcher).

**Happy Quality Controlling with ZQC_launcher!**
