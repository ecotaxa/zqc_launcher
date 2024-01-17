const { invoke } = window.__TAURI__.tauri;
const { open } = window.__TAURI__.dialog;
const { appDataDir } = window.__TAURI__.path;
const { Command } = window.__TAURI__.shell;
const { writeFile, exists, removeFile, createDir } = window.__TAURI__.fs;

let addDrivesEl;
let addedDrivesList;
let generateDockerEl;
let driveMappingsEl;
let errorsFooter;

let drives = [];

async function openWindow() {
  console.log('Opening window...');
  // Open a selection dialog for directories
  const selected = await open({
    directory: true,
    multiple: true
  });

  if (selected === null) {
    // user cancelled the selection
    return;
  } else {
    // user selected one or multiple directories
    addDrive(selected);
  }
}

function addDrive(selected_drives) {
  console.log('Adding drive...');
  selected_drives.forEach(drive => {
    if (!drives.includes(drive)) {
      drives.push(drive);
    }
  });
  displayDrives();
}

function displayDrives() {
  console.log('Displaying drives...');
  addedDrivesList.innerHTML = ''; // Clear previous list

  drives.forEach((drivePath, index) => {
    const listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(drivePath));

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '&#10006;'; // Cross symbol HTML entity
    deleteButton.classList.add('crossButton');
    deleteButton.onclick = () => removeDrive(index);

    listItem.appendChild(deleteButton);
    addedDrivesList.appendChild(listItem);
  });
}

function removeDrive(index) {
  console.log('Removing drive...');
  drives.splice(index, 1);
  displayDrives();
}

function generateDriveMappings() {
  console.log('Generating drive mappings...');
  let mapping = [];
  const driveMappings = drives.reduce((acc, drive) => {
    const dockerDriveName = drive.replace(/[:\\\/]/g, '_');
    acc += `<div>${drive} => ${dockerDriveName}</div>`;
    mapping.push({ local_drive: drive, docker_drive: dockerDriveName });
    return acc;
  }, '');
  driveMappingsEl.innerHTML = driveMappings;
  return mapping;
}

async function generateDockerCompose(mapping, appDataDirPath) {
  const fileName = 'docker-compose.yml';
  console.log('Deleting docker compose...');
  await deleteDockerComposeYAML(appDataDirPath, fileName)

  console.log('Generating docker compose...');
  const dockerCompose = {
    version: "'3'",
    services: {
      app: {
        image: 'ecotaxa/zqc_app:latest',
        command: 'python index.py',
        volumes: mapping.map(drive => {
          let dockerFolder = "/usr/data/";
          return `${drive.local_drive}:${dockerFolder}${drive.docker_drive}`;
        }),
        ports: ['"8050:8050"']
      }
    }
  };

  const dockerComposeYAML = objectToYaml(dockerCompose);
  await writeDockerComposeYAML(dockerComposeYAML, appDataDirPath, fileName);
}

function objectToYaml(obj, indent = 0) {
  console.log('Converting object to YAML...');
  let output = '';
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      output += ' '.repeat(indent) + key + ':';
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        output += '\n' + objectToYaml(obj[key], indent + 2);
      } else if (Array.isArray(obj[key])) {
        output += '\n' + arrayToYaml(obj[key], indent + 2);
      } else {
        output += ' ' + obj[key] + '\n';
      }
    }
  }
  console.log(output);
  return output;
}

function arrayToYaml(arr, indent = 0) {
  console.log('Converting array to YAML...');
  let output = '';
  arr.forEach(item => {
    if (typeof item === 'object') {
      output += ' '.repeat(indent) + '-\n' + objectToYaml(item, indent + 2);
    } else {
      output += ' '.repeat(indent) + '- ' + item + '\n';
    }
  });
  return output;
}

async function writeDockerComposeYAML(yaml, appDataDirPath, fileName) {
  console.log('Writing docker compose YAML...');
  const filePath = appDataDirPath + fileName;
  const res = await writeFile({
    contents: yaml,
    path: filePath
  });
}

async function deleteDockerComposeYAML(appDataDirPath, fileName) {
  console.log('Deleting docker compose YAML...');
  const filePath = appDataDirPath + fileName;
  try {
    // Check if the file exists
    const fileExists = await exists(filePath);
    console.log("File exists: ", fileExists);
    if (fileExists) {
      // Remove the file if it exists
      await removeFile(filePath);

      console.log(`File ${filePath} has been removed.`);
    } else {
      console.log(`File ${filePath} does not exist.`);
    }
  } catch (error) {
    console.error('Error removing file:', error);
  }
}
function showLoader() {
  document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}

async function runDockerCompose(appDataDirPath) {
  errorsFooter.innerHTML = ""
  console.log('Running docker compose...');

  // Show loader and block UI
  showLoader();

  try {
    const appDataDirPath = await appDataDir();
    console.log("App data dir path: ", appDataDirPath);

    const command_down = new Command('run-docker-compose', ['-f', appDataDirPath + 'docker-compose.yml', 'down']);
    console.log("Docker compose down");
    const res_1 = await command_down.execute();
    console.log(res_1);
    if (res_1.code == 1) {
      throw new Error("Docker down : " + res_1.stderr);
    }
    errorsFooter.innerHTML += "✅ Docker down \n";


    const command_pull = new Command('run-docker-compose', ['-f', appDataDirPath + 'docker-compose.yml', 'pull']);
    console.log("Docker compose pull");
    const res_2 = await command_pull.execute();
    console.log(res_2);
    if (res_2.code == 1) {
      throw new Error("Docker pull : " + res_2.stderr);
    }
    errorsFooter.innerHTML += "✅ Docker pulled \n";

    const command_up = new Command('run-docker-compose', ['-f', appDataDirPath + 'docker-compose.yml', 'up', '-d']);
    console.log("Docker compose up");
    const res_3 = await command_up.execute();
    if (res_3.code == 1) {
      throw new Error("Docker compose up : " + res_3.stderr);
    }
    console.log(res_3);
    errorsFooter.innerHTML += "✅ Docker compose up \n";

  } catch (err) {
    console.log("Error in Docker compose operation: ", err);
    errorsFooter.innerHTML += "⚠️ " + err + "\n";
  } finally {
    // Hide loader and unblock UI
    hideLoader();
  }
}

window.addEventListener("DOMContentLoaded", () => {

  addDrivesEl = document.querySelector("#add-drives-form");
  addedDrivesList = document.querySelector("#drives-list");
  generateDockerEl = document.querySelector("#generate-docker-form");
  driveMappingsEl = document.querySelector("#drive-mappings");
  errorsFooter = document.querySelector("#errors-footer");

  document.querySelector("#add-drives-form").addEventListener("submit", (e) => {
    e.preventDefault();
    openWindow();
  });

  document.querySelector("#generate-docker-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const mapping = generateDriveMappings();
    if (mapping.length === 0) {
      console.log("Please add at least one drive");
      return;
    }
    const appDataDirPath = await appDataDir();
    const exist = await exists(appDataDirPath);
    if (!exist) {
      await createDir(appDataDirPath);
      console.log("App data dir created");
    }
    console.log("App data dir path: ", appDataDirPath);

    //create docker compose
    generateDockerCompose(mapping, appDataDirPath);
    console.log("Docker compose generated");
    //run docker compose
    runDockerCompose(appDataDirPath);
  });
});
