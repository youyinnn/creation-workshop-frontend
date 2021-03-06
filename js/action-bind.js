$(function() {
    // head bar event
    $('#headtitle,#logo').click(function() {
        resetdb()
        remove_all_cache()
    })

    // bottom bar btn event
    $('#chatbtn').click(function() {
        if (!$('#chatbtn').hasClass('active')) {
            hide_leftbtn()
            need_right_function('plus-square-o', show_hide_add_funcbtn)
            get_subpanel_up(ideasquaresubpanel)
        }
    })
    $('#contextbtn').click(function() {
        if (!$('#contextbtn').hasClass('active')) {
            hide_leftbtn()
            hide_rightbtn()
            get_subpanel_up(contextsubpanel)
        }
    })
    $('#mebtn').click(function() {
        if (!$('#mebtn').hasClass('active')) {
            hide_leftbtn()
            hide_rightbtn()
            get_subpanel_up(mesubpanel)
        }
    })
    $('.bottombarbtnlogo').click(function() {
        // should bind it after
        active_bottom_bar_btn($(this))
        return
    })


    // login panel event
    formValidHandle($('#loginform'))
    formSubmitEventBind('#loginform', function(arr) {
        let rs = log_in($('#username')[0].value, $('#password')[0].value)
        if (rs >= 0) {
            localStorage.setItem('loginid', rs)
            loginid = rs + ''
            popmsg('登录成功', 500)
            disable_login_form()
            disable_signin_form()
            setTimeout(() => {
                just_login()
            }, 1000);
        } else if (rs === -1) {
            popmsg('密码错误')
        } else if (rs === -2) {
            popmsg('用户不存在')
        }
        formVreset('#loginform')
    })
    $('#signinbtn').click(function() {
        get_panel_up(signinpanel)
        formVreset('#loginform')
    })


    // sigin panel event
    formValidHandle($('#signinform'))
    formSubmitEventBind('#signinform', function(arr) {
        let rs = sign_in(
            $('#newusername')[0].value,
            $('#email1')[0].value,
            $('#newpassword1')[0].value,
            $('#newpassword2')[0].value
        )
        if (rs === 1) {
            popmsg('注册成功', 500)
            setTimeout(() => {
                get_panel_up(mainpanel)
            }, 1000);
        } else if (rs === 0) {
            popmsg('两次密码输入不一致')
        } else if (rs === 2) {
            popmsg('用户名已存在')
        }
        formVreset('#signinform')
    })
    $('#signinreturn').click(function() {
        get_panel_up(loginpanel)
        formVreset('#signinform')
    })

    // infoupd form event
    formValidHandle($('#infoupdsubpanel'))
    formSubmitEventBind('#infoupdsubpanel', function(arr) {
        update(loginid, arr[0].value, arr[1].value, arr[2].value, arr[3].value)
        reflesh_user_info()
        setTimeout(() => {
            get_infosubpanel_up(infosubpanel)
        }, 1000);
    })

    // chat list event
    $('.chatlistfunbtn').click(function() {
        remove_chat_item(this)
    })

    // * click
    $('*').click(function() {
        if (this.id === 'headrightbtn' ||
            this.id === 'adduserbtn' ||
            this.id === 'addgroup' ||
            this.id === 'addtodo' ||
            this.id === 'addidea') {
            return false
        }
        if (!$('#addfuncpanel').hasClass('hidepanel')) {
            hide_panel_2(addfuncpanel)
        }
    })
    $('#addidea').click(function() {
        new_idea(undefined, {
            rightlogo: 'plus-square-o',
            rightfunc: show_hide_add_funcbtn
        })
    })
    $('#addtodo').click(function() {
        new_todo(undefined, {
            rightlogo: 'plus-square-o',
            rightfunc: show_hide_add_funcbtn
        })
    })

    // todo & idea
    let loop = {
        leftlogo: 'angle-left',
        leftfunc: hide_todo_box,
        rightlogo: 'plus-square-o',
        rightfunc: function() {
            new_todo(undefined, loop)
        }
    }
    $('#todobtn').click(function() {
        show_todo_box(loop)
        change_head_title('待办事项')
    })
    let loop2 = {
        leftlogo: 'angle-left',
        leftfunc: hide_idea_box,
        rightlogo: 'plus-square-o',
        rightfunc: function() {
            new_idea(undefined, loop2)
        }
    }
    $('#ideabtn').click(function() {
        change_head_title('我的点子')
        show_idea_box(loop2)
    })

    // todo
    $('#ingbtn').click(function() {
        if ($('#ingbtn .cohide').length === 1) {
            $('.todocatebox .co').addClass('cohide')
            $('#ingbtn .co').removeClass('cohide')
            present_ing_todo()
        }
    })
    $('#donebtn').click(function() {
        if ($('#donebtn .cohide').length === 1) {
            $('.todocatebox .co').addClass('cohide')
            $('#donebtn .co').removeClass('cohide')
            present_done_todo()
        }
    })
    $('#undonebtn').click(function() {
        if ($('#undonebtn .cohide').length === 1) {
            $('.todocatebox .co').addClass('cohide')
            $('#undonebtn .co').removeClass('cohide')
            present_undone_todo()
        }
    })
    // todo update
    $('#todoinfoboxpanel .infoupdbtn.btn.btn-dark').click(function() {
        $('#todoinfoboxpanel').addClass('hidepanel')
        $('#newtodoinfoboxpanel').removeClass('hidepanel')

        let st = $('#newtodostarttime').val().split(' ')
        let ft = $('#newtodofinishtime').val().split(' ')
        $('#newtodostarttime').datetimepicker({
            defaultDate: st[0],
            defaultTime: st[1]
        })
        $('#newtodofinishtime').datetimepicker({
            defaultDate: ft[0],
            defaultTime: ft[1]
        })
    })
    $('#newtodoreturn').click(function() {
        $('#todoinfoboxpanel').removeClass('hidepanel')
        $('#newtodoinfoboxpanel').addClass('hidepanel')
    })
    $('#newtodosubmit').click(function() {
        update_todo(
            $('#newtodotitle').val(),
            $('#newtodostarttime').datetimepicker('getValue').getTime(),
            $('#newtodofinishtime').datetimepicker('getValue').getTime(),
            $('#newtododetail').val()
        )
        $('#todotitle').val($('#newtodotitle').val())
        $('#todostarttime').val(dayjs($('#newtodostarttime').datetimepicker('getValue').getTime()).format('YYYY/MM/DD HH:mm'))
        $('#todofinishtime').val(dayjs($('#newtodofinishtime').datetimepicker('getValue').getTime()).format('YYYY/MM/DD HH:mm'))
        $('#tododetail').val($('#newtododetail').val())
        setTimeout(() => {
            $('#donebtn').click()
            $('#ingbtn').click()
        }, 200);
        setTimeout(() => {
            $('#newtodoreturn').click()
        }, 600);
    })
    // idea update
    $('#ideainfoboxpanel .infoupdbtn.btn.btn-dark').click(function() {
        $('#ideainfoboxpanel').addClass('hidepanel')
        $('#newideainfoboxpanel').removeClass('hidepanel')

        let st = $('#newideastarttime').val().split(' ')
        $('#newideastarttime').datetimepicker({
            defaultDate: st[0],
            defaultTime: st[1]
        })
    })
    $('#newideareturn').click(function() {
        $('#ideainfoboxpanel').removeClass('hidepanel')
        $('#newideainfoboxpanel').addClass('hidepanel')
    })
    $('#newideasubmit').click(function() {
        update_idea(
            nowideaindex,
            $('#newideatitle').val(),
            $('#newideastarttime').datetimepicker('getValue').getTime(),
            $('#newideadetail').val(),
            get_addil_group_list()
        )
        $('#ideatitle').val($('#newideatitle').val())
        $('#ideastarttime').val(dayjs($('#newideastarttime').datetimepicker('getValue').getTime()).format('YYYY/MM/DD HH:mm'))
        $('#ideadetail').val($('#newideadetail').val())
        $('#ilbox')[0].innerHTML = $('#newilbox')[0].innerHTML
        present_idea()
        setTimeout(() => {
            $('#newideareturn').click()
        }, 400);
    })
    $('#addilbtn').click(function() {
        if ($('#newilbox')[0].innerText.search($('#addil').val()) === -1) {
            let newilbox = $('#newilbox')
            let gn2 = c('span')
            gn2.innerText = $('#addil').val()
            adclass(gn2, 'badge badge-danger m-1')
            appendc(newilbox[0], gn2)
            $(gn2).click(function() {
                $(gn2).remove()
            })
        }
    })


    // send box
    $('#chatsend').click(function() {
        let msg = $('#chattext').val()
        $('#chattext').val('')
        send_chat(nowchatwith, nowchatid, msg)
        present_you_just_send(nowchatwith, msg)
        $('[chatwith = "' + nowchatwith + '"][chatid = "' + nowchatid + '"]')
            .find('.chatlistitembody')
            .find('span').text(msg)
    })

    // chat list item drag event
    // $('.chatlistitem').mousedown(function(e) {
    //     if (event.button == 0) {
    //         let obj = $(this)
    //         if (obj.attr('cx') === undefined) {
    //             obj.attr('cx', e.clientX)
    //         }
    //     }
    //     return false;
    // })
    // $('.chatlistitem').mouseup(function(e) {
    //     if (event.button == 0) {
    //         let obj = $(this)
    //         if (obj.attr('cx') !== undefined) {
    //             if (e.clientX - obj.attr('cx') < 0) {
    //                 $(this).find('.chatlistitemcontent').addClass('chatlistitemcontextmove')
    //             }
    //             obj.removeAttr('cx')
    //         }
    //     }
    //     return false;
    // })
})