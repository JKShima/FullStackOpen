sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server

    Note right of browser: Submit data (note: testest)

    server-->>browser: Do HTTP GET request to https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server

    Note right of browser: The server asks the browser to do a new HTTP GET request to /notes
    Note right of browser: Reloading the notes page causes three HTTP requests.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS File
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: Javascript File
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON data from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "testest", "date": "2023-10-13" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes to display