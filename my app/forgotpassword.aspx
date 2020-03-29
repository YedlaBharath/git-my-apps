<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="forgotpassword.aspx.cs" Inherits="Registraion.forgotpassword" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <table>
                <tr>
                    <td>
                        <asp:Label ID="emalilabel" runat="server" Text="Enter Your Registered Email ID :"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtemail" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Button ID="sbtn" runat="server" OnClick="forgotpassword_click" Text="Email" />
                    </td>
                </tr>
            </table>
            

        </div>
    </form>
    <asp:Label ID="msg1" runat="server"></asp:Label>
</body>
</html>
