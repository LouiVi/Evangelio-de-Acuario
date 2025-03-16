cfg.Portrait, cfg.Light, cfg.MUI;
app.LoadPlugin( "Utils" );
var c = 0;

//Called when application is started.
function OnStart()
{    
//app.CopyFile( "Misc/El-evangelio-acuario-de-Jesus.txt", "Acuario.txt" );
	utils = app.CreateUtils();
	col1 = "#42F4EF";
    col2 = utils.GetGradientColors(col1);
    utils.SetTheme(col1);
	//Create the main app layout.
	layMain = app.CreateLayout( "Linear", "HCenter,FillXY" );
	layMain.SetBackColor( "#ffffff" );
	
	//Create an 'Action Bar' and drawer.
	CreateActionBar()
	CreateDrawer()
	
	//Create the app content layout.
	layContent = app.AddLayout( layMain, "Linear", "Left,Top,HCenter,FillXY" );
    layContent.SetSize( 1.0, 0.95 );
    
    //CreateContent()
    
	//Create a text label and add it to main layout.
	//txt = app.AddText( layMain, "<-- arrastra desde la izquierda" )
//	txt.SetTextSize( 24, "dip" )
	
	//Add main layout and drawer to app.	
	app.AddLayout( layMain )
	app.ShowProgress( "Cargando ..." )
	app.Wait(1, false);
	CreateContent()
	
	app.AddDrawer( drawerScroll, "Left", drawerWidth )
	//Create main content.
    
	app.HideProgress();
	ReadText();
	
	
}

//Create the main app content.
function CreateContent()
{
	//Create a text label heart icon.
	//txtIcon = app.AddText( layContent, "[fa-book]", 0.8, 0.12, "FontAwesome" )
//	txtIcon.SetTextColor( "#4285F4" );
	//txtIcon.SetTextSize( 60 )
	//imgMain = app.AddImage( layContent, "Img/La Biblia.png", 0.45 )

	scroll = app.CreateScroller( 1, -1);
    layContent.AddChild( scroll );

    layScroll = app.CreateLayout( "Linear", "Center" );
    scroll.AddChild( layScroll );

    
	logo = app.CreateImage( "Img/Evangelio de Acuario.png",0.65,-1 );
	logo.SetMargins( 0.01, 0.03, 0.01, 0 )
	layScroll.AddChild( logo );
	sI = setInterval(()=>{logo.Animate( "Newspaper" );}, 3500);
	//Create text with an external link.
    var txt = app.ReadFile( "Misc/el-evangelio-acuariano-de-jesus-el-cristo.txt", "UTF-8").split("\n").join("\r\n");
    //"<p><font color=#4285F4><big>Welcome</big></font></p><br>" + 
    //"<p><a href=https://play.google.com/store>Play Store</a></p>"
    txtContent = app.CreateText(  txt, 1.0, -1, "MultiLine" )
    txtContent.SetTextSize( 15 )
    txtContent.SetTextColor( "#000000" )
    layScroll.AddChild( txtContent);
    txtContent.Gone();
    txtContent2 = app.CreateText(  /*txt*/"", 1, -1, "MultiLine" )
    txtContent2.SetTextSize( 19)
    txtContent2.SetPadding(0.1, 0.1, 0.1, 0.1  )
    txtContent2.SetTextColor( "#34b7a3" )
    txtContent2.SetTextShadow( 5, 1, 1, "#cdcdcd" )
    txtContent2.SetFontFile(  "Misc/Sigmar-Regular.ttf");//Misc/Astloch-Regular.ttf");//Misc/SawarabiMincho-Regular.ttf");//Misc/Parkinsans-VariableFont_wght.ttf")
    layScroll.AddChild( txtContent2);
    
    
}

//Create an action bar at the top.
function CreateActionBar()
{
    //Create Card layout for top bar (with drop shadow).
    layBar = app.AddLayout( layMain, "Linear", "Horizontal,FillX" )
    layBar.SetElevation( 10 )
    layBar.SetGravity( 40 )
    layBar.SetBackGradient( col2[0], col1, col2[1] )
    //.SetBackColor( "#42F4EF" )
    layBar.SetSize( 1.0, 0.085 )
    
    //Add title text.
    txtBarTitle = app.AddText( layBar, "Evangelio de Acuario", 1 )
    txtBarTitle.SetPadding( 12,7,12,10, "dip" )
    txtBarTitle.SetTextSize( 24)
    txtBarTitle.SetTextColor( "#ffffff" )
    txtBarTitle.SetTextShadow( 5,0,0,"#696969" )
    txtBarTitle.SetFontFile( "Misc/SawarabiMincho-Regular.ttf");//Misc/Astloch-Regular.ttf");//Misc/Bokor-Regular.ttf" )
    
    //Create title layout.
    layBarTitle = app.AddLayout( layBar, "Linear", "Horizontal,Left" )
    
    //Add hamburger icon .
    txtBurger = app.AddText( layBarTitle, "[fa-bars]", -1,-1, "FontAwesome" )
    txtBurger.SetPadding( 12,12,12,10, "dip" )
    txtBurger.SetTextSize( 24 )
    txtBurger.SetTextColor( "#eeeeee" )
    txtBurger.SetOnTouchUp( function(){app.OpenDrawer()} )
    
    //Add menu icon.
    txtMenu = app.AddText( layBarTitle, "[fa-ellipsis-v]", -1,-1, "FontAwesome,Right" );
    txtMenu.SetPadding( 12,14,16,10, "dip" )
    txtMenu.SetMargins( 0.8 )
    txtMenu.SetTextSize( 24 )
    txtMenu.SetTextColor( "#eeeeee" );
    txtMenu.SetOnTouchUp( function(){app.ShowPopup("Todo!")} )
}

