# 🟠 Custom events

- [Event Cheatsheet](https://gist.github.com/Iliannnn/f4985563833e2538b1b96a8cb89d72bb) by Iliannnn

To add a custom event, create a new Javascript file in the `events/` folder:
```js
module.exports = {
    execute: async (message, client) => {
        console.log(message.content);
    }
}
```
The name of the file must correspond with the event identifier. For instance, the above file is named `messageCreate.js`.

## What you need to know
1. The `message` argument in the example `execute()` method corresponds with `...args`, which means there can be any amount of arguments before the client is passed depending on the event type.
1. If you only want the `execute()` method to run once, add the `once: true` property to your `module.exports`.

## All events
```
applicationCommandPermissionsUpdate
apiRequest
apiResponse
channelCreate
channelDelete
channelPinsUpdate
channelUpdate
debug
emojiCreate
emojiDelete
emojiUpdate
error
guildBanAdd
guildBanRemove
guildCreate
guildDelete
guildIntegrationsUpdate
guildMemberAdd
guildMemberAvailable
guildMemberRemove
guildMembersChunk
guildMemberUpdate
guildScheduledEventCreate
guildScheduledEventDelete
guildScheduledEventUpdate
guildScheduledEventUserAdd
guildScheduledEventUserRemove
guildUnavailable
guildUpdate
interaction
interactionCreate
invalidated
invalidRequestWarning
inviteCreate
inviteDelete
messageCreate
messageDelete
messageDeleteBulk
messageReactionAdd
messageReactionRemove
messageReactionRemoveAll
messageReactionRemoveEmoji
messageUpdate
presenceUpdate
rateLimit
ready
roleCreate
roleDelete
roleUpdate
shardDisconnect
shardError
shardReady
shardReconnecting
shardResume
stageInstanceCreate
stageInstanceDelete
stageInstanceUpdate
stickerCreate
stickerDelete
stickerUpdate
threadCreate
threadDelete
threadListSync
threadMembersUpdate
threadUpdate
typingStart
userUpdate
voiceStateUpdate
warn
webhookUpdate
```