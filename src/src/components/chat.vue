<template>
  <v-app class="chat-page">
      <v-row>
          <v-col class="col-12 col-md-3 chat-sidebar">
              <h2>Chats</h2>
              <v-text-field
                placeholder= "Search message"
                append-icon="mdi-magnify"
                rounded
                dense
                filled
              />
              <div class="chats">
                  <v-card>
                      <v-row v-for="(chat, i) in chats"  :key="i">
                          <v-col class="col-md-2 chat-profile">
                               <v-avatar>
                                   <v-img :src="chat.profile" :alt="chat.name"></v-img>
                               </v-avatar>
                          </v-col>
                          <v-col class="col-md-9 chat-details">
                              <h4>{{ chat.name }}</h4>
                              <p>{{ chat.messageStatus }}</p>
                              <span><p class="unread-messages">{{ chat.messagesNumber }}</p></span>
                          </v-col>
                      </v-row>
                  </v-card>
              </div>
          </v-col>
          <v-col class="col-12 col-md-8 chat-content">
              <v-row v-for="(chat, i) in chats" :key="i" class="chat-header">
                    <v-col class="col-md-1 chat-profile">
                        <v-avatar>
                            <v-img :src="chat.profile" :alt="chat.name"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col class="col-md-11">
                        <h4>{{ chat.name }}</h4>
                        <p>{{chat.state}}</p>
                    </v-col>
               </v-row>
               <v-row class="chat-page">
                   <v-col class="receiver col-md-12">
                       <p class="message msg1-rec">Vip wa gasore we</p>
                       <p class="message">Ko ubuzeho x mn??</p>
                   </v-col>
                   <v-col class="sender col-md-12">
                       <p class="message msg1-send">Yooooo umusaza</p>
                       <p class="message" style="animation: loader 1s infinite;">...</p>
                   </v-col>
               </v-row>
               <v-row class="message-row">
                   <v-text-field
                            placeholder= "Type something ..."
                            append-icon="mdi-send"
                            class="message-input"
                            rounded
                        />
               </v-row>
          </v-col>
      </v-row>
  </v-app>
</template>

<script>
export default {
    data: ()=>({
        chats: [
            {
                profile: 'http://127.0.0.1:5500/src/assets/images/student4.png',
                name: 'Manzi Gustave',
                messageStatus: 'Typing...',
                messagesNumber: 1,
                state: 'online'
            }
        ],
        messages: [
            {
                content: ''
            }
        ]
    })
}
</script>

<style>

</style>