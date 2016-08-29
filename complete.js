var ui = initUi()
var state = initState()
var db = initDb()

$(startApp)

function startApp() {
  ui.accountButton.click(toggleLogin)
  ui.postMessageButton.click(postMessage)

  onAuth(null);
  db.auth.onAuthStateChanged(onAuth);
  db.messagesRef.on('child_added', onMsgSnapshot)
}
function initState() {
  return {}
}
function initDb() {

  var root = firebase.database().ref()

  return {
    root: root,
    auth: firebase.auth(),
    authProvider: new firebase.auth.GoogleAuthProvider(),
    messagesRef: root.child('messages')
  }

}
function initUi() {
  return {
    userInfo: $('#userInfo'),
    messageList: $('#messageList'),
    dashboard: $('#dashboard'),
    postMessageButton: $('#postMessage'),
    messageInput: $('#messageInput'),
    accountButton: $('#accountButton')
  }
}
function onAuth(user) {
  state.user = user;
  console.log('user state changed', user);
  if (user) {
    ui.userInfo.text(user.displayName)
    ui.accountButton.text('log out')
  } else {
    ui.userInfo.text('')
    ui.accountButton.text('log in')
  }
  ui.accountButton.show()
  ui.userInfo.toggle(!!user);
}
function toggleLogin(){
  ui.accountButton.hide()
  ui.userInfo.text('...loading')

  if (state.user) db.auth.signOut();
  else db.auth.signInWithRedirect(db.authProvider)
}
function onMsgSnapshot(snapshot) {
  var msg = snapshot.val();
  var className = 'message message-' + snapshot.key
  var messageItem = 
    '<div class="' + className + '">' 
    + msg.text  
    + ' by ' 
    + msg.name
    + ' at '
    + msg.date
    +  '</div>'
  ui.messageList.append(messageItem)
}
function postMessage() {
  var text = ui.messageInput.val();
  var name = state.user ? state.user.displayName : 'hackerz!';
  var uid = state.user && state.user.uid
  var date = new Date().toString();
  var msg = {text:text, name: name, date: date, uid: uid};

  // var id = (+new Date()).toString()
  var key = db.messagesRef.push().key // push() generates a new ref

  db.messagesRef.child(key).set(msg)
}
