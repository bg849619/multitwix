# MultiTwix

A multi-twitch viewer designed for incorporating into livestreams. Inspired by [multitwitch.tv](https://multitwitch.tv)
  
**Why the name?**  
This program was originally developed for Ohio University Esports' livestreams, which are ran using vMix.  
It is a **Multi**ple **Tw**itch stream display for vM**ix**.  

## Components

### Webserver

The central part of the program is a webserver that presents a single REST endpoint.

#### `/streams`

A `POST` to this endpoint with a JSON array will update the saved list of Twitch channels.  
A `GET` to this endpoint will retrieve this saved list.

### Viewer

The single endpoint was technically a lie. The webserver also presents an endpoint at `/view/`. (The trailing `/` is significant.) Some basic HTML, CSS, and JavaScript creates a display of up to 4 different twitch stream embeds. If there are more than 4 streams, the display will swap through groups of 4 in a cycle. Upon a change to the `/streams` list, the page will refresh with the new list. This page should be added as a source or input in your streaming software of choice. If you have some CSS skills, some minor changes can be made to the layout. More advanced edits will require some changes to the logic.

### Admin Panel

The endpoint at `/admin/` provides a frontend to managing the streams list. Add or remove twitch channels at will. Once your changes are complete, click 'Apply' to commit your changes. The viewer will refresh with the new list.

## Using

This application requires [Node.js](https://nodejs.org) to be installed.  
  
Once Node.js has been installed, either download this repository and extract into its own folder, or clone this repository:

```text
git clone https://github.com/bg849619/multitwix
```

Inside the resultant folder, run the following command to install the required libraries.

```text
npm i
```

Now, to run the program, use `npm start` in the same folder. To stop the program, use Ctrl+C in the terminal. Some users may opt to create a Shell or Batch file to make it easier for end-users to run.  

Use the aformentioned components in your environment.  

`settings.json` contains some default channels that are used when the application is started, as well as the port used for the webserver.

## Contributing

Make a merge request! I'll look at it! And thank you in advance!  
Issues for feature requests or bugs are also welcome forms of contribution.

## License

This software is provided free of charge, and shall only be redistributed free of charge. Redistribution of this software or modifications of this software that use its code in its entirety shall include credit to the original author.
