# Static Electricity Simulation

This project is a simple interactive web demo that shows how static electricity works when two materials are rubbed together.

## Features
- Visual simulation of electron transfer
- Material pair selection
- Charge status updates
- Educational explanation panel
- Quick quiz for learning

## How to run locally
Open the index.html file in a browser, or serve the folder using a simple local web server.

## Docker deployment
Build the image:
```bash
docker build -t static-electricity-app .
```

Run the container:
```bash
docker run -d -p 80:80 static-electricity-app
```

Open the app in your browser at:
```text
http://localhost
```

## Project goal
This project is designed to be a polished internship-ready demo that explains the science behind static electricity in an interactive, easy-to-understand way.
