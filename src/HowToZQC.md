# Quality Control for Zooscan Data

This guide provides step-by-step instructions for running quality controls on Zooscan data folders produced by ZooProcess. We'll use Docker and the zqc_launcher from the PIQv website.

## Prerequisites
- Basic understanding of command-line operations.
- Operating System: Windows, macOS, or Linux.

## Step 1: Install Docker

1. **Download Docker**: Visit the [Docker website](https://www.docker.com/get-started) and download the appropriate version for your operating system.

2. **Install Docker**: Follow the installation guide provided by Docker for your specific platform.
   - For Windows and macOS: Double-click the installer and follow the on-screen instructions.
   - For Linux: Use package management commands to install Docker. Instructions vary depending on the distribution.

3. **Verify Installation**: Open a terminal or command prompt and run:
   ```bash
   docker --version
   ```
   This command should return the Docker version, confirming successful installation.

## Step 2: Download the zqc_launcher

1. **Access PIQv Website**: Go to the PIQv website at [PIQv URL](https://sites.google.com/view/piqv/softwares/flowcamzooscan?authuser=0).

2. **Download zqc_launcher**: Locate the zqc_launcher download link and download it to your computer.

## Step 3: Map Local Drives to Docker Volume

1. **Open zqc_launcher**: Run the zqc_launcher you downloaded from the PIQv website.

2. **Map Drives**: Use the user-friendly interface to select and map your local drives (where Zooscan projects are stored) to a Docker volume. Note that Zooscan projects should be located at the root of the selected drives; otherwise, you will not be able to access them from the application. This process allows Docker to access the data for processing and writing quality control reports in it. 

## Step 4: Generate the Docker Container

1. **Use zqc_launcher**: In the zqc_launcher interface, generate the Docker container. This process will down previous docker conteners, pull latest version of zqc_app and prepare the environment for running quality controls on Zooscan data drive you just selected.

2. **Monitor Progress**: Wait for the Docker container to be generated. This may take a few minutes depending on your system.

Info : Change the drives selection and re generate docker to see changes in the zqc_app.

## Step 5: Run Quality Control

1. **Open App**: Once the Docker container is ready, click on "Open App" in the zqc_launcher interface.

2. **Run Quality Control**: The Zooscan quality control application should now be accessible. Follow the on-screen instructions to start the quality control process on your data.

3. **Save the result**: Once quality control execution is done, click on the "↓" to save it on the report folder of the project.

## Troubleshooting

- If you encounter any issues during installation of docker, consult the [Docker documentation](https://docs.docker.com/).
- For specific issues related to installation or process of zqc_launcher and zqc_app, please send an email to our team at zqc.contact@group.imev-mer.fr
