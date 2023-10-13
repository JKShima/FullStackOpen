```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server

    Note right of browser: We send the note as JSON data: 
    {"content": "testest2","date": "2023-10-13T18:15:04.876Z"}

    server-->>browser: Status code 201 created
    deactivate server

    Note right of browser: The server does not ask to redirect. The browser stays on the same page.
```