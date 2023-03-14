/**
 *
 *
 * <h2>webex Device Macro select inputs.</h2>
 * The device user should be able to walk into the meeting room, tap on the JIBB icon on the UI and it will automatically snap to the whiteboard and start detecting/sharing the JIBB Workspace.
 * <h3>Description:</h3>
 * <ul >
 *  <li> start and stop button.
 *  <li> can choose camera input.
 *  <li> camera will snap to whiteboard that admin preset.
 * </ul>
 *  <img src="./img/camera_inputs.png" />
 *  <img src="./img/camera_inputs_connect.png" />
 *  <img src="./img/camera_inputs_error.png" />
 *  <ul style="list-style: none;">
 *  <li>Click on source to see the script example.
 * </ul>
 * <h3>File Description</h3>
 * <ul style="list-style: square;">
 *  <li> jibb.js -> entry point
 *  <li> jibbWebexXapi.js -> JIBB library for Webex devices
 * </ul>
 * <h3>Installation</h3>
 * <ul style="list-style: circle;">
 *  <li> downalod webexMacrosExamples.zip from https://github.com/jibb-open/jssdk/releases.
 *  <li> Log into your Cisco Room Device as and admin.
 *  <li> Navigate to the setup -> settings -> HttpClient, set Mode to On.
 *  <li> <img src="./img/https-settings.png" />
 *  <li> Navigate to the Macro Editor.
 *  <li> Import and Save each of the following Macros into the Room System: jibbWebexXapi.js found under jssdk folder and jibb.js from desired example.
 *  <li> Edite jibb.js by adding your personal Jibb ApiKey to in line 49, to get your ApiKey visit https://app.jibb.ai/ then navigate to personal settings and click Generate.
 *  <li> Edite jibb.js by add desired Email to receive a pdf Recording of the session to in line 50.
 *  <li> Save and activate jibb.js .
 *  <li> After refreshing the webage you will find  jibb panel automatically added in the UI Extension Editor. variable uiExtension line 325 is is the exported XML panel
 *  <li> Using touch panel create a camera preset "Jibb1" for input 1 (case sensitive) so that camera postion will be set automatically, Jibb2 for input 2 and jibb3 for input 3 
 *  <li> If not set script will work but camera postions needs to be set manually before clicking start.
 *  <li> <img src="./img/camera-presets.png" />  
 * </ul>
 * 
 * <h3>Click on source to see the script example.</h3>
 * @name 4-webexDeviceExample
 * @memberof Examples
 *
 * 
 */
codeWillAutoGenerateOnGithubAction