$(".post_options").click(function(){
    $(this).toggleClass("active");
    
});
$(document).ready(function(){
    $(".box-tools button").click(function(){
        var choice=$(this).data("widget");
        switch(choice){
            case "collapse":$(".direct-chat .box-body ,.direct-chat .box-footer ,.direct-chat .sort-by").slideToggle();
                            break;
            case "chat-pane-toggle":$(".direct-chat").toggleClass("direct-chat-contacts-open");
                                    break;
            case "remove":$(".direct-chat").hide();
                          break;
        }
    });
    manageWidth();
});

$(".allMessages").css("height",$(window).height()-40+"px");
$(".allMessages .recent-chat-container,.allMessages .recent-chat-container").css("height",$(window).height()-90+"px");

$(".allMessages .current-chat .direct-chat-messages").css("height",$(window).height()-150+"px");
$(window).on("resize",manageWidth);
$(".to-dos").css("max-height",$(window).height()-140+"px");

function manageWidth(){
    if($(window).width()<=992)
    {$(".nav_bar").addClass("translatey100");}
    else{
    $(".nav_bar").removeClass("translatey100");
    }
    if($(window).width()>640)
$("header .recent-chat-list").css("height",$(window).height()*0.67+"px");
$(".main .nav_bar").css("max-height",$(window).height()-50+"px");
}

$(".add_btn , .new_todo a").click(function(){
    $(".new_todo").toggleClass("none");
    //add to resize too
  });

$(".task_bar").click(function(){
    $(".tasks").toggle();
$(".to-dos").css("max-height",$(window).height()-160+"px");
});
