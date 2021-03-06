// panel
var mainpanel = $('#mainpanel')
var loginpanel = $('#loginpanel')
var signinpanel = $('#signinpanel')
var nowpanel = loginpanel

// subpanel
var ideasquaresubpanel = $('#ideasquaresubpanel')
var contextsubpanel = $('#contextsubpanel')
var mesubpanel = $('#mesubpanel')
var nowsubpanel = ideasquaresubpanel

mesubpanel.outfunc = function() {
    hide_todo_box()
    todoinfobox.css('right', '-100%')
    todoinfobox.css('opacity', '0')
    hide_idea_box()
    ideainfobox.css('right', '-100%')
    ideainfobox.css('opacity', '0')

    hide_group_info_box()
    
    reset_head_title()
    get_infosubpanel_up(infosubpanel)
    formVreset('#infoupdsubpanel')
}

contextsubpanel.outfunc = function() {
    hide_friend_info_box()
    hide_group_info_box()
}

// float panel
var addfuncpanel = $('#addfuncpanel')

// person info subpanel
var infosubpanel = $('#infosubpanel')
var infoupdsubpanel = $('#infoupdsubpanel')
var nowinfosubpanel = infosubpanel

// bottom bar btn
var chatbtn = $('#chatbtn')
ideasquaresubpanel.btn = chatbtn
var contextbtn = $('#contextbtn')
contextsubpanel.btn = contextbtn
var mebtn = $('#mebtn')
mesubpanel.btn = mebtn
var nowactivebtn = chatbtn
var bottombar = $('#bottombar')

// chat box
var chatbox = $('#chatbox')
var chatlogbox = $('#chatlogbox')

// head bar btn
var leftbtn = $('#headleftbtn')
var rightbtn = $('#headrightbtn')
var headtitle = $('#headtitle')
var headtitlesearch = $('#headtitlesearch')
var headbar = $('#headbar')
var leftbtnlogo
var rightbtnlogo

// user login cache
var loginid = localStorage.getItem('loginid')

// chat flag
var nowchatwith
var nowchatid

// context info
var friendinfobox = $('#friendinfobox')
var groupinfobox = $('#groupinfobox')

// todo idea
var todobox = $('#todobox')
var todoinfobox = $('#todoinfobox')
var ideabox = $('#ideabox')
var ideainfobox = $('#ideainfobox')
var todolist = $('#todolist')
var idealist = $('#idealist')
var ideasquarelist = $('#ideasquarelist')
var nowtodoindex
var nowideaindex

var filebox = $('#filebox')

$(function() {
    // animations
    bottombar.animateCss('fadeIn')
    headtitle.animateCss('fadeIn')

    if (loginid === null) {
        setTimeout(() => {
            show_login_form()
        }, 700);
    } else {
        disable_login_form()
        disable_signin_form()
        setTimeout(() => {
            just_login()
        }, 1500);
    }

})