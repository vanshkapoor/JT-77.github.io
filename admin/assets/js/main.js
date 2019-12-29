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
    // manageWidth();
});

$(".allMessages").css("height",$(window).height()-40+"px");
$(".allMessages .recent-chat-container,.allMessages .recent-chat-container").css("height",$(window).height()-90+"px");

$(".allMessages .current-chat .direct-chat-messages").css("height",$(window).height()-150+"px");
$(".main .nav_bar").css("max-height",$(window).height()-50+"px");


