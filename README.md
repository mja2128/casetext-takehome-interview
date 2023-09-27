# Casetext Takehome Coding Interview
Thank you for taking the time to review my coding assessment! I separated the code into the `frontend` and `backend` directories containing the client-side and server-side code, respectively. The client-side code is written using React, TypeScript, Tailwind CSS, and Material UI components. The server-side code is written using Node, TypeScript, Express, and node-persist for simple storage.

## Prerequisites
Please install the following tools in order to run the code:
* [Node 20](https://nodejs.org/en)
* [Chrome](https://www.google.com/chrome/) (this is the only browser I tested it on, but I imagine it should work on any chromium-based browser)

## Improvements I'd Make
If I had more time and if this were to be used in a production environment and maintained by people, I would make the following improvements:
* Make the UI follow the design mocks more closely
* Make the UI responsive and look good for various screen sizes
* Use grids or a better layout system for the UI. It's very brittle right now
* Actually break the front end up into components using the Atomic Design Principle, some components I would break out are:
  * `<CardLogos selected={cardType} />`
  * `<Screen />`
  * `<LeftButtons />`
  * `<RightButtons />`
* Probably add styled modal windows for input and feedback, as opposed to window prompts and alerts
* Add authentication to the API
* Set it up to use HTTPS for secure API communication
* Better error handling
* Make the code more DRY (remove repeated code)
* Add actual database support instead of using node-persist
* Encrypt PIN numbers instead of storing/transmitting them in plaintext