<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="result.aspx.cs" Inherits="Registraion.result" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <h2>sussfully registered</h2>
    <form id="form1" runat="server">
        <fieldset style="border-radius:35px; text-align:left;padding-left:35px;height:100px;width:300px;">
        <asp:Table ID="Table1" runat="server" Height="16px" Width="422px">
            <asp:TableRow>
                <asp:TableCell>
                    <asp:Label ID="useremaillabel" runat="server" Text="Email"></asp:Label>
                </asp:TableCell>
                <asp:TableCell>
                    <asp:TextBox ID="emailtxt" runat="server" ToolTip="Enter valid Email." TextMode="Email"></asp:TextBox>
                </asp:TableCell>
            </asp:TableRow>
            <asp:TableRow>
                <asp:TableCell>
                    <asp:Label ID="userpasslabel" runat="server" Text="Password"></asp:Label>
                </asp:TableCell>
                <asp:TableCell>
                    <asp:TextBox ID="passtxt" runat="server" ToolTip="Enter a valid Password." TextMode="Password"></asp:TextBox>
                </asp:TableCell>
            </asp:TableRow>
            <asp:TableRow>
                <asp:TableCell>

                </asp:TableCell>
                <asp:TableCell>
                    <asp:Button ID="logbtn" runat="server" Text="Login" OnClick="log_click" />
                </asp:TableCell>
            </asp:TableRow>
        </asp:Table>
            </fieldset><br />
        <a href="#" onclick="window.open('forgotpassword.aspx','FP','width=500,heigth=100,top=300,left=500,fullscrene=no,resizable=0');">Forgot Password ?</a>
    </form>
    
    
    <asp:Label ID="msg" runat="server"></asp:Label>
</body>
</html>
