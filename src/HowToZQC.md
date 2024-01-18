# Quality Control for Zooscan Data

This guide provides step-by-step instructions for running quality controls on Zooscan data folders produced by ZooProcess. We'll use Docker Desktop and the zqc_launcher from the PIQv website. **Please note that Docker Desktop must be opened every time you wish to run the zqc app container.**

## Prerequisites
- Operating System: Windows, macOS, or Linux.

## Step 1: Install Docker Desktop

1. **Download Docker Desktop**: Visit the [Docker website](https://www.docker.com/products/docker-desktop/) and download Docker Desktop for your operating system.

2. **Install Docker Desktop**: Follow the installation guide provided by Docker for your specific platform.
   - For Windows and macOS: Double-click the installer and follow the on-screen instructions.
   - For Linux: Follow the instructions on the Docker website to install Docker Desktop.

3. **Open Docker Desktop**: Remember to open the Docker Desktop application each time before running the container, as it is essential for the container to function.

## Step 2: Download the zqc_launcher

1. **OR Acess zqc_launcher releases**: Go to ecotaxa github zqc_launcher project at [Releases URL](https://github.com/ecotaxa/zqc_launcher/releases)

2. **Download zqc_launcher**: Locate the zqc_launcher download link for your operating system and download it to your computer.

## Step 3: Map Local Drives to Docker Volume

1. **Open zqc_launcher**: Run the zqc_launcher you downloaded. Due to security on macOS system to run it [option + right click] on the app icon then click open.

2. **Map Drives**: Use the user-friendly interface to select and map your local drives (where Zooscan projects are stored) to a Docker volume. Note that Zooscan projects should be located at the root of the selected drives; otherwise, you will not be able to access them from the application. This process allows Docker to access the data for processing and writing quality control reports in it.

## Step 4: Generate the Docker Container

1. **Use zqc_launcher**: In the zqc_launcher interface, generate the Docker container. This process will shut down previous Docker containers, pull the latest version of zqc_app, and prepare the environment for running quality controls on the Zooscan data drive you just selected.

2. **Monitor Progress**: Wait for the Docker container to be generated. This may take a few minutes depending on your system.

Info: Change the drives selection and regenerate Docker to see changes in the zqc_app.

## Step 5: Run Quality Control

1. **Open App**: Once the Docker container is ready, click on "Open App" in the zqc_launcher interface.

2. **Run Quality Control**: The Zooscan quality control application should now be accessible. Follow the on-screen instructions to start the quality control process on your data.

3. **Save the Result**: Once quality control execution is done, click on the "↓" to save it on the report folder of the project.

## Troubleshooting

- If you encounter any issues during the installation of Docker Desktop, consult the [Docker documentation](https://www.docker.com/products/docker-desktop/).
- For specific issues related to the installation or process of zqc_launcher and zqc_app, please send an email to our team at zqc.contact@group.imev-mer.fr