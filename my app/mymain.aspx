<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="mymain.aspx.cs" Inherits="Registraion.mymain" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="mymainstylesheet.css" />
</head>
<body>
    <div class="header-class">
            <div id="imgmain">
                <img src="myntraicon.png" />
            </div>
        <div class="list-header"></div>
            <div class="list-div">
                <ul>
                    <li>MEN</li>
                    <li>WOMEN</li>
                    <li>KIDS</li>
                    <li>HOME&LIVING</li>
                    <li>DISCOVER</li>
                </ul>
                
            </div>
        <div>
            <ul>
                    <li>
                        
                        <form id="form2" runat="server">
                            <asp:TextBox ID="searchtxt" runat="server" ToolTip="Search items" TextMode="Search" Text="Please Enter to Search"></asp:TextBox>
                            <asp:Button ID="searchbtn" runat="server" Text="Search"></asp:Button>
                        </form>
                    
                    </li>
                    <li>
                        PROFILE
                    </li>
                    <li>BAG</li>
                </ul>
        </div>
                
    </div>
</body>
</html>