//Create the drawer contents.
function CreateDrawer()
{
    //Create a layout for the drawer.
	//(Here we also put it inside a scroller to allow for long menus)
	drawerWidth = 0.75;
    drawerScroll = app.CreateScroller( drawerWidth, -1, "FillY" )
    drawerScroll.SetBackColor( "White" )
	layDrawer = app.CreateLayout( "Linear", "Left" )
	drawerScroll.AddChild( layDrawer )
	
	//Create layout for top of drawer.
	layDrawerTop = app.CreateLayout( "Absolute" )
	layDrawerTop.SetBackColor( "#4285F4" )
	layDrawerTop.SetSize( drawerWidth, 0.23 )
	layDrawer.AddChild( layDrawerTop )
	
	//Add an icon to top layout.
	var img = app.AddImage( layDrawerTop, "Img/Evangelio de Acuario.png", 0.15 )
	img.SetPosition( drawerWidth*0.06, 0.04 )
	
	//Add user name to top layout.
	var txtUser = app.AddText( layDrawerTop, "Evangelio de Acuario",-1,-1,"Bold")
	txtUser.SetPosition( drawerWidth*0.07, 0.155 )
	txtUser.SetTextColor( "White" )
	txtUser.SetTextSize( 13.7, "dip" )
	
	//Add user email to top layout.
	txtEmail = app.AddText( layDrawerTop, "Glosario:")
	txtEmail.SetPosition( drawerWidth*0.07, 0.185 )
	txtEmail.SetTextColor( "#bbffffff" )
	txtEmail.SetTextSize( 14, "dip" )
	
	//Create menu layout.
	var layMenu = app.CreateLayout( "Linear", "Left" )
	layDrawer.AddChild( layMenu )
	
    //Add a list to menu layout (with the menu style option).
    var listItems = "Evangelio de Acuario::[fa-book]";
    lstMenu1 = app.AddList( layMenu, listItems, drawerWidth, -1, "Menu,Expand" )
    lstMenu1.SetColumnWidths( -1, 0.35, 0.18 )
    lstMenu1.SelectItemByIndex( 0, true )
    lstMenu1.SetItemByIndex( 0, "Evangelio de Acuario", 21 )
    lstMenu1.SetOnTouch( lstMenu_OnTouch )
    
    //Add seperator to menu layout.
    var sep = app.AddImage( layMenu, null, drawerWidth,0.001,"fix", 2,2 )
    sep.SetSize( -1, 1, "px" )
    sep.SetColor( "#cccccc" )
    
    //Add title between menus.
	txtTitle = app.AddText( layMenu, "Options",-1,-1,"Left")
	txtTitle.SetTextColor( "#666666" )
	txtTitle.SetMargins( 16,12,0,0, "dip" )
	txtTitle.SetTextSize( 14, "dip" )
	
    //Add a second list to menu layout.
    var listItems = "Settings::[fa-cog]";
    lstMenu2 = app.AddList( layMenu, listItems, drawerWidth, -1, "Menu,Expand" )
    lstMenu2.SetColumnWidths( -1, 0.35, 0.18 )
    lstMenu2.SetOnTouch( lstMenu_OnTouch )
}

//Handle menu item selection.
function lstMenu_OnTouch( title, body, type, index )
{
    //Close the drawer.
    app.CloseDrawer( "Left" )
    
    //Highlight the chosen menu item in the appropriate list.
    if( this==lstMenu1 ) lstMenu2.SelectItemByIndex(-1)
    else lstMenu1.SelectItemByIndex(-1)
    this.SelectItemByIndex( index, true )
    
    //Update title and page contents.
    txtBarTitle.SetText( title )
    txtIcon.SetText( type )
    txtContent.SetHtml( "<p align='center'><font color=#4285F4><big>"+title+"</big></font></p>" )
    
    console.log( title )
}

//Called when a drawer is opened or closed.
function OnDrawer( side, state )
{
    console.log( side + " : " + state )
}

function ReadText()
{
	
	curLine = txtContent.GetText().split(".")[c];
	c++;
	txtContent2.Animate( "FlipFromRight" );
	txtContent2.SetHtml("<center><p style='white-space: pre-line'><i>"+curLine+"</i></p></center>");
	app.TextToSpeech( curLine, 1, 1.2, ()=>{layScroll.Animate("Tada");ReadText();}, "music", "es-pr" );
	
}